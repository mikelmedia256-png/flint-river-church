// Flint River Church — site behavior
(function () {
  "use strict";

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Church calendar ----------
  // Built from the Flint River Church Yearly Schedule. Rules repeat every year,
  // so the "upcoming" list never goes stale. Month is 0-based; weekday 0 = Sunday.
  var SUN = 0, MON = 1, WED = 3, THU = 4;

  function nth(y, m, wd, n) {
    var d = new Date(y, m, 1);
    d.setDate(1 + ((wd - d.getDay() + 7) % 7) + 7 * (n - 1));
    return d;
  }
  function easter(y) {
    var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4,
        f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3),
        h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4,
        l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
        mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, mo - 1, da);
  }
  function wedBeforeThanksgivingWeek(y) {
    var tg = nth(y, 10, THU, 4);               // Thanksgiving
    var sun = new Date(y, 10, tg.getDate() - 4); // Sunday starting Thanksgiving week
    return new Date(y, 10, sun.getDate() - 4);   // Wednesday before that week
  }

  function eventsFor(y) {
    return [
      { d: new Date(y, 0, 1), t: "New Year's Day Worship Service", n: "Start the year in worship together." },
      { d: nth(y, 0, SUN, 2), t: "Communion Sunday", n: "The Lord's Supper and washing of the saints' feet.", k: "communion" },
      { d: nth(y, 0, WED, 3), t: "Midweek Recharge returns", n: "Praise & prayer at 6:00, Bible study 6:30–7:30 p.m." },
      { d: nth(y, 1, SUN, 4), t: "Black History Program & College Jersey Sunday", n: "Celebrated during morning worship. Wear your favorite college colors!" },
      { d: nth(y, 2, SUN, 1), t: "Usher's Union Celebration", n: "2:00 p.m., following morning worship." },
      { d: nth(y, 2, MON, 4), t: "Spring Jubilation Revival", n: "Monday – Wednesday revival services.", end: 2 },
      { d: nth(y, 3, SUN, 2), t: "Communion Sunday", n: "The Lord's Supper and washing of the saints' feet.", k: "communion" },
      { d: easter(y), t: "Resurrection Sunday", n: "He is risen! Bring your family and friends." },
      { d: nth(y, 4, SUN, 2), t: "Mother's Day", n: "Honoring the mothers of Flint River." },
      { d: nth(y, 4, SUN, 3), t: "Family & Friends Day", n: "The perfect Sunday to bring someone with you." },
      { d: nth(y, 4, SUN, 4), t: "Musician Appreciation Day", n: "Celebrating our Music Ministry." },
      { d: nth(y, 5, SUN, 3), t: "Father's Day", n: "Honoring the fathers of Flint River." },
      { d: nth(y, 5, THU, 4), t: "Women's Conference", n: "Thursday & Friday, with the Women's Congress.", end: 1 },
      { d: nth(y, 6, SUN, 2), t: "Communion Sunday", n: "The Lord's Supper and washing of the saints' feet.", k: "communion" },
      { d: nth(y, 6, SUN, 4), t: "Youth Achievement Recognition Day", n: "Celebrating our students during morning worship." },
      { d: nth(y, 6, MON, 4), t: "STEAM Summer Camp", n: "Science, technology, engineering, arts & math for our youth.", end: 4 },
      { d: nth(y, 7, MON, 4), t: "Encouragement Conference", n: "Monday – Thursday.", end: 3 },
      { d: nth(y, 8, SUN, 1), t: "Heritage Sundays", n: "Every Sunday in September we highlight Flint River's 200+ year history." },
      { d: nth(y, 8, SUN, 4), t: "Homecoming & Church Anniversary", n: "Celebrating the union of Flint River and Keilah into one church family." },
      { d: nth(y, 9, SUN, 2), t: "Communion Sunday", n: "The Lord's Supper and washing of the saints' feet.", k: "communion" },
      { d: nth(y, 9, SUN, 4), t: "Pink Sunday", n: "Breast cancer awareness — wear pink!" },
      { d: nth(y, 10, WED, 1), t: "Game Night", n: "Food, fellowship, and friendly competition." },
      { d: nth(y, 10, WED, 2), t: "Game Night", n: "Food, fellowship, and friendly competition." },
      { d: wedBeforeThanksgivingWeek(y), t: "Last Midweek Recharge of the year", n: "We rest and return in January." },
      { d: nth(y, 11, MON, 1), t: "Operation Hungry", n: "Our annual outreach to feed our neighbors.", end: 6 },
      { d: nth(y, 11, SUN, 2), t: "End-of-Year Fellowship", n: "Stay after worship and celebrate the year together." }
    ];
  }

  // One-time events (add new ones here; they drop off once the date passes)
  var SPECIAL = [
    { d: new Date(2026, 10, 18), t: "Unmasked: Gospel, Prayer & Praise", n: "6:30 p.m. CT, with special musical guest The Collective." }
  ];

  // Hide sections marked data-until="YYYY-MM-DD" after that day
  document.querySelectorAll("[data-until]").forEach(function (el) {
    var p = el.getAttribute("data-until").split("-");
    if (new Date() > new Date(+p[0], p[1] - 1, +p[2], 23, 59, 59)) el.hidden = true;
  });

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function upcoming(count) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var y = today.getFullYear();
    return eventsFor(y).concat(eventsFor(y + 1), SPECIAL)
      .filter(function (e) {
        var last = new Date(e.d); last.setDate(last.getDate() + (e.end || 0));
        return last >= today;
      })
      .sort(function (a, b) { return a.d - b.d; })
      .slice(0, count);
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  document.querySelectorAll("[data-events]").forEach(function (list) {
    var n = parseInt(list.getAttribute("data-events"), 10) || 4;
    var now = new Date();
    list.innerHTML = upcoming(n).map(function (e) {
      var days = Math.round((e.d - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
      var when = days <= 0 ? "Happening now" : days === 1 ? "Tomorrow" : days < 8 ? "This " + DAYS[e.d.getDay()] : DAYS[e.d.getDay()];
      return '<article class="event">' +
        '<div class="event-date" aria-hidden="true"><div class="event-mo">' + MONTHS[e.d.getMonth()] + '</div><div class="event-day">' + e.d.getDate() + "</div></div>" +
        "<div><h3>" + esc(e.t) + "</h3><p>" + esc(e.n) + "</p></div>" +
        '<span class="tag' + (days < 8 ? " tag--soon" : "") + '">' + when + "</span></article>";
    }).join("");
  });

  // Plan-a-visit: offer the next few Sundays
  var sel = document.getElementById("visit-date");
  if (sel) {
    var d = new Date(); d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
    for (var i = 0; i < 6; i++) {
      var o = document.createElement("option");
      o.value = d.toISOString().slice(0, 10);
      o.textContent = "Sunday, " + d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
      sel.appendChild(o);
      d.setDate(d.getDate() + 7);
    }
    var other = document.createElement("option");
    other.value = "not-sure"; other.textContent = "Not sure yet";
    sel.appendChild(other);
  }

  // Plan-a-visit form: emailed to the church through FormSubmit (formsubmit.co, see README).
  document.querySelectorAll("form[data-visit-form]").forEach(function (form) {
    var btn = form.querySelector("button[type=submit]");
    var err = form.querySelector(".form-error");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = form.elements;
      if (f._honey.value) return; // bot
      var date = f.date.options[f.date.selectedIndex];
      var data = {
        Name: f.name.value.trim(),
        Email: f.email.value.trim(),
        Phone: f.phone.value.trim() || "(not given)",
        "Planning to visit": date ? date.textContent : "",
        "Who's coming": f.party.value,
        "Anything we can help with": f.notes.value.trim() || "(nothing)",
        _subject: "New visit request: " + f.name.value.trim(),
        _replyto: f.email.value.trim(),
        _template: "table"
      };
      btn.disabled = true; btn.textContent = "Sending...";
      if (err) err.hidden = true;
      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().then(function (j) { if (!r.ok || String(j.success) !== "true") throw j; }); })
        .then(function () {
          var slot = form.parentElement.querySelector("[data-first-name]");
          if (slot) slot.textContent = data.Name.split(/\s+/)[0];
          form.classList.add("sent");
          var ok = form.nextElementSibling;
          if (ok) { ok.setAttribute("tabindex", "-1"); ok.focus(); }
        })
        .catch(function () {
          if (err) err.hidden = false;
          btn.disabled = false; btn.textContent = "Plan My Visit";
        });
    });
  });
})();
