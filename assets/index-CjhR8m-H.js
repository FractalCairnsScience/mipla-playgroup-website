(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();function w(e){e.innerHTML=`
    <div class="hero">
      <div class="hero-text">
        <h2>Welcome to Mipla Playgroup</h2>
        <p>Your guide to running culturally relevant playgroups for children aged 0–4 on Thursday Island, Torres Strait.</p>
      </div>
    </div>

    <div class="grid-4">
      <div class="card clickable" data-nav="learn">
        <div class="card-icon">📚</div>
        <div class="card-title">Learn About Playgroups</div>
        <div class="card-text">Understand what playgroups are, why play is important, and the benefits for children and families.</div>
        <span class="card-link">Explore &rarr;</span>
      </div>
      <div class="card clickable" data-nav="toolkit">
        <div class="card-icon">🛠️</div>
        <div class="card-title">Facilitator Toolkit</div>
        <div class="card-text">Step-by-step guides, checklists, and resources for setting up and running playgroup sessions.</div>
        <span class="card-link">Explore &rarr;</span>
      </div>
      <div class="card clickable" data-nav="activities">
        <div class="card-icon">✨</div>
        <div class="card-title">Activity Library</div>
        <div class="card-text">Browse 16 activities including cultural activities, organised play, and nature-based learning.</div>
        <span class="card-link">Explore &rarr;</span>
      </div>
      <div class="card clickable" data-nav="planner">
        <div class="card-icon">📅</div>
        <div class="card-title">Session Planner</div>
        <div class="card-text">Plan your playgroup sessions using the Start–Middle–End structure and save them for later.</div>
        <span class="card-link">Explore &rarr;</span>
      </div>
    </div>
  `,e.querySelectorAll("[data-nav]").forEach(i=>{i.addEventListener("click",()=>{const t=i.getAttribute("data-nav");t&&L(t)})})}function x(e){e.innerHTML=`
    <h2 class="page-title">Learn About Playgroups</h2>
    <p class="page-subtitle">Understanding playgroups and the importance of play</p>

    <div class="accordion">
      <div class="acc-item open">
        <button class="acc-header">What is Playgroup? <span class="acc-icon">▲</span></button>
        <div class="acc-body">
          <p>Playgroup is a regular gathering where parents, carers, and children under school age come together to play, learn, and connect with their community. It is an informal, relaxed environment where children develop social skills while parents build support networks.</p>
          <p style="margin-top:1rem;">Playgroups typically run for 1–2 hours and include a mix of free play, structured activities, and social time. They are led by facilitators or parent volunteers and provide a safe, welcoming space for families.</p>
          <img src="${m("/images/photos/playgroup-session.webp")}" alt="Playgroup session on Thursday Island" class="content-img" />
        </div>
      </div>

      <div class="acc-item">
        <button class="acc-header">Why is Play Important? <span class="acc-icon">▼</span></button>
        <div class="acc-body" style="display:none">
          <p>Play is essential for children's development. Through play, children learn about themselves, others, and the world around them. Play supports development across five key areas:</p>
          <div class="dev-grid">
            <div class="dev-card social"><strong>Social Skills</strong><p>Learning to share, take turns, cooperate, and build friendships</p></div>
            <div class="dev-card emotional"><strong>Emotional Skills</strong><p>Understanding and expressing feelings, building confidence and resilience</p></div>
            <div class="dev-card cognitive"><strong>Cognitive Skills</strong><p>Problem-solving, creativity, imagination, and early literacy and numeracy</p></div>
            <div class="dev-card motor"><strong>Motor Skills</strong><p>Developing coordination, balance, and fine motor control</p></div>
            <div class="dev-card speech"><strong>Speech &amp; Language</strong><p>Building vocabulary, communication skills, and language comprehension</p></div>
          </div>
          <img src="${m("/images/photos/child-playing.png")}" alt="Child playing at Thursday Island playgroup" class="content-img" />
        </div>
      </div>

      <div class="acc-item">
        <button class="acc-header">Benefits of Playgroup <span class="acc-icon">▼</span></button>
        <div class="acc-body" style="display:none">
          <div class="benefits-grid">
            <div class="benefit-col">
              <h4>For Children</h4>
              <ul>
                <li>Develop social and emotional skills</li>
                <li>Build confidence and independence</li>
                <li>Learn through play and exploration</li>
                <li>Prepare for preschool and school</li>
                <li>Connect with other children</li>
              </ul>
            </div>
            <div class="benefit-col">
              <h4>For Parents &amp; Carers</h4>
              <ul>
                <li>Build support networks with other families</li>
                <li>Share parenting experiences and tips</li>
                <li>Learn about child development</li>
                <li>Access community resources</li>
                <li>Reduce isolation and build confidence</li>
              </ul>
            </div>
            <div class="benefit-col">
              <h4>For the Community</h4>
              <ul>
                <li>Strengthen community connections</li>
                <li>Preserve and share cultural knowledge</li>
                <li>Support family wellbeing</li>
                <li>Build social capital</li>
              </ul>
            </div>
          </div>
          <img src="${m("/images/photos/child-drawing.png")}" alt="Community playgroup session on Thursday Island" class="content-img" />
        </div>
      </div>

      <div class="acc-item">
        <button class="acc-header">Playgroup Models <span class="acc-icon">▼</span></button>
        <div class="acc-body" style="display:none">
          <p>There are different types of playgroups to suit different community needs:</p>
          <ul style="margin:1rem 0;">
            <li><strong>Parent-led Playgroups:</strong> Run by parent volunteers, informal and flexible</li>
            <li><strong>Supported Playgroups:</strong> Led by trained facilitators, may include targeted support</li>
            <li><strong>Cultural Playgroups:</strong> Focus on preserving and celebrating cultural identity and language</li>
            <li><strong>Parent-Talk Model:</strong> Combines playgroup with parent education and discussion</li>
          </ul>
          <p>The Mipla Playgroup model combines elements of all these approaches, with a strong focus on Torres Strait Islander culture and community connection.</p>
          <img src="${m("/images/photos/weaving-activity.jpg")}" alt="Traditional weaving activity at playgroup" class="content-img" />
        </div>
      </div>

      <div class="acc-item">
        <button class="acc-header">Types of Play <span class="acc-icon">▼</span></button>
        <div class="acc-body" style="display:none">
          <div class="play-types">
            <div class="play-type-card">
              <h4>🤝 Parallel Play</h4>
              <p>Children play alongside each other without direct interaction. This is normal and healthy for toddlers. They observe and learn from each other while playing independently.</p>
            </div>
            <div class="play-type-card">
              <h4>🌿 Nature / Free Play</h4>
              <p>Unstructured play in natural environments. Children explore, discover, and create their own games. This builds creativity, resilience, and a connection to country.</p>
            </div>
            <div class="play-type-card">
              <h4>🎵 Organised Play</h4>
              <p>Structured activities led by a facilitator or parent. Includes songs, crafts, games, and cultural activities. Helps children learn to follow instructions and cooperate.</p>
            </div>
          </div>
          <img src="${m("/images/photos/children-tunnel.webp")}" alt="Children playing together at playgroup" class="content-img" />
        </div>
      </div>
    </div>
  `,e.querySelectorAll(".acc-header").forEach(i=>{i.addEventListener("click",()=>{const t=i.closest(".acc-item"),a=t.querySelector(".acc-body"),s=i.querySelector(".acc-icon"),l=t.classList.contains("open");t.classList.toggle("open",!l),a.style.display=l?"none":"block",s.textContent=l?"▼":"▲"})})}function F(e){var i;e.innerHTML=`
    <h2 class="page-title">Facilitator Toolkit</h2>
    <p class="page-subtitle">Step-by-step guides and resources for running playgroups</p>

    <div class="toolkit-tabs">
      <button class="tab-btn active" data-tab="structure">Session Structure</button>
      <button class="tab-btn" data-tab="setup">Setting Up</button>
      <button class="tab-btn" data-tab="skills">Facilitation Skills</button>
      <button class="tab-btn" data-tab="checklist">Checklists</button>
    </div>

    <div id="tab-structure" class="tab-content">
      <div class="card">
        <div class="card-title">The Start–Middle–End Model</div>
        <p style="margin-bottom:1.5rem;">Every successful playgroup session follows this simple three-part structure. It gives children a sense of routine and helps facilitators manage the session confidently.</p>
        <div class="sme-grid">
          <div class="sme-card sme-start">
            <h3>🌅 Start</h3>
            <p class="sme-time">~15 minutes</p>
            <ul>
              <li>Welcome song or greeting</li>
              <li>Free play as families arrive</li>
              <li>Help children settle in</li>
              <li>Build a sense of belonging</li>
            </ul>
          </div>
          <div class="sme-card sme-middle">
            <h3>☀️ Middle</h3>
            <p class="sme-time">~20 minutes</p>
            <ul>
              <li>Parent discussion or education time</li>
              <li>Children continue free play</li>
              <li>Facilitator observes and supports</li>
              <li>Share parenting tips and experiences</li>
            </ul>
          </div>
          <div class="sme-card sme-end">
            <h3>🌇 End</h3>
            <p class="sme-time">~15 minutes</p>
            <ul>
              <li>Structured activity (craft, drawing, music)</li>
              <li>Goodbye song or ritual</li>
              <li>Pack up together</li>
              <li>Preview next session</li>
            </ul>
          </div>
        </div>
        <p class="total-time">Total session time: approximately 50 minutes</p>
      </div>
    </div>

    <div id="tab-setup" class="tab-content" style="display:none">
      <div class="card">
        <div class="card-title">Find a Safe Space</div>
        <p style="margin-bottom:1rem;">Before starting your playgroup, assess your space for safety. Consider cultural appropriateness and ensure the space feels welcoming to your community.</p>
        <h4 style="margin-bottom:0.75rem;">Risk Assessment Checklist</h4>
        <div class="checklist" id="risk-checklist">
          ${["Space is clean and well-maintained","No sharp edges or dangerous objects","Electrical outlets covered","Adequate supervision is possible","Emergency exits clearly marked","First aid kit accessible","Outdoor area securely fenced (if applicable)","Shade available for outdoor play","Clean water and toilets available","Space for parents to sit and observe"].map((t,a)=>`
            <label class="check-item">
              <input type="checkbox" data-check="risk-${a}" />
              <span>${t}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="card" style="margin-top:1.5rem;">
        <div class="card-title">Equipment &amp; Resources</div>
        <div class="two-col">
          <div>
            <h4>Essential Items</h4>
            <ul>
              <li>Play mats or blankets</li>
              <li>Age-appropriate toys (blocks, puzzles, books)</li>
              <li>Art supplies (crayons, paper, playdough)</li>
              <li>Musical instruments or music player</li>
              <li>First aid kit</li>
              <li>Cleaning supplies</li>
              <li>Sign-in sheet and emergency contact forms</li>
            </ul>
          </div>
          <div>
            <h4>Optional Items</h4>
            <ul>
              <li>Outdoor play equipment (balls, bubbles)</li>
              <li>Dress-up clothes</li>
              <li>Sand and water play materials</li>
              <li>Cultural items (traditional instruments, weaving materials)</li>
              <li>Refreshments for morning tea</li>
            </ul>
          </div>
        </div>
      </div>
      <img src="/images/content/008.webp" alt="Playgroup setup" class="content-img" />
    </div>

    <div id="tab-skills" class="tab-content" style="display:none">
      <div class="card">
        <div class="card-title">Key Facilitation Skills</div>
        <div class="skills-grid">
          <div class="skill-card">
            <div class="skill-icon">🤝</div>
            <h4>Create a Welcoming Environment</h4>
            <ul>
              <li>Greet each family warmly by name</li>
              <li>Help new families feel included</li>
              <li>Respect cultural practices and preferences</li>
            </ul>
          </div>
          <div class="skill-card">
            <div class="skill-icon">👁️</div>
            <h4>Observe and Support</h4>
            <ul>
              <li>Watch how children play and interact</li>
              <li>Step in only when needed for safety</li>
              <li>Encourage parents to follow their child's lead</li>
            </ul>
          </div>
          <div class="skill-card">
            <div class="skill-icon">💬</div>
            <h4>Facilitate Parent Connections</h4>
            <ul>
              <li>Introduce families to each other</li>
              <li>Start conversations about parenting topics</li>
              <li>Share resources and information</li>
            </ul>
          </div>
          <div class="skill-card">
            <div class="skill-icon">⏱️</div>
            <h4>Manage the Session</h4>
            <ul>
              <li>Keep to the Start–Middle–End structure</li>
              <li>Transition smoothly between activities</li>
              <li>Handle conflicts calmly and respectfully</li>
            </ul>
          </div>
          <div class="skill-card">
            <div class="skill-icon">🌺</div>
            <h4>Cultural Responsiveness</h4>
            <ul>
              <li>Incorporate local language and stories</li>
              <li>Respect family structures and parenting styles</li>
              <li>Celebrate cultural identity and traditions</li>
            </ul>
          </div>
          <div class="skill-card">
            <div class="skill-icon">🗣️</div>
            <h4>Parent-Talk Conversations</h4>
            <ul>
              <li>Use open-ended questions</li>
              <li>Listen actively without judgment</li>
              <li>Share information in plain language</li>
            </ul>
          </div>
        </div>
      </div>
      <img src="/images/content/009.webp" alt="Facilitation skills" class="content-img" />
    </div>

    <div id="tab-checklist" class="tab-content" style="display:none">
      <div class="card">
        <div class="card-title">Before the Session</div>
        <div class="checklist" id="before-checklist">
          ${["Confirm venue is available and safe","Set up play areas and activities","Prepare materials for structured activity","Check first aid kit is stocked","Prepare sign-in sheet","Plan parent discussion topic","Prepare welcome song or greeting activity"].map((t,a)=>`
            <label class="check-item">
              <input type="checkbox" data-check="before-${a}" />
              <span>${t}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="card" style="margin-top:1.5rem;">
        <div class="card-title">During the Session</div>
        <div class="checklist" id="during-checklist">
          ${["Welcome families as they arrive","Complete sign-in sheet","Facilitate welcome activity","Monitor children's safety","Lead parent discussion (Middle)","Transition to structured activity (End)","Lead goodbye song or ritual"].map((t,a)=>`
            <label class="check-item">
              <input type="checkbox" data-check="during-${a}" />
              <span>${t}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="card" style="margin-top:1.5rem;">
        <div class="card-title">After the Session</div>
        <div class="checklist" id="after-checklist">
          ${["Pack up and clean the space","Note any concerns about children or families","Record attendance","Plan next session topic","Follow up with any families who need support","Reflect on what went well and what to improve"].map((t,a)=>`
            <label class="check-item">
              <input type="checkbox" data-check="after-${a}" />
              <span>${t}</span>
            </label>
          `).join("")}
        </div>
      </div>
      <button class="btn btn-secondary" id="reset-checklists" style="margin-top:1.5rem;">Reset All Checklists</button>
    </div>
  `,e.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".tab-btn").forEach(s=>s.classList.remove("active")),t.classList.add("active");const a=t.getAttribute("data-tab");e.querySelectorAll(".tab-content").forEach(s=>{s.style.display=s.id===`tab-${a}`?"block":"none"})})}),e.querySelectorAll('input[type="checkbox"]').forEach(t=>{const a=t,s=`mipla_check_${a.getAttribute("data-check")}`;a.checked=localStorage.getItem(s)==="true",a.addEventListener("change",()=>localStorage.setItem(s,String(a.checked)))}),(i=e.querySelector("#reset-checklists"))==null||i.addEventListener("click",()=>{confirm("Reset all checklists?")&&e.querySelectorAll('input[type="checkbox"]').forEach(t=>{const a=t;a.checked=!1,localStorage.removeItem(`mipla_check_${a.getAttribute("data-check")}`)})})}const y=[{id:"c1",name:"Head and Shoulders (Local Language)",description:"Sing 'Head and Shoulders, Knees and Toes' in Torres Strait Islander language, touching body parts.",playType:"organised",developmentalFocus:["speech","motor","social"],isCultural:!0,materials:["None required"],instructions:["Gather children in a circle","Teach the song in local language","Demonstrate body movements","Sing together while touching body parts","Repeat, gradually increasing speed"],ageRange:"1-4 years",duration:10},{id:"c2",name:"Traditional Weaving",description:"Introduce children to basic weaving using local materials such as palm fronds.",playType:"organised",developmentalFocus:["motor","social"],isCultural:!0,materials:["Palm fronds","Pandanus leaves","Other local weaving materials"],instructions:["Show examples of traditional woven items","Demonstrate simple over-under weaving","Provide pre-cut materials for safety","Guide children through basic weaving","Encourage children to help each other"],ageRange:"3-4 years",duration:20},{id:"c3",name:"Making Musical Instruments",description:"Create simple traditional instruments using natural and recycled materials.",playType:"organised",developmentalFocus:["motor","social"],isCultural:!0,materials:["Empty containers","Dried seeds or beans","Sticks","Shells","String"],instructions:["Show examples of traditional instruments","Fill containers with seeds to make shakers","Tie shells to string for ankle rattles","Decorate with natural materials","Play together as a group"],ageRange:"2-4 years",duration:25},{id:"c4",name:"Local Storytelling",description:"Share traditional stories from Torres Strait Islander culture with expressive voice and props.",playType:"organised",developmentalFocus:["speech","social"],isCultural:!0,materials:["Picture books or visual aids","Cushions for sitting"],instructions:["Gather children in a comfortable circle","Use animated voice and gestures","Show pictures or props","Ask simple questions about the story","Encourage children to share thoughts"],ageRange:"2-4 years",duration:15},{id:"c5",name:"Traditional Dance and Movement",description:"Teach simple traditional dance movements and rhythms from Torres Strait culture.",playType:"organised",developmentalFocus:["motor","social"],isCultural:!0,materials:["Music player (optional)","Open space"],instructions:["Demonstrate basic traditional dance movements","Start with simple foot patterns","Add arm movements gradually","Practice to traditional music or singing","Encourage children to move together"],ageRange:"2-4 years",duration:15},{id:"o1",name:"Welcome Song Circle",description:"Start the session with a welcoming song to help children feel comfortable and included.",playType:"organised",developmentalFocus:["social","speech"],isCultural:!1,materials:["None required"],instructions:["Sit in a circle with all children","Sing a simple welcome song","Say each child's name during the song","Encourage children to wave or clap","Repeat to build familiarity"],ageRange:"0-4 years",duration:5},{id:"o2",name:"Finger Painting",description:"Explore colours and textures through finger painting, encouraging creative expression.",playType:"organised",developmentalFocus:["motor","social"],isCultural:!1,materials:["Non-toxic finger paints","Large paper","Smocks or old shirts","Water for cleaning"],instructions:["Cover work area with protective covering","Give each child paper and paint","Demonstrate finger painting techniques","Allow free exploration and creativity","Display finished artwork to build confidence"],ageRange:"1-4 years",duration:20},{id:"o3",name:"Building Blocks Play",description:"Develop spatial awareness and problem-solving through block building.",playType:"organised",developmentalFocus:["social","motor"],isCultural:!1,materials:["Large soft blocks","Play mat"],instructions:["Set out blocks on play mat","Demonstrate stacking and building","Encourage children to build towers","Facilitate sharing and taking turns","Celebrate creations before cleanup"],ageRange:"1-4 years",duration:15},{id:"o4",name:"Singing and Action Songs",description:"Combine music with movement to develop coordination and language.",playType:"organised",developmentalFocus:["motor","speech","social"],isCultural:!1,materials:["Song list","Musical instruments (optional)"],instructions:["Choose age-appropriate action songs","Demonstrate the actions clearly","Sing slowly at first","Encourage all children to participate","Repeat favourite songs"],ageRange:"0-4 years",duration:10},{id:"o5",name:"Playdough Creations",description:"Strengthen hand muscles and encourage creativity with playdough.",playType:"organised",developmentalFocus:["motor","social"],isCultural:!1,materials:["Playdough","Cookie cutters","Rolling pins","Play mat"],instructions:["Give each child a ball of playdough","Show rolling, squashing, cutting techniques","Provide tools for exploration","Encourage children to describe what they're making","Allow free creative play"],ageRange:"2-4 years",duration:20},{id:"n1",name:"Nature Exploration Walk",description:"Explore the outdoor environment and collect natural treasures.",playType:"nature",developmentalFocus:["social","speech","motor"],isCultural:!1,materials:["Small buckets or bags","Safe outdoor area"],instructions:["Walk together in a safe outdoor space","Point out interesting natural objects","Let children collect leaves, sticks, shells","Talk about what they find","Return to discuss and sort collections"],ageRange:"2-4 years",duration:20},{id:"n2",name:"Sand and Water Play",description:"Sensory exploration with sand and water builds cognitive and motor skills.",playType:"nature",developmentalFocus:["social","motor"],isCultural:!1,materials:["Sand tray or sandbox","Water","Cups, scoops, containers"],instructions:["Set up sand and water play area","Provide various containers and tools","Allow free exploration","Facilitate sharing of tools","Supervise water play closely"],ageRange:"1-4 years",duration:25},{id:"n3",name:"Outdoor Free Play",description:"Unstructured play in a natural environment supports all areas of development.",playType:"nature",developmentalFocus:["motor","social"],isCultural:!1,materials:["Safe outdoor space","Balls","Bubbles (optional)"],instructions:["Ensure play area is safe","Allow children to explore freely","Observe and facilitate social interactions","Intervene only when necessary for safety","Encourage imaginative play"],ageRange:"0-4 years",duration:30},{id:"p1",name:"Picture Book Corner",description:"Individual book exploration in a cosy reading area develops language and imagination.",playType:"parallel",developmentalFocus:["social","speech"],isCultural:!1,materials:["Variety of picture books","Cushions","Quiet corner"],instructions:["Set up comfortable reading area","Provide basket of age-appropriate books","Allow children to choose their own books","Read quietly nearby","Children may play alongside each other"],ageRange:"0-4 years",duration:15},{id:"p2",name:"Puzzle Play",description:"Individual puzzle solving with peers nearby builds problem-solving and fine motor skills.",playType:"parallel",developmentalFocus:["social","motor"],isCultural:!1,materials:["Age-appropriate puzzles","Play mat"],instructions:["Set out various puzzles on mat","Allow children to choose their own puzzle","Children work independently but near others","Offer help only if child becomes frustrated","Celebrate completed puzzles"],ageRange:"2-4 years",duration:15},{id:"p3",name:"Colouring Station",description:"Individual colouring with shared materials develops fine motor skills and creativity.",playType:"parallel",developmentalFocus:["motor","social"],isCultural:!1,materials:["Colouring sheets","Crayons","Table or floor space"],instructions:["Set up colouring area with materials","Provide each child with paper","Share crayons in the middle","Children colour independently","Encourage but don't force sharing"],ageRange:"2-4 years",duration:20}],f={parallel:"Parallel Play",nature:"Nature / Free Play",organised:"Organised Play"},$={social:"Social Skills",motor:"Motor Skills",speech:"Speech & Language"};let o={search:"",playType:"all",focus:"all",culturalOnly:!1},v=null;function q(e){v?P(e,v):b(e)}function b(e){const i=y.filter(a=>{const s=a.name.toLowerCase().includes(o.search.toLowerCase())||a.description.toLowerCase().includes(o.search.toLowerCase()),l=o.playType==="all"||a.playType===o.playType,r=o.focus==="all"||a.developmentalFocus.includes(o.focus),u=!o.culturalOnly||a.isCultural;return s&&l&&r&&u});e.innerHTML=`
    <h2 class="page-title">Activity Library</h2>
    <p class="page-subtitle">${i.length} activities available for your playgroup sessions</p>

    <input type="text" class="search-input" id="search-input" placeholder="Search activities..." value="${o.search}" />

    <div class="filter-row">
      <button class="filter-btn ${o.playType==="all"?"active":""}" data-filter="playType" data-value="all">All Types</button>
      ${Object.entries(f).map(([a,s])=>`<button class="filter-btn ${o.playType===a?"active":""}" data-filter="playType" data-value="${a}">${s}</button>`).join("")}
    </div>
    <div class="filter-row">
      <button class="filter-btn ${o.focus==="all"?"active":""}" data-filter="focus" data-value="all">All Skills</button>
      ${Object.entries($).map(([a,s])=>`<button class="filter-btn ${o.focus===a?"active":""}" data-filter="focus" data-value="${a}">${s}</button>`).join("")}
    </div>
    <div class="filter-row">
      <button class="filter-btn ${o.culturalOnly?"active":""}" data-filter="cultural" data-value="toggle">🌺 Cultural Activities</button>
    </div>

    ${i.length===0?'<div class="empty-state"><p>No activities found. Try adjusting your filters.</p></div>':`
    <div class="activities-grid">
      ${i.map(a=>`
        <div class="activity-card ${a.isCultural?"cultural":""}" data-id="${a.id}">
          <div class="activity-header">
            <span class="activity-name">${a.name}${a.isCultural?" 🌺":""}</span>
            <span class="activity-duration">⏱️ ${a.duration} min</span>
          </div>
          <p class="activity-desc">${a.description}</p>
          <div class="activity-tags">
            <span class="tag tag-type">${f[a.playType]}</span>
            <span class="tag tag-age">👶 ${a.ageRange}</span>
          </div>
          <span class="activity-link">View details &rarr;</span>
        </div>
      `).join("")}
    </div>`}
  `;const t=e.querySelector("#search-input");t==null||t.addEventListener("input",a=>{o.search=a.target.value,b(e)}),e.querySelectorAll("[data-filter]").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-filter"),l=a.getAttribute("data-value");s==="playType"?o.playType=l:s==="focus"?o.focus=l:s==="cultural"&&(o.culturalOnly=!o.culturalOnly),b(e)})}),e.querySelectorAll("[data-id]").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");v=y.find(l=>l.id===s)||null,v&&P(e,v)})})}function P(e,i){var t;e.innerHTML=`
    <a class="back-link" id="back-btn">← Back to Activities</a>
    ${i.isCultural?'<span class="cultural-badge">🌺 Cultural Activity</span>':""}
    <h2 class="page-title">${i.name}</h2>
    <div class="detail-meta">
      <span class="tag tag-type">${f[i.playType]}</span>
      <span class="tag tag-age">👶 ${i.ageRange}</span>
      <span class="tag tag-duration">⏱️ ${i.duration} minutes</span>
    </div>
    <div class="card"><p>${i.description}</p></div>
    <div class="detail-grid">
      <div class="card">
        <div class="card-title">Developmental Focus</div>
        <div class="focus-tags">
          ${i.developmentalFocus.map(a=>`<span class="tag tag-focus">${$[a]}</span>`).join("")}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Materials Needed</div>
        <ul>${i.materials.map(a=>`<li>${a}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Instructions</div>
      <ol>${i.instructions.map(a=>`<li>${a}</li>`).join("")}</ol>
    </div>
  `,(t=e.querySelector("#back-btn"))==null||t.addEventListener("click",()=>{v=null,b(e)})}const E="mipla_plans";let d=[],n=null,c="list",h="start";function M(){try{d=JSON.parse(localStorage.getItem(E)||"[]")}catch{d=[]}}function C(){localStorage.setItem(E,JSON.stringify(d))}function p(e){M(),c==="list"?R(e):c==="edit"?T(e):c==="view"?I(e):c==="pick"&&O(e)}function R(e){var i;e.innerHTML=`
    <h2 class="page-title">Session Planner</h2>
    <p class="page-subtitle">Create and save playgroup session plans using the Start–Middle–End structure</p>
    <div class="card">
      <div class="card-title">Create New Session Plan</div>
      <input type="text" class="search-input" id="plan-name" placeholder="Enter a name (e.g., Week 1 Session)" />
      <button class="btn btn-primary" id="create-btn" style="margin-top:0.75rem;">Create Plan</button>
    </div>
    <div class="section-title" style="margin-top:2rem;">Saved Plans (${d.length})</div>
    ${d.length===0?'<div class="empty-state"><p>No saved plans yet. Create your first session plan above!</p></div>':`
    <div class="plans-grid">
      ${d.map(t=>{const a=[...t.start,...t.middle,...t.end],s=a.reduce((l,r)=>l+r.duration,0);return`<div class="plan-card" data-id="${t.id}">
          <div class="plan-name">${t.name}</div>
          <div class="plan-meta">📝 ${a.length} activities &nbsp;·&nbsp; ⏱️ ${s} min</div>
          <div class="plan-date">${new Date(t.createdAt).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"})}</div>
        </div>`}).join("")}
    </div>`}
  `,(i=e.querySelector("#create-btn"))==null||i.addEventListener("click",()=>{const t=e.querySelector("#plan-name").value.trim();if(!t){alert("Please enter a name for your session plan.");return}n={id:Date.now().toString(),name:t,start:[],middle:[],end:[],createdAt:new Date().toISOString()},c="edit",p(e)}),e.querySelectorAll("[data-id]").forEach(t=>{t.addEventListener("click",()=>{n=d.find(a=>a.id===t.getAttribute("data-id"))||null,c="view",p(e)})})}function k(e,i){return i==="start"?e.start:i==="middle"?e.middle:e.end}function T(e){var a,s;if(!n)return;const i=[...n.start,...n.middle,...n.end].reduce((l,r)=>l+r.duration,0),t=(l,r,u)=>{const g=k(n,r);return`<div class="sme-section" style="border-color:${u}; background:${u}15">
      <div class="sme-section-header">
        <h4>${l}</h4>
        <button class="btn btn-small" data-add="${r}">+ Add Activity</button>
      </div>
      ${g.length===0?'<p class="empty-hint">No activities yet.</p>':g.map((S,A)=>`<div class="plan-activity-item">
          <span>${S.name} <em>(${S.duration} min)</em></span>
          <button class="remove-btn" data-remove="${r}" data-index="${A}">✕</button>
        </div>`).join("")}
    </div>`};e.innerHTML=`
    <a class="back-link" id="cancel-btn">← Cancel</a>
    <h2 class="page-title">${n.name}</h2>
    <div class="plan-summary">Total duration: <strong>${i} minutes</strong></div>
    ${t("🌅 Start (~15 min)","start","#F59E0B")}
    ${t("☀️ Middle (~20 min)","middle","#0FA3B1")}
    ${t("🌇 End (~15 min)","end","#22C55E")}
    <button class="btn btn-primary" id="save-btn" style="width:100%;margin-top:1.5rem;">Save Session Plan</button>
  `,(a=e.querySelector("#cancel-btn"))==null||a.addEventListener("click",()=>{c="list",n=null,p(e)}),e.querySelectorAll("[data-add]").forEach(l=>{l.addEventListener("click",()=>{h=l.getAttribute("data-add"),c="pick",p(e)})}),e.querySelectorAll("[data-remove]").forEach(l=>{l.addEventListener("click",()=>{const r=l.getAttribute("data-remove"),u=parseInt(l.getAttribute("data-index")||"0");k(n,r).splice(u,1),T(e)})}),(s=e.querySelector("#save-btn"))==null||s.addEventListener("click",()=>{const l=d.findIndex(r=>r.id===n.id);l>=0?d[l]=n:d.push(n),C(),alert("Session plan saved!"),c="list",n=null,p(e)})}function I(e){var a,s,l;if(!n)return;const i=[...n.start,...n.middle,...n.end].reduce((r,u)=>r+u.duration,0),t=(r,u)=>u.length===0?"":`
    <div class="view-section">
      <h4>${r}</h4>
      ${u.map(g=>`<div class="view-activity"><strong>${g.name}</strong> <span>(${g.duration} min)</span></div>`).join("")}
    </div>`;e.innerHTML=`
    <a class="back-link" id="back-btn">← Back to Plans</a>
    <h2 class="page-title">${n.name}</h2>
    <div class="plan-summary">Total duration: <strong>${i} minutes</strong> &nbsp;·&nbsp; Created ${new Date(n.createdAt).toLocaleDateString("en-AU")}</div>
    ${t("🌅 Start",n.start)}
    ${t("☀️ Middle",n.middle)}
    ${t("🌇 End",n.end)}
    <div style="display:flex;gap:1rem;margin-top:1.5rem;">
      <button class="btn btn-primary" id="edit-btn" style="flex:1">Edit Plan</button>
      <button class="btn" id="delete-btn" style="flex:1;background:var(--error);color:white;">Delete Plan</button>
    </div>
  `,(a=e.querySelector("#back-btn"))==null||a.addEventListener("click",()=>{c="list",n=null,p(e)}),(s=e.querySelector("#edit-btn"))==null||s.addEventListener("click",()=>{c="edit",p(e)}),(l=e.querySelector("#delete-btn"))==null||l.addEventListener("click",()=>{confirm("Delete this session plan?")&&(d=d.filter(r=>r.id!==n.id),C(),c="list",n=null,p(e))})}function O(e){var i;e.innerHTML=`
    <a class="back-link" id="back-btn">← Back to Plan</a>
    <h2 class="page-title">Add Activity to ${h==="start"?"Start":h==="middle"?"Middle":"End"}</h2>
    <div class="activities-grid">
      ${y.map(t=>`
        <div class="activity-card ${t.isCultural?"cultural":""}" data-id="${t.id}">
          <div class="activity-header">
            <span class="activity-name">${t.name}${t.isCultural?" 🌺":""}</span>
            <span class="activity-duration">⏱️ ${t.duration} min</span>
          </div>
          <p class="activity-desc">${t.description}</p>
        </div>
      `).join("")}
    </div>
  `,(i=e.querySelector("#back-btn"))==null||i.addEventListener("click",()=>{c="edit",p(e)}),e.querySelectorAll("[data-id]").forEach(t=>{t.addEventListener("click",()=>{const a=y.find(s=>s.id===t.getAttribute("data-id"));a&&n&&(k(n,h).push(a),c="edit",p(e))})})}const D="/mipla-playgroup-website/".replace(/\/$/,"");function m(e){return`${D}${e}`}function L(e){document.querySelectorAll(".nav-btn").forEach(t=>{t.classList.remove("active"),t.getAttribute("data-page")===e&&t.classList.add("active")});const i=document.getElementById("content");if(i){switch(e){case"home":w(i);break;case"learn":x(i);break;case"toolkit":F(i);break;case"activities":q(i);break;case"planner":p(i);break}window.scrollTo({top:0,behavior:"smooth"})}}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".nav-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-page");i&&L(i)})}),w(document.getElementById("content"))});
