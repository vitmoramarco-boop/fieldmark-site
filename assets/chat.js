/* Fieldmark site assistant - scripted FAQ chat, no external services, no data stored. */
(function () {
  "use strict";
  var A = {
    services: {
      q: "What do you do?",
      a: "We help food producers export and build practical business tools:<br><b>Export growth</b> - export-ready documents, market compliance for labels and gluten-free claims, importer and distributor outreach.<br><b>Get costs right</b> - a cost and margin model in Excel or Google Sheets showing every cost, supplier and product margin, plus supplier price comparisons and expense trackers.<br><b>See the numbers</b> - KPI dashboards, cash flow forecasts and pricing calculators.<br><b>Sell and save time</b> - sales and pitch decks, business websites and workflow automation.<br>You own every file. Not a report.",
      k: ["service", "do you do", "offer", "help with", "what do", "build", "website", "deck", "presentation", "automation", "dashboard", "kpi", "spreadsheet", "excel", "sheet", "margin", "cost model", "forecast"]
    },
    pricing: {
      q: "How much does it cost?",
      a: "Every engagement is quoted as a fixed fee after a free 20-minute consultation. You get a tailored proposal within 48 hours and approve the scope and price before any work starts. No hourly meter, no surprises.",
      k: ["cost", "price", "pricing", "fee", "quote", "how much", "expensive", "rate", "budget"]
    },
    who: {
      q: "Who do you work with?",
      a: "Food and beverage producers and ingredient makers selling abroad, specialists in gluten-free and allergen-free food. We work with clients worldwide, in English and Italian, in any time zone.",
      k: ["who", "industry", "industries", "size", "small", "client", "remote", "where", "international", "time zone"]
    },
    savings: {
      q: "Do you guarantee savings?",
      a: "No honest consultant can guarantee savings or sales. We commit to clear deliverables, quality and deadlines. Results depend on your product, price and market.",
      k: ["guarantee", "savings", "save", "results", "roi", "promise"]
    },
    process: {
      q: "How does it work?",
      a: "Four steps: <b>Diagnose</b> (free 20-minute call), <b>Scope</b> (fixed-fee proposal in 48 hours), <b>Deliver</b> (we build, you see progress) and <b>Hand over</b> (you own every file and account). Nothing moves without your approval.",
      k: ["how does", "process", "work", "steps", "start", "timeline", "long", "weeks", "own"]
    },
    export: {
      q: "Can you help us export?",
      a: "Yes. We get you export-ready (data sheets, price list, proposals, logistics), check each market's rules for labels and gluten-free or allergen claims, and find and contact importers and distributors in the European Union, the United Kingdom, North America, the Middle East, Asia, Australia and New Zealand and other markets.",
      k: ["export", "distributor", "importer", "market entry", "overseas", "import", "abroad", "gluten", "allergen", "label", "halal", "kosher", "market"]
    },
    advice: {
      q: "Do you give tax or legal advice?",
      a: "No. We do not give legal, tax, BAS or financial product advice. We work alongside your accountant, lawyer or other licensed advisers where it is needed.",
      k: ["tax", "legal", "lawyer", "accountant", "bas", "financial advice", "gst"]
    },
    contact: {
      q: "Book a free consultation",
      a: "Great. Use the form below or email <a href=\"mailto:hello@fieldmarkconsultancy.com\">hello@fieldmarkconsultancy.com</a>. We reply within one business day to book a free 20-minute call.",
      k: ["book", "call", "contact", "email", "talk", "meet", "consult", "phone", "speak"],
      go: true
    }
  };
  var ORDER = ["services", "pricing", "who", "process", "export", "contact"];

  var css = "" +
    ".fmc-btn{position:fixed;right:20px;bottom:20px;z-index:60;display:flex;align-items:center;gap:8px;padding:13px 18px;border-radius:999px;border:1px solid #0F1E2B;background:#0F1E2B;color:#F7F4EE;font:500 15px Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 14px 34px -14px rgba(15,30,43,.6)}" +
    ".fmc-btn:hover{background:#1C3346}.fmc-btn:focus-visible,.fmc-panel button:focus-visible,.fmc-panel input:focus-visible{outline:2px solid #C9A45C;outline-offset:3px}" +
    ".fmc-btn svg{width:18px;height:18px}" +
    ".fmc-panel{position:fixed;right:20px;bottom:84px;z-index:61;width:360px;max-width:calc(100vw - 24px);height:520px;max-height:calc(100vh - 110px);display:none;flex-direction:column;background:#F7F4EE;border:1px solid #DDD6C8;border-radius:14px;overflow:hidden;box-shadow:0 30px 70px -30px rgba(15,30,43,.65);font:15px/1.5 Inter,system-ui,sans-serif;color:#0F1E2B}" +
    ".fmc-panel.open{display:flex}" +
    ".fmc-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#0F1E2B;color:#F7F4EE}" +
    ".fmc-head b{display:block;font:600 17px Fraunces,Georgia,serif}.fmc-head small{display:block;font-size:12px;color:#AEB9C1}" +
    ".fmc-x{background:none;border:0;color:#F7F4EE;font-size:24px;line-height:1;cursor:pointer;padding:4px 8px}" +
    ".fmc-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}" +
    ".fmc-m{max-width:88%;padding:10px 13px;border-radius:12px;font-size:14.5px}" +
    ".fmc-m.bot{align-self:flex-start;background:#fff;border:1px solid #DDD6C8}" +
    ".fmc-m.me{align-self:flex-end;background:#0F1E2B;color:#F7F4EE}" +
    ".fmc-m a{color:#9A7735}" +
    ".fmc-chips{display:flex;flex-wrap:wrap;gap:6px}" +
    ".fmc-chips button{border:1px solid #C9A45C;background:#fff;color:#0F1E2B;border-radius:999px;padding:6px 11px;font:500 13px Inter,system-ui,sans-serif;cursor:pointer}" +
    ".fmc-chips button:hover{background:#F1EADA}" +
    ".fmc-form{display:flex;gap:8px;padding:12px;border-top:1px solid #DDD6C8;background:#fff}" +
    ".fmc-form input{flex:1;min-width:0;border:1px solid #DDD6C8;border-radius:8px;padding:10px 12px;font:15px Inter,system-ui,sans-serif;color:#0F1E2B;background:#fff}" +
    ".fmc-form button{border:0;border-radius:8px;background:#C9A45C;color:#0F1E2B;font:600 14px Inter,system-ui,sans-serif;padding:0 14px;cursor:pointer}" +
    ".fmc-note{padding:0 12px 10px;background:#fff;font-size:11.5px;color:#7A858D}" +
    "@media(max-width:560px){.fmc-btn{right:14px;bottom:14px;padding:12px 15px}.fmc-btn span{display:none}.fmc-panel{right:12px;left:12px;width:auto;bottom:76px;height:calc(100vh - 100px)}}";

  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement("button");
  btn.className = "fmc-btn"; btn.type = "button";
  btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "fmc-panel");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/></svg><span>Questions?</span>';
  btn.setAttribute("aria-label", "Open Fieldmark questions chat");

  var panel = document.createElement("div");
  panel.className = "fmc-panel"; panel.id = "fmc-panel";
  panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Fieldmark questions");
  panel.innerHTML = '<div class="fmc-head"><div><b>Fieldmark</b><small>Quick answers. Usually a reply within one business day for anything else.</small></div><button class="fmc-x" type="button" aria-label="Close chat">&times;</button></div>' +
    '<div class="fmc-log" aria-live="polite"></div>' +
    '<form class="fmc-form"><label class="hp" for="fmc-in" style="position:absolute;left:-9999px">Your question</label><input id="fmc-in" autocomplete="off" placeholder="Type a question..." maxlength="300"><button type="submit">Ask</button></form>' +
    '<div class="fmc-note">Automated answers only. Nothing you type here is stored.</div>';
  document.body.appendChild(btn); document.body.appendChild(panel);

  var log = panel.querySelector(".fmc-log"), input = panel.querySelector("input"), started = false;

  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; }); }
  function say(html, who) {
    var d = document.createElement("div"); d.className = "fmc-m " + (who || "bot"); d.innerHTML = html;
    log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  function chips(keys) {
    var w = document.createElement("div"); w.className = "fmc-chips";
    keys.forEach(function (k) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = A[k].q;
      b.addEventListener("click", function () { answer(k, A[k].q); });
      w.appendChild(b);
    });
    log.appendChild(w); log.scrollTop = log.scrollHeight;
  }
  function goContact(prefill) {
    var c = document.getElementById("contact"); if (!c) return;
    var ta = c.querySelector("textarea[name=message]");
    if (prefill && ta && !ta.value) ta.value = prefill;
    c.scrollIntoView({ behavior: "smooth" });
  }
  function answer(k, asked) {
    say(esc(asked), "me");
    say(A[k].a);
    if (A[k].go) { goContact(""); chips(["services", "pricing"]); }
    else chips(ORDER.filter(function (x) { return x !== k; }).slice(0, 4));
  }
  function match(text) {
    var t = " " + text.toLowerCase() + " ", best = null, score = 0;
    Object.keys(A).forEach(function (k) {
      var s = 0; A[k].k.forEach(function (w) { if (t.indexOf(w) > -1) s += w.length; });
      if (s > score) { score = s; best = k; }
    });
    return best;
  }
  function freeText(text) {
    var k = match(text);
    if (k) { answer(k, text); return; }
    say(esc(text), "me");
    var d = say("Good question - that one is best answered by a person. I have copied it into the enquiry form below so you can send it in one click, or email <a href=\"mailto:hello@fieldmarkconsultancy.com\">hello@fieldmarkconsultancy.com</a>.");
    goContact(text);
    chips(["services", "pricing", "contact"]);
  }
  function open() {
    panel.classList.add("open"); btn.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      say("Hi. I can answer common questions about Fieldmark. Pick one below or type your own.");
      chips(ORDER);
    }
    setTimeout(function () { input.focus(); }, 50);
  }
  function close() { panel.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }

  btn.addEventListener("click", function () { panel.classList.contains("open") ? close() : open(); });
  panel.querySelector(".fmc-x").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) close(); });
  panel.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); var v = input.value.trim(); if (!v) return; input.value = ""; freeText(v);
  });
})();
