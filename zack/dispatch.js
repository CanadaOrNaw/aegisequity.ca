(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentAudienceMode = "all";

  const SHIFT_EVENTS = {
    "02:49": {
      time: "02:49 EDT",
      unit: "auto_git_commit.timer + daily-clamscan.timer (03:30)",
      field: "Off-shift · Heavy equipment parked at yard; asphalt plant closed.",
      machine: "Child-process isolated Git snapshots across ~20 repos; ClamAV scan on workstation & Pi 3B (04:24); ICM fidelity scan (05:48).",
      sysId: "SYS-04",
      shiftFlap: "02:49 SNAP "
    },
    "06:20": {
      time: "06:20 EDT",
      unit: "frigate-nvr.service + harwick-calendar-rolling.timer",
      field: "Morning truck & trailer walkaround at yard; hitching rollers and checking fuel.",
      machine: "Frigate 7-camera NVR logs overnight yard/perimeter events; Echo 5-room PipeWire audio wakes; 28-day social rolling queue verified.",
      sysId: "SYS-03",
      shiftFlap: "06:20 7-CAM"
    },
    "06:30": {
      time: "06:30 EDT",
      unit: "claude-agents-brief.timer + harwick-call-list.timer",
      field: "En route to Kawartha Lakes job site; reading Telegram brief on phone.",
      machine: "morning_brief.py reads disk/systemd state (atilla, harwick, aegis heartbeats, 24h job receipts, quota governor, money radar) & sends one Telegram brief.",
      sysId: "SYS-01",
      shiftFlap: "06:30 BRIEF"
    },
    "07:30": {
      time: "07:30 EDT",
      unit: "harwick-tender-sweep.timer + security-log-review.timer",
      field: "On site: skid-steer grading, gravel base prep, and crew briefing.",
      machine: "Sweeps municipal bid boards (CKL tenders) for paving/winter work; updates 1,443-site B2B prospect index; security-log-review checks Falco & journald (flagged=0).",
      sysId: "SYS-05",
      shiftFlap: "07:30 BIDS "
    },
    "09:05": {
      time: "09:05 EDT",
      unit: "aegis-culinary-blog-publish.timer + aegis-weekly-blog.timer",
      field: "Hot-mix asphalt delivery arriving; operating asphalt paver & steel-drum roller.",
      machine: "Publishes weekly SEO articles for Aegis Equity and client Culinary Revolutionary, rebuilds sitemap/RSS, and passes check-site.py.",
      sysId: "SYS-06",
      shiftFlap: "09:05 SEO  "
    },
    "14:00": {
      time: "14:00 EDT",
      unit: "dex.service (127.0.0.1:18766) · System-1 Decision Engine",
      field: "Compaction passes on driveway/parking lot; coordinating second asphalt load.",
      machine: "Dex-1B (1.1B Ettin encoder + custom decision head) serves local typed choice, score, and yes/no decisions in 18 ms ($0 API cost).",
      sysId: "SYS-02",
      shiftFlap: "14:00 18MS "
    },
    "17:00": {
      time: "17:00 EDT",
      unit: "harwick-social-weekly-drafts.timer + media CLI (Colab A100)",
      field: "Cleaning paver screed, loading equipment onto trailer, wrapping job site.",
      machine: "Runs 3-round fact-check gate on 9 weekly social drafts (232s, PASS), publishes 17:00 Reel, and queues on-demand A100/Framefields media renders.",
      sysId: "SYS-07",
      shiftFlap: "17:00 PASS "
    }
  };

  const SYSTEMS_DATA = {
    "SYS-01": {
      code: "SYS-01",
      name: "Harwick Autonomous Marketing & Ops Engine",
      flap: "81 VIDEOS  ",
      flapEmployer: "39 TIMERS  ",
      flapClient: "$650/MO DFY",
      badge: "VERIFIED · 39 TIMERS · PASS",
      schedule: "06:20 / 06:30 / 17:00 EDT",
      whatItDoes: "Runs daily marketing and morning operations for Harwick Paving Ltd.: selects weekly topics from a keyword rotation, drafts Facebook, Instagram, and YouTube posts, enforces a multi-round fact-check against an approved company fact sheet before scheduling, and sends a 06:30 Telegram morning briefing.",
      howBuilt: "Three isolated Claude Code agents (atilla, harwick, aegis) orchestrated by 39 systemd user timers, Python dispatchers (agent_job.py, morning_brief.py, harwick_money_radar.py), YouTube Data API, and Meta Planner automation with a 3-round claim verification gate.",
      specs: [
        ["Active Timers", "39 systemd user timers (net-watch, brief, rolling calendar, rank check)"],
        ["Published Output", "81 YouTube Shorts & explainers + daily FB/IG Reels on 28-day rolling window"],
        ["Fact-Check Gate", "Up to 3 automated repair rounds against approved facts.md; 0 unverified claims"],
        ["Agent Isolation", "3 workspaces (atilla, harwick, aegis) with JSON job receipts & heartbeat checks"]
      ],
      receipt: `{
  "id": "20261011T170009-harwick-social-weekly-drafts",
  "job": "harwick-social-weekly-drafts",
  "agent": "harwick",
  "status": "PASS",
  "startedAt": "2026-10-11T21:00:10.689Z",
  "finishedAt": "2026-10-11T21:04:02.745Z",
  "durationMs": 232056,
  "answer": "Harwick social drafts for 2026-W42 are ready to review. All 9 posts pass the checker (round 2 of 3)."
}`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-01" },
        { label: "Harwick Route Map ↗", href: "https://canadaornaw.github.io/harwick-route" },
        { label: "@HarwickPavingLtd YouTube ↗", href: "https://www.youtube.com/@HarwickPavingLtd" }
      ]
    },
    "SYS-02": {
      code: "SYS-02",
      name: "Dex-1B: Non-Autoregressive Decision Model",
      flap: "81.5% 18MS ",
      flapEmployer: "784M TUNED ",
      flapClient: "LOCAL $0/MO",
      badge: "APACHE-2.0 · 1.1B PARAMS",
      schedule: "18 ms / forward pass",
      whatItDoes: "Open-source, drop-in local replacement for the paid TypeSafe Jev API (POST /v1/systemone). Answers typed choice, score, and yes/no questions over any text with calibrated probabilities in a single non-autoregressive forward pass — never generates text, so nothing to parse and nothing to hallucinate.",
      howBuilt: "Swapped stock Laya's 395M encoder for the 1.1B Ettin bidirectional encoder (784M parameters fine-tuned; embeddings and lowest 7 of 28 layers frozen) and trained a custom decision head from scratch on a home RTX 3070 Ti (8 GB) in bfloat16 using strictly proper scoring rules (cross-entropy + KL divergence) across ~1,080 distinct instruction wordings.",
      specs: [
        ["Architecture", "Ettin-1B bidirectional encoder (1.1B total / 784M tuned) + custom typed head"],
        ["Everyday Use Cases (1,244 q)", "81.5% vs. human labels (Paid JEV API: 84.6% · Stock Laya: 68.2%)"],
        ["Command Gating & Unseen", "93.3% command gating (vs. 47.5% stock) · 74.4% on 1,737 unseen tasks"],
        ["Latency & Footprint", "18 ms single decision · 95 ms for 15 questions · 2.4 GB VRAM in bfloat16"]
      ],
      receipt: `$ curl -s http://127.0.0.1:18766/v1/systemone -d '{
  "state": "Hi, I was charged twice. Please refund the duplicate.",
  "questions": {"refund": {"type": "noul", "instructions": "Is the customer asking for money back?"}}
}'
{
  "model": "dex-1b",
  "answers": { "refund": { "type": "noul", "noul": "yes", "confidence": 0.964 } },
  "usage": { "input_tokens": 29, "cost_usd": 0 }
}
# Decision Index v0.3 run: 140,620 requests in 4.4h on 1x RTX 3070 Ti -> Skill 12.99 (3x stock Laya 4.43)`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-02" },
        { label: "GitHub: CanadaOrNaw/dex ↗", href: "https://github.com/CanadaOrNaw/dex" },
        { label: "Hugging Face: dex-1b ↗", href: "https://huggingface.co/CanadaOrNaw/dex-1b" }
      ]
    },
    "SYS-03": {
      code: "SYS-03",
      name: "Echo Home: Local Voice, LLM & 7-Camera Vision",
      flap: "7 CAM 5 RM ",
      flapEmployer: "VULKAN+NVR ",
      flapClient: "LOCAL NVR  ",
      badge: "100% LOCAL · VULKAN + FRIGATE",
      schedule: "Continuous real-time",
      whatItDoes: "Whole-house local voice assistant and multi-camera computer vision system running entirely on local hardware with zero cloud APIs. Hears a custom 'Echo' wake word, transcribes speech, runs a tool-calling local LLM agent, speaks back via Kokoro TTS across five rooms, and monitors seven cameras.",
      howBuilt: "Custom openWakeWord model -> whisper.cpp STT -> local LLM agent on llama.cpp (Vulkan) calling live tools (time, weather, search, files, memory) -> Kokoro TTS routed through PipeWire to 5 rooms. Vision runs Frigate NVR across 7 cameras (including ESP32 nodes) with dual tuned CPU detectors plus local VLM evaluation on dark/low-FPS frames.",
      specs: [
        ["Voice Pipeline", "Custom openWakeWord ('Echo') -> whisper.cpp -> llama.cpp (Vulkan) -> Kokoro TTS"],
        ["Audio Topology", "5-room PipeWire routing matrix with active room tracking"],
        ["Vision / NVR", "Frigate on 7 cameras (RTSP + ESP32) with person & vehicle detection"],
        ["Detector Tuning", "Dual CPU detectors balanced to prevent high-frame camera starvation + VLM night tests"]
      ],
      receipt: `[Echo Home Verification Log]
- Wake word: Custom "Echo" model active (openWakeWord)
- Brain: Local tool loop (time, weather, Exa search, files, memory) on RTX 3070 Ti (keep-alive active)
- Audio: 5-room PipeWire sink routing + Kokoro local neural voice
- Vision: 7 camera streams (incl. ESP32) -> Frigate person/vehicle detection + VLM low-light frame evaluation`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-03" }
      ]
    },
    "SYS-04": {
      code: "SYS-04",
      name: "OpenClaw Upstream Kernel & Gateway Fixes",
      flap: "PR #142018 ",
      flapEmployer: "P1 LIVELOCK",
      flapClient: "390K STARS ",
      badge: "3x DIAMOND LOBSTER · MERGED",
      schedule: "Merged Sept 2026",
      whatItDoes: "Root-cause isolation, source-level reproduction, and fix architecture for OpenClaw (~390k-star open-source AI agent framework), resolving a session transcript livelock that froze all message channels under sustained write load.",
      howBuilt: "Traced main-thread starvation to synchronous session transcript projection reconciliation (#115908), authored the fix design in PR #116259 that merged fix #142018 is built on, and submitted two additional security/auth source reproductions (#115909 device-identity pairing rejection; #107069 unstamped internal wake provenance).",
      specs: [
        ["Upstream Project", "github.com/openclaw/openclaw (~390,000 GitHub stars)"],
        ["Credited Fix", "Merged PR #142018 (built on Zack's fix architecture in PR #116259)"],
        ["Issue Quality Rating", "3x 'diamond lobster' + clawsweeper:source-repro (#115908, #115909, #107069)"],
        ["Failure Classes", "P1 session-state livelock, P1 gateway auth pairing deadlock, input provenance gate"]
      ],
      receipt: `[GitHub Verification: openclaw/openclaw]
- Issue #115908 (P1, closed): "Session transcript projection reconcile can livelock under sustained writes, blocking the main thread and stalling all channel transports" -> label: "issue-rating: diamond lobster"
- PR #116259 -> Merged Fix #142018 (Credited Contributor)
- Issue #115909 (P1, impact:security): Gateway device-identity PAIRING_REQUIRED unreachable -> issue-rating: diamond lobster
- Issue #107069 (impact:security): before_agent_run input provenance gate -> issue-rating: diamond lobster`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-04" },
        { label: "Issue #115908 ↗", href: "https://github.com/openclaw/openclaw/issues/115908" },
        { label: "Fix Design PR #116259 ↗", href: "https://github.com/openclaw/openclaw/pull/116259" }
      ]
    },
    "SYS-05": {
      code: "SYS-05",
      name: "B2B Lead Engine & Commercial Financial Audit",
      flap: "1443 SITES ",
      flapEmployer: "456 QUERIES",
      flapClient: "175 LEADS  ",
      badge: "456 QUERIES · $457K AUDITED",
      schedule: "Mon 06:30 / Thu 07:30 EDT",
      whatItDoes: "Automated B2B discovery and website diagnostic pipeline across Durham Region and the Kawarthas, paired with a full-ledger forensic categorization of Harwick Paving's corporate bank records, QuickBooks exports, and loan schedules.",
      howBuilt: "Python crawlers and inspection scripts executed 456 town-by-category searches, parsed 1,443 local business websites for broken SSL, locked pages, or thin templates, and ranked 175 commercial prospects. Financial tooling reconciled 4 months of bank feeds ($226,735 in / $231,219 out) and isolated $157k of misposted QuickBooks entries.",
      specs: [
        ["Lead Pipeline", "456 searches -> 1,443 business websites read -> 175 verified & ranked prospects"],
        ["Live Site Diagnostics", "49 local businesses confirmed with broken SSL, Private Site lock, or missing mobile UI"],
        ["Bank Reconciliation", "4 months categorized ($226,735 inflows / $231,219 outflows) across corporate accounts"],
        ["GL Audit Finding", "Traced QuickBooks zero-report export bug & $157k customer payments in Inventory Asset"]
      ],
      receipt: `[Campaign & Financial Verification Record]
- B2B Discovery: 456 town-by-trade queries across Kawartha Lakes & Durham Region
- Web Audit: 1,443 domains inspected; competitors filtered; 175 commercial prospects + 49 Aegis web-rebuild targets verified live (2026-10-20)
- Corporate Ledger: $226,735.00 inflows / $231,219.00 outflows categorized; loan & lease schedule mapped for owners`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-05" },
        { label: "Aegis Offer & Scope ↓", href: "#hire-aegis" }
      ]
    },
    "SYS-06": {
      code: "SYS-06",
      name: "Aegis Client Web, SEO & Hardware Builds",
      flap: "CLIENT PAID",
      flapEmployer: "ZERO-DEP CI",
      flapClient: "CLIENT PAID",
      badge: "LIVE SITES · CAD & IOT",
      schedule: "Thu 09:05 / Tue 09:00 EDT",
      whatItDoes: "Delivers production websites, domain/DNS/DKIM email migrations, recurring automated weekly SEO blogs, and custom 3D-printed enclosures and solar Meshtastic/ESP32 nodes for local businesses and rural properties.",
      howBuilt: "Static zero-dependency HTML/CSS/JS deployed on GitHub Pages with Python blog/sitemap/RSS generators (build-blog.py) and automated pre-push verification suites (tests/check-site.py). Hardware jobs designed in CAD, sliced in PrusaSlicer/Creality Print, and paired with ESP32/Meshtastic firmware.",
      specs: [
        ["Paid Client Delivery", "culinary-revolutionary.com (Wix->GH Pages, Namecheap DNS, DKIM mailbox, Web3Forms)"],
        ["Recurring Automation", "Weekly SEO blog researched, checked & published + GBP & Yelp setup (Account AEC-CR-001)"],
        ["Interactive Map Site", "canadaornaw.github.io/harwick-route (hand-painted Kawarthas season map portfolio)"],
        ["Physical Builds", "Meshtastic solar roof node (2026-08-18), CYD snap cases, rugged weather enclosures"]
      ],
      receipt: `{
  "id": "20261011T173009-aegis-social-weekly-drafts",
  "job": "aegis-social-weekly-drafts",
  "agent": "aegis",
  "status": "PASS",
  "startedAt": "2026-10-11T21:30:10.936Z",
  "finishedAt": "2026-10-11T21:31:47.293Z",
  "durationMs": 96357,
  "clientAccount": "AEC-CR-001 (Invoices AEC-2026-001 & AEC-2026-002 PAID 2026-09-22)"
}`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-06" },
        { label: "culinary-revolutionary.com ↗", href: "https://culinary-revolutionary.com/" },
        { label: "aegisequity.ca ↗", href: "https://aegisequity.ca/" },
        { label: "harwick-route Map ↗", href: "https://canadaornaw.github.io/harwick-route" }
      ]
    },
    "SYS-07": {
      code: "SYS-07",
      name: "Field Heavy Equipment & Generative Media Pipeline",
      flap: "8YRS + A100",
      flapEmployer: "A100 WORKER",
      flapClient: "8+ YRS CREW",
      badge: "PAVER / ROLLER · COLAB CLI",
      schedule: "07:00 Field · On-Demand GPU",
      whatItDoes: "Eight-plus years operating asphalt pavers, skid steers, steel-drum and pneumatic rollers, and directing paving crews—paired with a 6-stage gated generative media pipeline driving a local RTX 3070 Ti, an on-demand Colab A100 CLI worker, and Framefields WebGPU motion graphics.",
      howBuilt: "Built the 'media' CLI worker to spin up Colab A100 GPUs on demand, run Z-Image-Turbo / Qwen-Image / Wan I2V animation variants, log every take on a contact sheet, and shut down compute immediately to protect budget, while rendering Kokoro/ACE-Step audio and ffmpeg mastering locally.",
      specs: [
        ["Heavy Equipment", "Asphalt paver, skid steer, steel-drum & pneumatic rollers, dump truck & trailer"],
        ["Field Credentials", "8+ years paving/excavation/grading · Ontario Class G · First Aid & CPR (2025) · WHMIS"],
        ["Generative Stack", "Z-Image-Turbo, Qwen-Image, Wan 2.2 I2V (Colab A100 CLI), ACE-Step 1.5, Kokoro TTS"],
        ["Quality Control Gate", "6-stage folder contract; contact-sheet take selection (e.g. 7 speed takes -> 3.5x locked)"]
      ],
      receipt: `[Pipeline Gate Log: Gears Breakcore Contact Sheet]
- Stage 1 (Still): Approved high-res source frame locked
- Stage 2 (Animation Matrix): 7 speed variants rendered on A100 via 'media' CLI (speeds 2.0, 2.5, 3.0, 3.25, 3.5, 3.75, 4.0)
- Gate Verdict: Speed 3.5 selected for mechanical lock; 6 takes rejected -> assembled to 54-min 1440p master
- Next Lab Builds: Framefields WebGPU system explainers ("How the Machine Runs" & "Dex-1B 18ms") in active render`,
      links: [
        { label: "Inspect Full Plate ↓", href: "#plate-sys-07" },
        { label: "Hire / Subcontract ↓", href: "#hire-zack" }
      ]
    }
  };

  function getModeFlap(data, mode) {
    if (mode === "employer") return data.flapEmployer;
    if (mode === "client") return data.flapClient;
    return data.flap;
  }

  function createFlapCells(container, text) {
    const padded = (text || "").toUpperCase().padEnd(11, " ").slice(0, 11);
    container.innerHTML = "";
    for (let i = 0; i < padded.length; i++) {
      const span = document.createElement("span");
      span.className = "flap-char";
      span.textContent = padded[i];
      container.appendChild(span);
    }
  }

  function animateFlapString(container, targetText) {
    const padded = (targetText || "").toUpperCase().padEnd(11, " ").slice(0, 11);
    let chars = container.querySelectorAll(".flap-char");
    if (chars.length !== 11) {
      createFlapCells(container, padded);
      chars = container.querySelectorAll(".flap-char");
    }
    if (reducedMotion) {
      chars.forEach((c, idx) => {
        c.textContent = padded[idx];
      });
      return;
    }
    const drum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.%#*+- ";
    chars.forEach((cell, idx) => {
      const finalChar = padded[idx];
      if (cell.textContent === finalChar) return;
      let steps = 0;
      const maxSteps = 2 + (idx % 3);
      cell.classList.add("flipping");
      const timer = setInterval(() => {
        steps++;
        if (steps >= maxSteps) {
          clearInterval(timer);
          cell.textContent = finalChar;
          cell.classList.remove("flipping");
        } else {
          cell.textContent = drum[(idx * 7 + steps * 5) % drum.length];
        }
      }, 45);
    });
  }

  function renderInspector(sysId, shouldScroll = false) {
    const data = SYSTEMS_DATA[sysId];
    if (!data) return;

    const titleEl = document.getElementById("inspector-title");
    const codeEl = document.getElementById("inspector-code");
    const schedEl = document.getElementById("inspector-schedule");
    const badgeEl = document.getElementById("inspector-badge");
    const whatEl = document.getElementById("inspector-what");
    const howEl = document.getElementById("inspector-how");
    const specsBody = document.getElementById("inspector-specs-body");
    const receiptEl = document.getElementById("inspector-receipt");
    const linksEl = document.getElementById("inspector-links");

    if (titleEl) titleEl.textContent = `${data.code} — ${data.name}`;
    if (codeEl) codeEl.textContent = `PLATE ${data.code}`;
    if (schedEl) schedEl.textContent = data.schedule;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (whatEl) whatEl.textContent = data.whatItDoes;
    if (howEl) howEl.textContent = data.howBuilt;

    if (specsBody) {
      specsBody.innerHTML = data.specs
        .map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`)
        .join("");
    }

    if (receiptEl) {
      receiptEl.textContent = data.receipt;
    }

    if (linksEl) {
      linksEl.innerHTML = data.links
        .map((l, idx) => `<a class="tactile-btn ${idx === 0 ? "gold" : "ghost"}" href="${l.href}">${l.label}</a>`)
        .join("");
    }

    document.querySelectorAll(".dispatch-row").forEach((row) => {
      const isMatch = row.getAttribute("data-sys") === sysId;
      row.classList.toggle("is-active", isMatch);
      row.setAttribute("aria-expanded", isMatch ? "true" : "false");
    });

    document.querySelectorAll(".system-spec-plate").forEach((plate) => {
      plate.classList.toggle("is-highlighted", plate.id === `plate-${sysId.toLowerCase()}`);
    });

    if (shouldScroll) {
      const inspectorSection = document.getElementById("active-inspector");
      if (inspectorSection) {
        inspectorSection.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
      }
    }
  }

  function setShiftHour(hourKey, triggerRowUpdate = true) {
    const ev = SHIFT_EVENTS[hourKey];
    if (!ev) return;

    document.querySelectorAll(".shift-hour-btn").forEach((btn) => {
      const active = btn.getAttribute("data-hour") === hourKey;
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    const unitEl = document.getElementById("shift-active-unit");
    const fieldEl = document.getElementById("shift-field-readout");
    const machineEl = document.getElementById("shift-machine-readout");

    if (unitEl) unitEl.textContent = `${ev.time} · ${ev.unit}`;
    if (fieldEl) fieldEl.textContent = ev.field;
    if (machineEl) machineEl.textContent = ev.machine;

    if (triggerRowUpdate && ev.sysId) {
      document.querySelectorAll(".dispatch-row").forEach((row) => {
        const sysId = row.getAttribute("data-sys");
        const data = SYSTEMS_DATA[sysId];
        const flapContainer = row.querySelector(".flap-strip");
        if (!flapContainer || !data) return;
        const targetFlap = sysId === ev.sysId && ev.shiftFlap ? ev.shiftFlap : getModeFlap(data, currentAudienceMode);
        animateFlapString(flapContainer, targetFlap);
      });
      renderInspector(ev.sysId, false);
    }
  }

  function setAudienceMode(mode) {
    currentAudienceMode = mode;
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      const pressed = btn.getAttribute("data-mode") === mode;
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    });

    const thesisEl = document.getElementById("hero-mode-note");
    if (thesisEl) {
      if (mode === "employer") {
        thesisEl.textContent =
          "EMPLOYER & TECHNICAL VIEW: Highlighting 5 engineering & field-ops systems — multi-agent automation, Dex-1B model training (81.5% human-label accuracy, 18 ms), 7-camera local vision, and OpenClaw upstream fixes.";
      } else if (mode === "client") {
        thesisEl.textContent =
          "AEGIS CLIENT & SUBCONTRACT VIEW: Highlighting 4 commercial delivery systems — the $650/mo Done-For-You Local Marketing Plan, $900 Website Rebuilds, custom 3D-printed / IoT hardware, and heavy equipment field operations.";
      } else {
        thesisEl.textContent =
          "UNIFIED CONTROL ROOM: Showing all 7 production AI, web, hardware, and field systems built and operated by Zack Harper across Harwick Paving Ltd. and Aegis Engineered Solutions.";
      }
    }

    document.querySelectorAll(".dispatch-row").forEach((row) => {
      const sysId = row.getAttribute("data-sys");
      const tags = (row.getAttribute("data-audience") || "").split(",");
      const data = SYSTEMS_DATA[sysId];
      const flapContainer = row.querySelector(".flap-strip");

      const matches = mode === "all" || tags.includes(mode);
      row.classList.toggle("is-dimmed", !matches);

      if (flapContainer && data) {
        animateFlapString(flapContainer, getModeFlap(data, mode));
      }
    });

    const defaultInspect = mode === "employer" ? "SYS-02" : mode === "client" ? "SYS-06" : "SYS-01";
    renderInspector(defaultInspect, false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dispatch-row").forEach((row) => {
      const sysId = row.getAttribute("data-sys");
      const data = SYSTEMS_DATA[sysId];
      const flapContainer = row.querySelector(".flap-strip");
      if (flapContainer && data) {
        createFlapCells(flapContainer, "-----------");
        setTimeout(() => animateFlapString(flapContainer, data.flap), 60);
      }

      row.addEventListener("click", () => {
        renderInspector(sysId, true);
      });
    });

    document.querySelectorAll(".shift-hour-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hour = btn.getAttribute("data-hour");
        setShiftHour(hour, true);
      });
    });

    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode");
        setAudienceMode(mode);
      });
    });

    setShiftHour("06:30", false);
    renderInspector("SYS-01", false);
  });
})();
