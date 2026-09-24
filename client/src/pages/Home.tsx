/**
 * Tidal Storylines design: a warm, practical, Torres Strait-focused facilitator canvas.
 * The Home view retains its simple card-based layout while every page uses the Mura Moegi Kaziw Sagulau Playgroup name and Torres Strait terminology.
 */
import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import {
  ArrowDownToLine,
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileText,
  HeartHandshake,
  LayoutGrid,
  Menu,
  Plus,
  Play,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";

type Page = "home" | "learn" | "toolkit" | "activities" | "planner" | "promotional";
type Stage = "start" | "middle" | "end";
type ToolkitTab = "structure" | "setup" | "checklist" | "digital";
type ActivityType = "cultural" | "organised" | "nature" | "parallel" | "digital";

type Activity = {
  id: string;
  name: string;
  description: string;
  type: ActivityType;
  duration: number;
  ages: string;
  focus: string[];
  materials: string[];
  instructions: string[];
  cultural?: boolean;
};

type SessionPlan = {
  id: string;
  name: string;
  communityName: string;
  sessionTime: string;
  createdAt: string;
  stages: Record<Stage, string[]>;
  evaluation: {
    children: string;
    carers: string;
    engagement: string;
    learning: string;
    reflection: string;
  };
};

const BRAND = "Mura Moegi Kaziw Sagulau Playgroup";
const STORAGE_KEY = "mmksp-session-plans-v1";
const CHECKLIST_KEY = "mmksp-facilitator-checklist-v1";
const landingPhotoUrl = "/manus-storage/beading-time_19b1ea9c.webp";
const heroUrl = "/manus-storage/drawing-time_da4bc67f.png";
const digitalPlayUrl = "/manus-storage/digital-play-robots-header_8f1d801b.png";
const planningTextureUrl = "/manus-storage/drawing-time_da4bc67f.png";
const playgroupPhotoUrl = "/manus-storage/beading-time_19b1ea9c.webp";
const childPlayPhotoUrl = "/manus-storage/toddler-play_b22b4bba.png";
const weavingPhotoUrl = "/manus-storage/weaving-time_3fcd5728.jpg";
const suppliedGuideUrl = "/manus-storage/MMKS-facilitators-guide_37dfecf7.pdf";
const printableGuideUrl = "/manus-storage/main_7e1c9f09.pdf";
const muraKoskerLogoUrl = "/manus-storage/MuraKoskerLogo_603eb34f.png";
const jcuLogoUrl = "/manus-storage/JCU_f678fd2c.jpg";
const lowitjaLogoUrl = "/manus-storage/Lowitja_41810765.jpg";
const starlightLogoUrl = "/manus-storage/starlight_c95d28ab.jpg";
const dotPurpleUrl = "/manus-storage/image005_3795baff.png";
const dotTealUrl = "/manus-storage/image003_330ffa7b.png";
const dotBlueUrl = "/manus-storage/image004_f065eb39.png";
const dotSunshineUrl = "/manus-storage/image007_f12549ee.png";
const dotLimeUrl = "/manus-storage/image006_86554539.png";
const taleBotExplainerUrl = "/manus-storage/tale-bot-explainer_c2db5a2e.mp4";
const taleBotThumbnailUrl = "/manus-storage/tale-bot-explainer-thumbnail_59c062fd.jpg";
const mTinyExplainerUrl = "/manus-storage/mtiny-explainer_14df68d5.mp4";
const mTinyThumbnailUrl = "/manus-storage/mtiny-explainer-thumbnail_553c76d8.jpg";
const exlpFinalExplainerUrl = "/manus-storage/exlp-final-explainer_e0448841.mp4";
const exlpFinalThumbnailUrl = "/manus-storage/exlp-final-explainer-thumbnail_e01de72b.jpg";
const legoTrainExplainerUrl = "/manus-storage/lego-train-explainer_fbb48bca.mp4";
const legoTrainThumbnailUrl = "/manus-storage/lego-train-explainer-thumbnail_72474bfd.jpg";

const PartnerLogoRow = () => (
  <div className="partner-logo-row" aria-label="Partner organisation logos">
    <img src={jcuLogoUrl} alt="James Cook University logo" />
    <img src={lowitjaLogoUrl} alt="Lowitja Institute logo" />
    <img src={starlightLogoUrl} alt="Starlight Children’s Foundation Australia logo" />
  </div>
);

const FooterAcknowledgements = () => (
  <div className="footer-acknowledgements">
    <p>This website was developed by Vinnitta Mosby with contributions by Daniel Aitken, Playgroup Coordinator, Mura Kosker Sorority Inc., as part of the Lowitja Institute Postdoctoral Scholarship, in partnership with Starlight Children’s Foundation Australia.</p>
    <p>Photographs in this guide and website were taken by the author and remain the author’s copyright. Permission was obtained from the parent(s) or legal guardian(s) of any children appearing in the images for their use. The images are included solely for the purposes of this project and must not be reproduced or distributed without the author’s permission.</p>
  </div>
);

const navItems: { id: Page; label: string; icon: typeof BookOpen }[] = [
  { id: "home", label: "Overview", icon: LayoutGrid },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "toolkit", label: "Toolkit", icon: ClipboardCheck },
  { id: "activities", label: "Activity library", icon: Sparkles },
  { id: "planner", label: "Session planner", icon: FileText },
];
const pageIds: Page[] = ["home", "learn", "toolkit", "activities", "planner", "promotional"];

const activities: Activity[] = [
  {
    id: "local-language-song",
    name: "Head, shoulders and toes in local language",
    description: "A familiar movement song adapted with approved local-language words for body parts.",
    type: "cultural",
    duration: 10,
    ages: "1–4 years",
    focus: ["Speech & language", "Motor skills", "Belonging"],
    materials: ["Approved local-language word list", "Open space"],
    instructions: ["Gather children in a circle.", "Introduce the approved local-language words.", "Model each movement slowly.", "Sing together and repeat at a comfortable pace."],
    cultural: true,
  },
  {
    id: "weaving",
    name: "Weaving together",
    description: "A fine-motor activity using age-appropriate locally approved weaving materials.",
    type: "cultural",
    duration: 20,
    ages: "3–4 years",
    focus: ["Fine motor", "Sharing", "Cultural connection"],
    materials: ["Approved weaving materials", "Pre-cut strips", "Safety scissors for adults"],
    instructions: ["Show an approved example.", "Demonstrate a simple over-under movement.", "Offer pre-cut materials.", "Support children to take turns and help one another."],
    cultural: true,
  },
  {
    id: "story-circle",
    name: "Local storytelling circle",
    description: "Share an approved story with expressive voice, visual prompts and a comfortable group space.",
    type: "cultural",
    duration: 15,
    ages: "2–4 years",
    focus: ["Listening", "Speech & language", "Cultural connection"],
    materials: ["Approved story or visual prompts", "Cushions for sitting"],
    instructions: ["Create a comfortable circle.", "Use an approved local story.", "Pause for simple questions.", "Invite children to respond through words, gesture or drawing."],
    cultural: true,
  },
  {
    id: "dance-movement",
    name: "Dance and movement",
    description: "A simple, approved movement activity that supports rhythm, coordination and shared enjoyment.",
    type: "cultural",
    duration: 15,
    ages: "2–4 years",
    focus: ["Gross motor", "Rhythm", "Belonging"],
    materials: ["Open space", "Approved music or song"],
    instructions: ["Check that the space is safe.", "Demonstrate simple approved movements.", "Begin slowly.", "Encourage children to move together at their own pace."],
    cultural: true,
  },
  {
    id: "digital-play",
    name: "Digital Play",
    description: "Encourages foundational skills in literacy, numeracy, and digital literacy through play-based learning. Offers digital content that reflects Indigenous languages, stories, and traditional knowledge.",
    type: "digital",
    duration: 20,
    ages: "2–4 years",
    focus: ["Early literacy", "Early numeracy", "Digital literacy"],
    materials: ["Mat for bots", "Instructional videos and cards", "Mat and cushions for sitting"],
    instructions: ["Prepare the mat, bots and approved cards before families arrive.", "Seat children on the mat and cushions.", "Introduce one digital prompt or story at a time.", "Encourage children to count, name, move and talk as they play.", "Close with a shared reflection or retelling."],
  },
  {
    id: "welcome-circle",
    name: "Welcome song circle",
    description: "A predictable start that helps children and carers settle into the session together.",
    type: "organised",
    duration: 5,
    ages: "0–4 years",
    focus: ["Belonging", "Speech & language"],
    materials: ["Open floor space"],
    instructions: ["Sit in a circle.", "Offer a simple greeting song.", "Welcome each child by name when appropriate.", "Invite waves, claps or gentle movements."],
  },
  {
    id: "finger-painting",
    name: "Finger painting",
    description: "A sensory art activity that invites creative expression and conversation.",
    type: "organised",
    duration: 20,
    ages: "1–4 years",
    focus: ["Fine motor", "Creativity", "Conversation"],
    materials: ["Non-toxic paints", "Large paper", "Smocks", "Water for cleaning"],
    instructions: ["Protect the work surface.", "Offer paper and a small amount of paint.", "Model a few marks.", "Allow open exploration.", "Display work with the child’s consent."],
  },
  {
    id: "blocks",
    name: "Building blocks play",
    description: "Shared block building develops problem-solving, spatial awareness and turn taking.",
    type: "organised",
    duration: 15,
    ages: "1–4 years",
    focus: ["Problem-solving", "Motor skills", "Sharing"],
    materials: ["Large soft blocks", "Play mat"],
    instructions: ["Set blocks on a mat.", "Model stacking and balancing.", "Encourage children to build together.", "Celebrate creations before pack-up."],
  },
  {
    id: "action-songs",
    name: "Singing and action songs",
    description: "Music and movement combine to support language, coordination and participation.",
    type: "organised",
    duration: 10,
    ages: "0–4 years",
    focus: ["Motor skills", "Speech & language", "Participation"],
    materials: ["Approved song list", "Optional instruments"],
    instructions: ["Choose age-appropriate songs.", "Model actions clearly.", "Start slowly.", "Repeat favourites when children show interest."],
  },
  {
    id: "playdough",
    name: "Playdough creations",
    description: "Hands-on exploration that strengthens hand muscles and supports imaginative play.",
    type: "organised",
    duration: 20,
    ages: "2–4 years",
    focus: ["Fine motor", "Creativity", "Conversation"],
    materials: ["Playdough", "Rolling pins", "Cookie cutters", "Play mat"],
    instructions: ["Give each child a small portion.", "Show rolling and squashing.", "Offer tools for exploration.", "Invite children to describe their ideas."],
  },
  {
    id: "nature-walk",
    name: "Nature exploration walk",
    description: "A guided outdoor walk for noticing, collecting and talking about safe natural objects.",
    type: "nature",
    duration: 20,
    ages: "2–4 years",
    focus: ["Language", "Observation", "Motor skills"],
    materials: ["Small buckets or bags", "Safe outdoor area"],
    instructions: ["Check the route first.", "Stay together.", "Notice safe objects and sounds.", "Collect only where appropriate.", "Return to sort and talk about discoveries."],
  },
  {
    id: "sand-water",
    name: "Sand and water play",
    description: "Sensory exploration with simple tools encourages curiosity and cooperative play.",
    type: "nature",
    duration: 25,
    ages: "1–4 years",
    focus: ["Sensory learning", "Motor skills", "Sharing"],
    materials: ["Sand tray", "Water", "Cups and scoops", "Towels"],
    instructions: ["Set up a safely supervised area.", "Provide a small set of tools.", "Encourage exploration.", "Model sharing.", "Supervise water play closely."],
  },
  {
    id: "outdoor-free-play",
    name: "Outdoor free play",
    description: "Child-led outdoor play that supports confidence, imagination and physical development.",
    type: "nature",
    duration: 30,
    ages: "0–4 years",
    focus: ["Motor skills", "Imagination", "Resilience"],
    materials: ["Safe outdoor space", "Balls", "Bubbles (optional)"],
    instructions: ["Check the outdoor area.", "Invite children to explore.", "Observe and support safe interactions.", "Follow children’s interests.", "Allow time for pack-up."],
  },
  {
    id: "book-corner",
    name: "Picture book corner",
    description: "A calm reading space for individual exploration alongside peers.",
    type: "parallel",
    duration: 15,
    ages: "0–4 years",
    focus: ["Early literacy", "Attention", "Calm"],
    materials: ["Picture books", "Cushions", "Quiet corner"],
    instructions: ["Set up a comfortable area.", "Offer a small, varied book basket.", "Allow children to choose.", "Read nearby when invited.", "Respect quiet exploration."],
  },
  {
    id: "puzzle-play",
    name: "Puzzle play",
    description: "Independent puzzle solving near peers builds persistence and fine-motor coordination.",
    type: "parallel",
    duration: 15,
    ages: "2–4 years",
    focus: ["Problem-solving", "Fine motor", "Persistence"],
    materials: ["Age-appropriate puzzles", "Play mat"],
    instructions: ["Set out a few puzzle choices.", "Invite children to choose.", "Offer help only when needed.", "Celebrate persistence and completion."],
  },
  {
    id: "colouring",
    name: "Colouring station",
    description: "A shared-material activity that supports fine-motor development and creativity.",
    type: "parallel",
    duration: 20,
    ages: "2–4 years",
    focus: ["Fine motor", "Creativity", "Sharing"],
    materials: ["Paper", "Crayons", "Table or floor space"],
    instructions: ["Lay out paper and crayons.", "Invite children to select colours.", "Keep crayons in a shared central space.", "Encourage, never force, sharing."],
  },
];

const checklistSections = [
  {
    title: "Before the session",
    items: ["Confirm the venue is available and safe", "Set up play areas and activities", "Prepare materials for the structured activity", "Check the first aid kit is stocked", "Prepare the sign-in sheet", "Plan a parent discussion topic", "Prepare a welcome song or greeting activity"],
  },
  {
    title: "During the session",
    items: ["Welcome families as they arrive", "Complete the sign-in sheet", "Facilitate the welcome activity", "Monitor children’s safety", "Lead the parent discussion", "Transition to the structured activity", "Lead a goodbye song or ritual"],
  },
  {
    title: "After the session",
    items: ["Pack up and clean the space", "Record attendance for reporting", "Note any support follow-up", "Record what worked well", "Plan the next session topic", "Follow up with families where appropriate"],
  },
];

function createEmptyPlan(): SessionPlan {
  return {
    id: crypto.randomUUID(),
    name: "",
    communityName: "",
    sessionTime: "",
    createdAt: new Date().toISOString(),
    stages: { start: [], middle: [], end: [] },
    evaluation: { children: "", carers: "", engagement: "", learning: "", reflection: "" },
  };
}

function tidyFileName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "session-plan";
}

function pdfHeader(doc: jsPDF, title: string, subtitle?: string) {
  doc.setFillColor(5, 124, 131);
  doc.rect(0, 0, 210, 24, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(BRAND, 14, 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Torres Strait playgroup facilitator resource", 14, 17);
  doc.setTextColor(27, 48, 50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 14, 38);
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(subtitle, 14, 45);
  }
}

function pdfParagraph(doc: jsPDF, label: string, value: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(5, 124, 131);
  doc.text(label, 14, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(27, 48, 50);
  const lines = doc.splitTextToSize(value || "Not recorded", 180);
  doc.text(lines, 14, y + 6);
  return y + 6 + lines.length * 5 + 8;
}

function facilitatorGuideStages(activity: Activity) {
  return [
    {
      title: "Before the activity",
      steps: [
        activity.cultural ? "Confirm that the local story, language, song, imagery or activity is approved for this session." : "Check that the space, materials and activity are appropriate for the children present.",
        `Prepare ${activity.materials.slice(0, 3).join(", ").toLowerCase()}.`,
        "Invite carers to stay nearby and explain how they can join the play.",
      ],
    },
    { title: "During the activity", steps: activity.instructions },
    {
      title: "After the activity",
      steps: [
        "Give children time to finish, share or show what they have done.",
        "Pack away together where practical and check the space is safe.",
        "Record a brief reflection on engagement, learning or an idea for the next session.",
      ],
    },
  ];
}

export default function Home() {
  const [page, setPage] = useState<Page>(() => {
    const requestedPage = new URLSearchParams(window.location.search).get("page") as Page | null;
    if (requestedPage && pageIds.includes(requestedPage)) return requestedPage;
    return "home";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolkitTab, setToolkitTab] = useState<ToolkitTab>("structure");
  const [activityQuery, setActivityQuery] = useState("");
  const [activityType, setActivityType] = useState<"all" | ActivityType>("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [plans, setPlans] = useState<SessionPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<SessionPlan | null>(null);
  const [pickerStage, setPickerStage] = useState<Stage | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [privacyNotice, setPrivacyNotice] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    try {
      setPlans(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
      setChecklist(JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "{}"));
    } catch {
      setPlans([]);
      setChecklist({});
    }
    const promotionalUrl = new URL(window.location.href);
    promotionalUrl.search = "?page=promotional";
    void QRCode.toDataURL(promotionalUrl.toString(), {
      width: 520,
      margin: 2,
      color: { dark: "#057C83", light: "#FFFFFF" },
    }).then(setQrUrl);
  }, []);

  useEffect(() => {
    if (plans.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    if (Object.values(checklist).every((checked) => !checked)) {
      localStorage.removeItem(CHECKLIST_KEY);
      return;
    }
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
  }, [checklist]);

  const filteredActivities = useMemo(
    () =>
      activities.filter((activity) => {
        const text = `${activity.name} ${activity.description} ${activity.focus.join(" ")}`.toLowerCase();
        return text.includes(activityQuery.toLowerCase()) && (activityType === "all" || activity.type === activityType);
      }),
    [activityQuery, activityType],
  );

  const navigate = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    setSelectedActivity(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePlan = (patch: Partial<SessionPlan>) => {
    setEditingPlan((plan) => (plan ? { ...plan, ...patch } : plan));
  };

  const savePlan = () => {
    if (!editingPlan) return;
    if (!editingPlan.name.trim()) {
      window.alert("Please give this session plan a name before saving.");
      return;
    }
    setPlans((current) => {
      const exists = current.some((plan) => plan.id === editingPlan.id);
      return exists ? current.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan)) : [editingPlan, ...current];
    });
    setEditingPlan(null);
  };

  const addActivityToPlan = (activityId: string) => {
    if (!editingPlan || !pickerStage) return;
    setEditingPlan({
      ...editingPlan,
      stages: { ...editingPlan.stages, [pickerStage]: [...editingPlan.stages[pickerStage], activityId] },
    });
    setPickerStage(null);
  };

  const removePlanActivity = (stage: Stage, index: number) => {
    if (!editingPlan) return;
    const revised = [...editingPlan.stages[stage]];
    revised.splice(index, 1);
    setEditingPlan({ ...editingPlan, stages: { ...editingPlan.stages, [stage]: revised } });
  };

  const planActivities = (plan: SessionPlan) => {
    const ids = [...plan.stages.start, ...plan.stages.middle, ...plan.stages.end];
    return ids.map((id) => activities.find((activity) => activity.id === id)).filter(Boolean) as Activity[];
  };

  const planDuration = (plan: SessionPlan) => planActivities(plan).reduce((total, activity) => total + activity.duration, 0);

  const clearPlansAfterDownload = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setPlans([]);
    setEditingPlan(null);
    setPrivacyNotice("Download started. All saved session plans have been cleared from this browser on this device.");
  };

  const clearChecklistAfterDownload = () => {
    window.localStorage.removeItem(CHECKLIST_KEY);
    setChecklist({});
    setPrivacyNotice("Download started. All completed checklist items have been cleared from this browser on this device.");
  };

  const downloadPlanPdf = (plan: SessionPlan) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    pdfHeader(doc, plan.name, `${plan.communityName || "Community not specified"} · ${plan.sessionTime || "Time not specified"}`);
    let y = 57;
    (["start", "middle", "end"] as Stage[]).forEach((stage) => {
      const stageLabel = stage[0].toUpperCase() + stage.slice(1);
      doc.setFillColor(stage === "start" ? 201 : stage === "middle" ? 5 : 118, stage === "start" ? 100 : stage === "middle" ? 124 : 130, stage === "start" ? 65 : stage === "middle" ? 131 : 84);
      doc.roundedRect(14, y - 5, 182, 8, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`${stageLabel} activities`, 18, y);
      doc.setTextColor(27, 48, 50);
      y += 11;
      if (plan.stages[stage].length === 0) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.text("No activities selected.", 18, y);
        y += 8;
      }
      plan.stages[stage].forEach((id) => {
        const activity = activities.find((item) => item.id === id);
        if (!activity) return;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`${activity.name} (${activity.duration} min)`, 18, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(activity.description, 170);
        doc.text(lines, 18, y + 5);
        y += 8 + lines.length * 4.5;
      });
      y += 4;
    });
    if (y > 230) {
      doc.addPage();
      y = 20;
    }
    doc.setDrawColor(217, 230, 224);
    doc.line(14, y, 196, y);
    y += 10;
    y = pdfParagraph(doc, "Children attending", plan.evaluation.children, y);
    y = pdfParagraph(doc, "Carers attending", plan.evaluation.carers, y);
    y = pdfParagraph(doc, "Children’s engagement", plan.evaluation.engagement, y);
    y = pdfParagraph(doc, "Learning or emerging interests", plan.evaluation.learning, y);
    pdfParagraph(doc, "Facilitator reflection and next step", plan.evaluation.reflection, y);
    doc.setFontSize(8);
    doc.setTextColor(90, 109, 108);
    doc.text("Downloaded directly to this device. Session-plan data is not sent from this website.", 14, 285);
    doc.save(`${tidyFileName(plan.name)}.pdf`);
    clearPlansAfterDownload();
  };

  const downloadChecklistPdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    pdfHeader(doc, "Facilitator checklist", "A printable record for session preparation, delivery and follow-up");
    let y = 58;
    checklistSections.forEach((section) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(5, 124, 131);
      doc.setFontSize(12);
      doc.text(section.title, 14, y);
      y += 7;
      section.items.forEach((item, itemIndex) => {
        const key = `${section.title}-${itemIndex}`;
        doc.setDrawColor(5, 124, 131);
        doc.rect(14, y - 3.5, 4, 4);
        if (checklist[key]) {
          doc.setTextColor(5, 124, 131);
          doc.setFont("helvetica", "bold");
          doc.text("✓", 14.7, y);
        }
        doc.setTextColor(27, 48, 50);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        const lines = doc.splitTextToSize(item, 170);
        doc.text(lines, 22, y);
        y += Math.max(7, lines.length * 5 + 2);
      });
      y += 5;
    });
    doc.setFontSize(8);
    doc.setTextColor(90, 109, 108);
    doc.text("Downloaded directly to this device. Keep printed records in line with local Mura procedures.", 14, 285);
    doc.save("mmksp-facilitator-checklist.pdf");
    clearChecklistAfterDownload();
  };

  const downloadGuidePdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    pdfHeader(doc, "Facilitator guide", "A print-ready companion to the Mura Moegi Kaziw Sagulau Playgroup web app");
    let y = 58;
    y = pdfParagraph(doc, "Using this guide", "Use the Learn section to prepare, the Toolkit to set up and reflect, the Activity library to select play-based experiences, and the Session planner to record a local session. While working, plans and checklist ticks are held only in the browser on the device being used. They are not sent to the website.", y);
    y = pdfParagraph(doc, "Session rhythm", "Start: welcome and settling in. Middle: free play and parent discussion. End: a structured experience, goodbye ritual and pack-up. Adjust timing to meet community and family needs.", y);
    y = pdfParagraph(doc, "Digital Play", "Digital Play encourages foundational skills in literacy, numeracy, and digital literacy through play-based learning. Offers digital content that reflects Indigenous languages, stories, and traditional knowledge. Use the bot mat, instructional videos and cards, and mats and cushions for sitting. Use only approved local-language, story and cultural content.", y);
    y = pdfParagraph(doc, "Planning and reporting", "Record the community name and session time in each plan. Add children and carers attending, engagement, learning, and a brief reflection. Download the plan directly to an outreach worker’s computer for local reporting and safe record keeping. Once the download starts, the website automatically clears saved plans; checklist downloads likewise clear all checklist ticks. Secure or remove downloaded files from the device’s Downloads folder before the next facilitator uses it.", y);
    y = pdfParagraph(doc, "Cultural care", "Use local stories, language, imagery and activities only with appropriate community approval. Use only Mura-approved photographs, logo material and cultural artwork.", y);
    doc.addPage();
    pdfHeader(doc, "Activity library", "Materials and facilitator guidance for each activity");
    y = 57;
    activities.forEach((activity, activityIndex) => {
      const estimatedHeight = 58 + activity.instructions.length * 7;
      if (y + estimatedHeight > 278) {
        doc.addPage();
        pdfHeader(doc, "Activity library", "Materials and facilitator guidance for each activity");
        y = 57;
      }
      doc.setFillColor(activity.type === "digital" ? 112 : activity.cultural ? 199 : 5, activity.type === "digital" ? 95 : activity.cultural ? 100 : 124, activity.type === "digital" ? 157 : activity.cultural ? 63 : 131);
      doc.roundedRect(14, y - 6, 182, 9, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`${String(activityIndex + 1).padStart(2, "0")}. ${activity.name}`, 18, y);
      doc.setTextColor(27, 48, 50);
      y += 10;
      y = pdfParagraph(doc, "Description", activity.description, y);
      y = pdfParagraph(doc, "Materials", activity.materials.join("; "), y);
      facilitatorGuideStages(activity).forEach((stage) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(5, 124, 131);
        doc.setFontSize(9.5);
        doc.text(stage.title, 14, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(27, 48, 50);
        doc.setFontSize(8.7);
        stage.steps.forEach((step, index) => {
          const lines = doc.splitTextToSize(`${index + 1}. ${step}`, 176);
          if (y + lines.length * 4.4 > 280) {
            doc.addPage();
            pdfHeader(doc, "Activity library", "Materials and facilitator guidance for each activity");
            y = 57;
          }
          doc.text(lines, 18, y);
          y += lines.length * 4.4 + 1.8;
        });
        y += 3;
      });
      y += 3;
    });
    doc.addPage();
    pdfHeader(doc, "Facilitator notes", "Use this page for local planning, follow-up and reflections");
    doc.setTextColor(27, 48, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Session name:", 14, 62);
    doc.text("Community:", 14, 76);
    doc.text("Date and time:", 14, 90);
    doc.text("Children attending:", 14, 104);
    doc.text("Age of Children attending:", 14, 118);
    doc.text("Carers attending:", 14, 132);
    doc.text("Visiting partners/invited guests:", 14, 146);
    doc.text("Additional Notes", 14, 160);
    [168, 180, 192].forEach((line) => doc.line(14, line, 196, line));
    doc.text("Facilitator reflection and next step:", 14, 208);
    [216, 228, 240, 252, 264].forEach((line) => doc.line(14, line, 196, line));
    doc.save("mmksp-facilitator-guide.pdf");
  };

  const downloadQrCode = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "mmksp-access-qr-code.png";
    link.click();
  };


  const brandMotifs = { dotPurpleUrl, dotTealUrl, dotBlueUrl, dotSunshineUrl, dotLimeUrl };
  void brandMotifs;

  const digitalExplainer = ({ title, description, videoUrl, thumbnailUrl, thumbnailAlt }: { title: string; description: string; videoUrl: string; thumbnailUrl: string; thumbnailAlt: string }) => (
    <a className="digital-explainer" href={videoUrl} target="_blank" rel="noreferrer" aria-label={`Launch the ${title} video in a new tab`}>
      <div className="digital-explainer-thumbnail"><img src={thumbnailUrl} alt={thumbnailAlt} /><span className="digital-explainer-play"><Play size={24} fill="currentColor" aria-hidden="true" /></span></div>
      <div className="digital-explainer-copy"><p className="eyebrow"><span /> Watch and prepare</p><h2>{title}</h2><p>{description}</p><span className="digital-explainer-launch"><Play size={16} fill="currentColor" aria-hidden="true" /> Click to launch</span></div>
    </a>
  );

  const digitalExplainers = () => <>
    {digitalExplainer({ title: "Tale Bot explainer", description: "A short video introduction to using Tale Bot in a supported Digital Play session.", videoUrl: taleBotExplainerUrl, thumbnailUrl: taleBotThumbnailUrl, thumbnailAlt: "Tale Bot and programmable robot on a colourful learning mat" })}
    {digitalExplainer({ title: "mTiny explainer", description: "A short video introduction to using mTiny in a supported Digital Play session.", videoUrl: mTinyExplainerUrl, thumbnailUrl: mTinyThumbnailUrl, thumbnailAlt: "mTiny robot in use on a bright patterned play mat" })}
    {digitalExplainer({ title: "EXLP Final explainer", description: "A short video introduction to the EXLP Final Digital Play resource and a supported session setup.", videoUrl: exlpFinalExplainerUrl, thumbnailUrl: exlpFinalThumbnailUrl, thumbnailAlt: "A child using a small robot on a colourful shape learning mat" })}
    {digitalExplainer({ title: "LEGO Train explainer", description: "A short video introduction to using a LEGO train experience in a supported Digital Play session.", videoUrl: legoTrainExplainerUrl, thumbnailUrl: legoTrainThumbnailUrl, thumbnailAlt: "A child exploring a LEGO train track during play" })}
  </>;

  const renderPromotional = () => (
    <section className="page-frame promotional-page"><p className="eyebrow"><span /> Community access</p><h1>Mura Kosker Promotional Material</h1><p>Use this link to share approved Playgroup information with staff, families and community. Please contact Mura Kosker Sorority Inc. before reproducing cultural content, photographs or downloadable materials elsewhere.</p><div className="promotional-qr">{qrUrl && <img src={qrUrl} alt="QR code for Mura Kosker Promotional Material" />}<div><h2>Share the Playgroup website</h2><p>Scan the QR code to return to this community access page, then use the site menu to explore the Playgroup resources.</p><button className="primary-button" onClick={downloadQrCode}><Download size={17} /> Download promotional QR</button></div></div></section>
  );

  const renderHome = () => (
    <>
      <section className="hero-shelf">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Torres Strait playgroup facilitator resource</p>
          <h1>Shape a session that starts with your community.</h1>
          <p className="hero-lede">A practical companion for planning meaningful, play-based experiences for children, carers and communities across the Torres Strait.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigate("planner")}>Plan a session <ChevronRight size={18} /></button>
            <button className="text-button" onClick={() => navigate("activities")}>Browse activity library <ArrowDownToLine size={17} /></button>
          </div>
          <div className="hero-assurance"><ShieldCheck size={17} /> Plans stay in this browser until you choose to download them.</div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src={heroUrl} alt="Child creating artwork during a Mura Moegi Kaziw Sagulau Playgroup session" />
          <div className="hero-image-caption"><span>01</span><div><strong>Plan with purpose</strong><small>Start - Middle - End</small></div></div>
        </div>
      </section>

      <section className="tide-intro">
        <div className="section-kicker">A facilitator’s working space</div>
        <h2>From welcome to reflection, every part of the session belongs in the plan.</h2>
        <p>Bring together locally appropriate activities, session timing, community details and simple evaluation notes. Download a record straight to the outreach computer when the session is complete.</p>
      </section>

      <section className="pathways-grid" aria-label="Main resources">
        <button className="path-card path-card-teal" onClick={() => navigate("learn")}>
          <BookOpen size={28} /><span className="path-number">01</span><h3>Learn</h3><p>Understand playgroups, child development and community-led participation.</p><span className="path-link">Open learning notes <ChevronRight size={16} /></span>
        </button>
        <button className="path-card path-card-sand" onClick={() => navigate("toolkit")}>
          <ClipboardCheck size={28} /><span className="path-number">02</span><h3>Toolkit</h3><p>Use session guidance, safety prompts and a printable facilitator checklist.</p><span className="path-link">Open toolkit <ChevronRight size={16} /></span>
        </button>
        <button className="path-card path-card-coral" onClick={() => navigate("activities")}>
          <Sparkles size={28} /><span className="path-number">03</span><h3>Activity library</h3><p>Find flexible activities across cultural, digital, outdoor and quiet-play spaces.</p><span className="path-link">Explore activities <ChevronRight size={16} /></span>
        </button>
        <button className="path-card path-card-ink" onClick={() => navigate("planner")}>
          <FileText size={28} /><span className="path-number">04</span><h3>Session planner</h3><p>Save a local plan, record evaluation details and download it for your report.</p><span className="path-link">Create a plan <ChevronRight size={16} /></span>
        </button>
      </section>

      <section className="digital-feature">
        <div className="digital-image-wrap"><img src={digitalPlayUrl} alt="Two programmable robots on a colourful learning mat for Digital Play" /></div>
        <div className="digital-copy">
          <p className="eyebrow"><span /> New activity category</p>
          <h2>Digital Play</h2>
          <p>Play-based digital learning can build early literacy, numeracy and confidence with technology—while making room for local languages, stories and traditions.</p>
          <div className="material-pills"><span>Mat for bots</span><span>Instructional videos &amp; cards</span><span>Mat &amp; cushions</span></div>
          <button className="outline-button" onClick={() => { navigate("activities"); setActivityType("digital"); }}>View Digital Play activity <ChevronRight size={17} /></button>
        </div>
      </section>

      <section className="downloads-banner" style={{ backgroundImage: `linear-gradient(rgba(247,242,232,.88), rgba(247,242,232,.88)), url(${planningTextureUrl})` }}>
        <div><p className="eyebrow"><span /> Ready for your records</p><h2>Print a guide, checklist or completed session plan.</h2><p>Useful for facilitator folders, outreach reporting and sharing with colleagues.</p></div>
        <div className="download-actions"><a href={printableGuideUrl} target="_blank" rel="noreferrer"><Download size={17} /> Printable app guide</a><button onClick={downloadGuidePdf}><Download size={17} /> Session guide</button><button onClick={downloadChecklistPdf}><Download size={17} /> Checklist</button></div>
      </section>
    </>
  );

  const renderLearn = () => (
    <section className="page-frame learning-page">
      <div className="page-heading"><h1>What playgroup makes possible?</h1><p>Playgroups are regular gatherings where families with young children can play, learn and connect in a relaxed, welcoming setting.</p></div>
      <div className="learning-columns">
        <article className="paper-card large-note"><span className="note-index">01</span><h2>What playgroup makes possible.</h2><p>Through a mix of free play, structured experiences and social time, children develop confidence and skills while carers connect with community, share ideas and build supportive relationships.</p><p>Each session can take a shape that fits the community, the families present and the local setting.</p></article>
        <article className="paper-card"><span className="note-index">02</span><h3>Children learn through play</h3><ul className="tidal-list"><li>Social connection and turn taking</li><li>Language, stories and early communication</li><li>Fine and gross motor skills</li><li>Problem-solving, creativity and discovery</li></ul></article>
        <article className="paper-card"><span className="note-index">03</span><h3>Families and communities benefit too</h3><ul className="tidal-list"><li>Carers build support networks</li><li>Local knowledge can be shared respectfully</li><li>Families can access trusted information</li><li>Connection supports wellbeing and belonging</li></ul></article>
      </div>
      <section className="models-ribbon"><div><p className="eyebrow"><span /> Flexible by design</p><h2>Use the model that meets your community.</h2></div><div className="model-tags"><span>Parent-led</span><span>Supported</span><span>Cultural</span><span>Parent-talk</span></div></section>
      <section className="legacy-photo-strip" aria-label="Playgroup moments"><figure><img src={playgroupPhotoUrl} alt="Children and carers together at playgroup" /><figcaption>Time together</figcaption></figure><figure><img src={childPlayPhotoUrl} alt="Child engaged in play" /><figcaption>Learning through play</figcaption></figure><figure><img src={weavingPhotoUrl} alt="Weaving activity materials" /><figcaption>Creative connection</figcaption></figure></section>
    </section>
  );

  const renderToolkit = () => (
    <section className="page-frame toolkit-page">
      <div className="page-heading"><div className="toolkit-logo-eyebrow"><img src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /></div><h1>Facilitator toolkit.</h1><p>Practical prompts for structuring, setting up and recording a session.</p></div>
      <div className="tab-row" role="tablist">
        {(["structure", "setup", "checklist", "digital"] as ToolkitTab[]).map((tab) => <button key={tab} className={toolkitTab === tab ? "active" : ""} onClick={() => setToolkitTab(tab)}>{tab === "structure" ? "Session rhythm" : tab === "setup" ? "Setting up" : tab === "checklist" ? "Checklist" : "Digital Play"}</button>)}
      </div>
      {toolkitTab === "structure" && <div className="toolkit-content">
        <div className="session-rhythm"><article><span>01</span><h2>Start</h2><p className="time-label">About 15 minutes</p><ul><li>Welcome song or greeting</li><li>Free play while families arrive</li><li>Help children settle in</li><li>Build connection and belonging</li></ul></article><article><span>02</span><h2>Middle</h2><p className="time-label">About 20 minutes</p><ul><li>Parent discussion or education time</li><li>Children continue free play</li><li>Observe and support children</li><li>Share tips and experiences</li></ul></article><article><span>03</span><h2>End</h2><p className="time-label">About 15 minutes</p><ul><li>Structured activity</li><li>Goodbye song or ritual</li><li>Pack up together</li><li>Preview the next session</li></ul></article></div>
        <div className="privacy-note"><ShieldCheck size={21} /><div><strong>Download, then clear.</strong><p>When you download a session plan, all saved plans are automatically cleared from this browser on this device. Keep the downloaded PDF for your approved local reporting process.</p></div></div>
      </div>}
      {toolkitTab === "setup" && <div className="setup-layout"><article className="paper-card"><h2>Prepare a safe, welcoming space.</h2><p>Consider the physical setting, cultural appropriateness and whether families will feel comfortable spending time together there.</p><div className="risk-list">{["Space is clean and maintained", "No sharp edges or unsafe objects", "First aid kit is accessible", "Emergency exits are clear", "Shade, water and toilets are available", "Parents have a place to sit and observe"].map((item) => <div key={item}><Check size={16} />{item}</div>)}</div></article><article className="equipment-card"><h3>Materials to gather</h3><div><strong>Essential</strong><p>Play mats, age-appropriate toys, books, art materials, music, first aid and sign-in records.</p></div><div><strong>Optional</strong><p>Outdoor equipment, dress-up clothes, sand and water play, approved local resources and refreshments.</p></div><div><strong>Digital Play</strong><p>Mat for bots, instructional videos and cards, and mats and cushions for sitting.</p></div></article></div>}
      {toolkitTab === "digital" && <div className="digital-resource-pane"><article className="digital-resource-hero"><img src={childPlayPhotoUrl} alt="Child learning through play" /><div><p className="eyebrow"><span /> Available facilitator material</p><h2>Digital Play resource pack.</h2><p>Use play-based Digital Play experiences to build early literacy, numeracy and confidence with technology. Prepare the space, use only locally approved content, and support children to explore together.</p><div className="resource-link-row"><a className="primary-button small" href={suppliedGuideUrl} target="_blank" rel="noreferrer"><Download size={16} /> Open supplied facilitator guide</a><a className="outline-button small" href={printableGuideUrl} target="_blank" rel="noreferrer"><Download size={16} /> Printable app guide</a></div></div></article>{digitalExplainers()}<div className="digital-resource-cards"><article><span>01</span><h3>Set up together</h3><p>Arrange the bot mat, instructional cards, seating and cushions before children arrive. Keep space for a carer to sit alongside each child.</p></article><article><span>02</span><h3>Prompt, pause, talk</h3><p>Use one approved prompt at a time. Invite children to name, count, move and share their ideas at a comfortable pace.</p></article><article><span>03</span><h3>Close and reflect</h3><p>Finish with a shared retelling or reflection. Record what children enjoyed and any ideas for the next session.</p></article></div><div className="digital-resource-note"><ShieldCheck size={19} /><p><strong>Digital Play videos added.</strong> Use the Tale Bot, mTiny, EXLP Final and LEGO Train explainers to prepare for the session, then continue to use only Mura-approved resources and local guidance with children and carers.</p></div></div>}
      {toolkitTab === "checklist" && <div className="checklist-wrap"><div className="checklist-intro"><div><h2>Session checklist</h2><p>Tick items on-screen as you go, then download a printable record for your files. Downloading automatically clears every checklist selection from this browser on this device.</p></div><button className="primary-button small" onClick={downloadChecklistPdf}><Download size={16} /> Download checklist</button></div>{privacyNotice && <p className="privacy-clear-status" role="status">{privacyNotice}</p>}{checklistSections.map((section) => <article className="check-section" key={section.title}><h3>{section.title}</h3>{section.items.map((item, index) => { const key = `${section.title}-${index}`; return <label key={key} className={checklist[key] ? "checked" : ""}><input type="checkbox" checked={Boolean(checklist[key])} onChange={() => setChecklist({ ...checklist, [key]: !checklist[key] })} /><span className="box"><Check size={14} /></span><span>{item}</span></label>; })}</article>)}<button className="quiet-action" onClick={() => setChecklist({})}>Clear all checklist items</button></div>}
    </section>
  );

  const renderActivities = () => {
    if (selectedActivity) return <section className={`page-frame activity-detail ${selectedActivity.type === "digital" ? "digital-activity-detail" : ""}`}><button className="back-link" onClick={() => setSelectedActivity(null)}><ArrowLeft size={17} /> Back to activity library</button><div className={`detail-hero ${selectedActivity.type === "digital" ? "digital-detail-hero" : ""}`}><div><p className="eyebrow"><span /> {selectedActivity.cultural ? "Cultural activity" : selectedActivity.type === "digital" ? "Digital Play" : `${selectedActivity.type} play`}</p><h1>{selectedActivity.name}</h1><p>{selectedActivity.description}</p><div className="detail-meta"><span><Clock3 size={15} /> {selectedActivity.duration} min</span><span><UsersRound size={15} /> {selectedActivity.ages}</span></div></div>{selectedActivity.type === "digital" && <img className="digital-play-hero-image" src={digitalPlayUrl} alt="Two programmable robots on a colourful learning mat for Digital Play" />}</div><div className="detail-grid"><article className="paper-card"><h2>Skills this activity supports</h2><div className="focus-cloud">{selectedActivity.focus.map((item) => <span key={item}>{item}</span>)}</div></article><article className="paper-card"><h2>Materials needed</h2><ul className="tidal-list">{selectedActivity.materials.map((item) => <li key={item}>{item}</li>)}</ul></article></div>{selectedActivity.type === "digital" && digitalExplainers()}<article className="activity-facilitator-guide"><p className="eyebrow"><span /> Facilitator guide</p><h2>Before, during and after.</h2><p>Use this structured guide alongside the activity details. Adapt respectfully with local Mura guidance and the needs of children and carers in the session.</p><div className="activity-guide-grid">{facilitatorGuideStages(selectedActivity).map((stage) => <section key={stage.title}><h3>{stage.title}</h3><ol>{stage.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></section>)}</div></article></section>;
    return <section className="page-frame activity-page"><div className="page-heading split-heading"><div><h1>Activity library.</h1><p>Start with the needs and interests of children, carers and community. Adjust activities with appropriate local guidance.</p></div><div className="activity-count"><strong>{filteredActivities.length}</strong><span>activities ready to explore</span></div></div><div className="activity-tools"><label className="search-field"><Search size={18} /><input value={activityQuery} onChange={(event) => setActivityQuery(event.target.value)} placeholder="Search activities or skills" /></label><div className="filter-group">{(["all", "cultural", "digital", "organised", "nature", "parallel"] as const).map((type) => <button key={type} className={activityType === type ? "selected" : ""} onClick={() => setActivityType(type)}>{type === "all" ? "All activities" : type === "cultural" ? "Cultural" : type === "digital" ? "Digital Play" : type === "organised" ? "Organised" : type === "nature" ? "Nature / free play" : "Parallel play"}</button>)}</div></div><div className="activity-grid">{filteredActivities.map((activity) => <button className={`activity-card ${activity.type}`} key={activity.id} onClick={() => setSelectedActivity(activity)}><div className="activity-card-head"><span>{activity.type === "digital" ? "Digital Play" : activity.cultural ? "Cultural activity" : `${activity.type} play`}</span><span><Clock3 size={14} /> {activity.duration} min</span></div><h2>{activity.name}</h2><p>{activity.description}</p><div className="activity-card-foot"><span>{activity.ages}</span><ChevronRight size={18} /></div></button>)}</div></section>;
  };

  const renderPlanner = () => {
    if (editingPlan) {
      const stageItems = (stage: Stage, label: string, description: string) => <article className={`plan-stage stage-${stage}`} key={stage}><div className="stage-heading"><div><span>{stage === "start" ? "01" : stage === "middle" ? "02" : "03"}</span><div><h3>{label}</h3><p>{description}</p></div></div><button onClick={() => setPickerStage(stage)}><Plus size={16} /> Add activity</button></div>{editingPlan.stages[stage].length === 0 ? <p className="empty-stage">No activities selected yet.</p> : <div className="plan-activity-list">{editingPlan.stages[stage].map((id, index) => { const activity = activities.find((item) => item.id === id); if (!activity) return null; return <div key={`${id}-${index}`}><span>{activity.name}<small>{activity.duration} min</small></span><button aria-label={`Remove ${activity.name}`} onClick={() => removePlanActivity(stage, index)}><X size={16} /></button></div>; })}</div>}</article>;
      return <section className="page-frame planner-edit"><button className="back-link" onClick={() => setEditingPlan(null)}><ArrowLeft size={17} /> Back to saved plans</button><div className="planner-topline"><div><p className="eyebrow"><span /> Session plan</p><input className="plan-title-input" value={editingPlan.name} onChange={(event) => updatePlan({ name: event.target.value })} placeholder="Name this session plan" /></div><div className="planner-top-actions"><button className="outline-button" onClick={() => downloadPlanPdf(editingPlan)}><Download size={16} /> Download PDF</button><button className="primary-button small" onClick={savePlan}>Save plan</button></div></div><div className="plan-details"><label>Community name<input value={editingPlan.communityName} onChange={(event) => updatePlan({ communityName: event.target.value })} placeholder="e.g. Badu Island" /></label><label>Playgroup session time<input value={editingPlan.sessionTime} onChange={(event) => updatePlan({ sessionTime: event.target.value })} placeholder="e.g. 10:00am–12:00pm" /></label><div className="duration-card"><Clock3 size={19} /><div><small>Planned activity time</small><strong>{planDuration(editingPlan)} minutes</strong></div></div></div><div className="planning-note"><ShieldCheck size={18} />Add the community name and session time so the downloaded plan is ready for your local outreach reporting.</div><div className="session-tide-summary"><div><span>01</span><strong>Start</strong><small>{editingPlan.stages.start.length} selected</small></div><div><span>02</span><strong>Middle</strong><small>{editingPlan.stages.middle.length} selected</small></div><div><span>03</span><strong>End</strong><small>{editingPlan.stages.end.length} selected</small></div><div className="tide-total"><Clock3 size={17} /><strong>{planDuration(editingPlan)} min</strong><small>session total</small></div></div><div className="plan-stage-list">{stageItems("start", "Start", "Welcome, arrivals and settling in")}{stageItems("middle", "Middle", "Free play, conversation and exploration")}{stageItems("end", "End", "Structured experience, goodbye and pack-up")}</div><section className="evaluation-panel"><div><p className="eyebrow"><span /> Evaluation metrics</p><h2>Capture what matters after the session.</h2><p>Keep this short and useful for local reporting, follow-up and planning the next activity.</p></div><div className="evaluation-grid"><label>Children attending<input value={editingPlan.evaluation.children} onChange={(event) => setEditingPlan({ ...editingPlan, evaluation: { ...editingPlan.evaluation, children: event.target.value } })} placeholder="Number or note" /></label><label>Carers attending<input value={editingPlan.evaluation.carers} onChange={(event) => setEditingPlan({ ...editingPlan, evaluation: { ...editingPlan.evaluation, carers: event.target.value } })} placeholder="Number or note" /></label><label>Children’s engagement<textarea value={editingPlan.evaluation.engagement} onChange={(event) => setEditingPlan({ ...editingPlan, evaluation: { ...editingPlan.evaluation, engagement: event.target.value } })} placeholder="What did children enjoy or respond to?" /></label><label>Learning or emerging interests<textarea value={editingPlan.evaluation.learning} onChange={(event) => setEditingPlan({ ...editingPlan, evaluation: { ...editingPlan.evaluation, learning: event.target.value } })} placeholder="What did you notice?" /></label><label className="wide-field">Facilitator reflection and next step<textarea value={editingPlan.evaluation.reflection} onChange={(event) => setEditingPlan({ ...editingPlan, evaluation: { ...editingPlan.evaluation, reflection: event.target.value } })} placeholder="What will you keep, change or follow up next time?" /></label></div></section>{pickerStage && <div className="picker-overlay" role="dialog" aria-modal="true" aria-label="Add an activity"><div className="picker-panel"><div className="picker-header"><div><p className="eyebrow"><span /> Add to {pickerStage}</p><h2>Choose an activity</h2></div><button onClick={() => setPickerStage(null)} aria-label="Close activity picker"><X size={20} /></button></div><div className="picker-list">{activities.map((activity) => <button key={activity.id} onClick={() => addActivityToPlan(activity.id)}><div><strong>{activity.name}</strong><span>{activity.type === "digital" ? "Digital Play" : `${activity.type} play`} · {activity.duration} min</span></div><Plus size={18} /></button>)}</div></div></div>}</section>;
    }
    return <section className="page-frame planner-page"><div className="page-heading planner-heading"><h1>Session planner.</h1><p>Create a local plan, record attendance and reflection, then download it straight to the device for your approved reporting process.</p></div><div className="privacy-note planner-privacy"><ShieldCheck size={21} /><div><strong>Download, then clear.</strong><p>Plans stay in this browser only while you are working. Downloading a plan automatically clears all saved plans from this browser on this device; keep the downloaded PDF for outreach reporting or printing.</p></div></div>{privacyNotice && <p className="privacy-clear-status" role="status">{privacyNotice}</p>}<div className="planner-create-wrap"><button className="primary-button planner-create-button" onClick={() => setEditingPlan(createEmptyPlan())}><Plus size={20} /> Create a session plan</button></div>{plans.length === 0 ? <div className="empty-plans"><FileText size={38} /><h2>No saved session plans yet.</h2><p>Start with the community name, session time and one activity. You can build from there.</p><button className="outline-button" onClick={() => setEditingPlan(createEmptyPlan())}>Create your first plan <ChevronRight size={16} /></button></div> : <div className="saved-plan-grid">{plans.map((plan) => <article key={plan.id} className="saved-plan-card"><div className="saved-plan-date">{new Date(plan.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</div><h2>{plan.name}</h2><p>{plan.communityName || "Community not specified"} <span>·</span> {plan.sessionTime || "Time not specified"}</p><div className="saved-plan-stats"><span><Sparkles size={15} /> {planActivities(plan).length} activities</span><span><Clock3 size={15} /> {planDuration(plan)} min</span></div><div className="saved-plan-actions"><button onClick={() => setEditingPlan(plan)}>Open plan</button><button aria-label={`Download ${plan.name}`} onClick={() => downloadPlanPdf(plan)}><Download size={17} /></button><button aria-label={`Delete ${plan.name}`} onClick={() => { if (window.confirm(`Delete ${plan.name}?`)) setPlans(plans.filter((item) => item.id !== plan.id)); }}><Trash2 size={17} /></button></div></article>)}</div>}</section>;
  };

  const pageContent = page === "home" ? renderHome() : page === "learn" ? renderLearn() : page === "toolkit" ? renderToolkit() : page === "activities" ? renderActivities() : page === "promotional" ? renderPromotional() : renderPlanner();

  if (page === "home") {
    return <div className="legacy-home-shell"><header className="legacy-header"><div className="legacy-container"><div className="legacy-header-content"><img className="legacy-brand-mark" src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /><div><h1>{BRAND}</h1><p>Torres Strait</p></div></div><nav aria-label="Mura Moegi Kaziw Sagulau Playgroup navigation">{navItems.map((item) => <button key={item.id} className={item.id === "home" ? "active" : ""} onClick={() => navigate(item.id)}>{item.id === "home" ? "Home" : item.id === "learn" ? "Learn" : item.id === "toolkit" ? "Toolkit" : item.id === "activities" ? "Activities" : "Planner"}</button>)}</nav></div></header><main className="legacy-main"><div className="legacy-container"><section className="legacy-hero"><img src={landingPhotoUrl} alt="Children and carer participating in a play activity" /><div><p className="legacy-hero-kicker">Torres Strait facilitator resource</p><h2>Shape a session that starts with your community.</h2><p>Practical planning, activity ideas and download-ready records for children aged 0–4 across the Torres Strait.</p></div></section><section className="legacy-grid"><button onClick={() => navigate("learn")}><BookOpen className="legacy-card-icon" aria-hidden="true" /><h2>Learn About Playgroups</h2><p>Understand what playgroups are, why play is important, and the benefits for children and families.</p><strong>Explore →</strong></button><button onClick={() => navigate("toolkit")}><ClipboardCheck className="legacy-card-icon" aria-hidden="true" /><h2>Facilitator Toolkit</h2><p>Step-by-step guides, checklists, and resources for setting up and running playgroup sessions.</p><strong>Explore →</strong></button><button onClick={() => navigate("activities")}><Sparkles className="legacy-card-icon" aria-hidden="true" /><h2>Activity Library</h2><p>Browse activities including cultural activities, organised play, nature-based learning and Digital Play.</p><strong>Explore →</strong></button><button onClick={() => navigate("planner")}><FileText className="legacy-card-icon" aria-hidden="true" /><h2>Session Planner</h2><p>Plan your playgroup sessions using the Start–Middle–End structure and save them for later.</p><strong>Explore →</strong></button></section><section className="legacy-qr-card"><div className="legacy-qr-image">{qrUrl && <img src={qrUrl} alt="QR code linking to Mura Kosker Promotional Material" />}</div><div><p>Community access</p><h2>Mura Kosker Promotional Material</h2><p>Share this QR code on approved promotional material so staff and community can access the Playgroup website.</p><button onClick={downloadQrCode}>Download QR code</button></div></section></div></main><footer className="legacy-footer"><div className="legacy-container"><p>{BRAND} · Torres Strait – Supporting children aged 0–4</p><div className="legacy-partnership"><div className="legacy-partnership-copy"><p>Developed in partnership with Mura Kosker Sorority Inc., James Cook University, Lowitja Institute / Starlight Children’s Foundation Australia.</p><FooterAcknowledgements /></div><PartnerLogoRow /></div><p>Researcher: Dr Vinnitta Mosby</p></div></footer></div>;
  }

  return <div className="app-shell"><aside className={`side-nav ${menuOpen ? "open" : ""}`}><div className="brand-lockup"><img className="text-brand-mark" src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /><div><strong>Mura Moegi<br />Kaziw Sagulau</strong><span>Playgroup</span></div></div><nav aria-label="Main navigation">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon size={18} /><span>{item.label}</span><ChevronRight size={15} /></button>; })}</nav><div className="side-bottom"><button onClick={downloadGuidePdf}><BookOpen size={17} /> Print facilitator guide</button><div className="brand-note"><span className="tide-dot" /> Torres Strait resource</div></div></aside><div className="site-main"><header className="mobile-header"><button onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation"><Menu size={22} /></button><div className="mobile-brand"><img src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /><span>MMKSP</span></div><button onClick={() => navigate("planner")} aria-label="Open session planner"><FileText size={21} /></button></header><main><div className="resource-masthead"><div><img className="masthead-logo" src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /><span>{BRAND}</span></div><p><span className="masthead-dot" /> {plans.length} local {plans.length === 1 ? "plan" : "plans"} saved</p><button onClick={() => navigate("planner")}><FileText size={15} /> Open planner</button></div>{pageContent}</main><footer><div><img className="footer-brand-mark" src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /><p><strong>{BRAND}</strong><span>Torres Strait playgroup facilitator resource</span></p></div><div className="footer-partnership"><p>Developed in partnership with Mura Kosker Sorority Inc., James Cook University and Lowitja Institute / Starlight Children’s Foundation Australia.</p><FooterAcknowledgements /><PartnerLogoRow /><p>Researcher: Dr Vinnitta Mosby</p></div><div className="footer-actions"><button onClick={downloadGuidePdf}><Download size={15} /> Guide</button><button onClick={downloadChecklistPdf}><Download size={15} /> Checklist</button></div></footer></div><aside className="facilitator-strip" aria-label="Facilitator quick actions"><img className="strip-symbol" src={muraKoskerLogoUrl} alt="Mura Kosker Sorority logo" /><button title="Open session planner" onClick={() => navigate("planner")}><FileText size={18} /><span>Plan</span></button><button title="Download facilitator guide" onClick={downloadGuidePdf}><BookOpen size={18} /><span>Guide</span></button><button title="Download facilitator checklist" onClick={downloadChecklistPdf}><ClipboardCheck size={18} /><span>Checklist</span></button><button title="Download promotional QR code" onClick={downloadQrCode}><QrCode size={18} /><span>QR</span></button><div className="strip-tide"><i /><i /><i /></div></aside>{menuOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}<button className="qr-float" onClick={downloadQrCode} title="Download promotional QR code"><QrCode size={20} /><span>QR access</span></button>{qrUrl && <div className="qr-preview" aria-hidden="true"><img src={qrUrl} alt="" /><span>Mura Kosker Promotional Material</span></div>}</div>;
}
