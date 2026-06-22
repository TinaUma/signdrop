"""One-shot script: inject DOM patches into Claude Design bundle."""

import sys, os

SRC = os.path.join(os.path.dirname(__file__), "..", "deploy", "index.html")
DST = os.path.join(os.path.dirname(__file__), "..", "landing", "index.html")

PATCH = """\
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" href="/favicon.ico">
  <!-- Yandex.Metrika counter -->
  <script type="text/javascript">
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
    ym(109747040,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/109747040" style="position:absolute;left:-9999px;" alt="" /></div></noscript>
  <!-- /Yandex.Metrika counter -->
  <script>
    window.addEventListener("load", function() {

      // Cookie banner: hide if already accepted, bind Принять button
      function initCookieBanner() {
        function hideBanner() {
          document.querySelectorAll("div,section,footer,aside").forEach(function(el) {
            if (el.textContent.indexOf("\\u042f\\u043d\\u0434\\u0435\\u043a\\u0441.\\u041c\\u0435\\u0442\\u0440\\u0438\\u043a\\u0443") >= 0 &&
                el.textContent.length < 500) {
              el.style.display = "none";
            }
          });
        }
        if (localStorage.getItem("sd_cookie_ok")) { hideBanner(); return; }
        function bindAccept() {
          document.querySelectorAll("button, a").forEach(function(el) {
            if (el.textContent.trim() === "\\u041f\\u0440\\u0438\\u043d\\u044f\\u0442\\u044c" && !el._sdBound) {
              el._sdBound = true;
              el.addEventListener("click", function(e) {
                e.preventDefault(); e.stopPropagation();
                localStorage.setItem("sd_cookie_ok", "1");
                hideBanner();
              });
            }
          });
        }
        bindAccept();
        setTimeout(bindAccept, 1500);
        setTimeout(bindAccept, 4000);
      }

      function patchLinks() {
        // GitHub icon in header
        document.querySelectorAll(".sd-header a, header a").forEach(function(a) {
          var hasSvg = !!a.querySelector("svg");
          var label = (a.getAttribute("aria-label") || "").toLowerCase();
          var href = a.getAttribute("href") || "";
          var txt = a.textContent.trim();
          if (label.indexOf("github") >= 0 || (hasSvg && txt.length < 3 && (!href || href === "#"))) {
            a.href = "https://github.com/TinaUma/signdrop";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }
        });

        document.querySelectorAll("a").forEach(function(a) {
          var txt = a.textContent.trim();
          var href = (a.getAttribute("href") || "").toLowerCase();

          if (txt.indexOf("\\u041f\\u043e\\u0434\\u0434\\u0435\\u0440\\u0436\\u0430\\u0442\\u044c") >= 0 ||
              txt.indexOf("CloudTips") >= 0 || txt.indexOf("Ko-fi") >= 0 || txt.indexOf("Ko-Fi") >= 0) {
            a.href = "https://pay.cloudtips.ru/p/ea5537e6";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          // YooMoney — mixed Cyrillic+Latin spelling: Ю (U+042E) + Latin "Money"
          var txtLow = txt.toLowerCase();
          if (txt.indexOf("\\u042eMoney") >= 0 || txt.indexOf("\\u042e\\u041coney") >= 0 ||
              txt.indexOf("\\u042e\\u041c\\u043e\\u043d\\u0435\\u0439") >= 0 ||
              txt.indexOf("YooMoney") >= 0 || txt.indexOf("YuMoney") >= 0 ||
              txtLow.indexOf("\\u044emoney") >= 0 ||
              txtLow.indexOf("\\u044e\\u043c\\u0430\\u043d\\u0438") >= 0 ||
              txtLow.indexOf("yoomoney") >= 0) {
            a.href = "https://yoomoney.ru/to/4100119540100972";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          if ((txt === "GitHub" || txt === "GitHub \\u2197") && (!href || href === "#")) {
            a.href = "https://github.com/TinaUma/signdrop";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          if (txt.indexOf("TAUSIK Core") >= 0 && (!href || href === "#")) {
            a.href = "https://github.com/Kibertum/tausik-core";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          if (txt.toLowerCase().indexOf("docker") >= 0 && (!href || href === "#" || href === "")) {
            a.href = "https://github.com/TinaUma/signdrop#docker";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          // "Попробовать онлайн" / "Try Online" — live demo button (hero + footer)
          var txtLowTry = txt.toLowerCase();
          if (txtLowTry.indexOf("\\u043f\\u043e\\u043f\\u0440\\u043e\\u0431\\u043e\\u0432\\u0430\\u0442\\u044c") >= 0 ||
              txtLowTry.indexOf("try") >= 0 || txtLowTry.indexOf("online") >= 0) {
            a.href = "https://signdrop.tinacodes.space/";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          // Mac download button — arm64 .dmg (v1.1.2)
          // href check intentionally omitted: override even if button already has a releases-page URL
          var txtLowFull = txt.toLowerCase();
          if (txt.length < 80 &&
              (txtLowFull.indexOf("mac") >= 0 || txtLowFull.indexOf("apple") >= 0 ||
               txtLowFull.indexOf("dmg") >= 0)) {
            a.href = "https://github.com/TinaUma/signdrop/releases/download/v1.1.2/SignDrop_1.1.2_aarch64.dmg";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          // Linux download button — .deb (v1.1.2)
          // href check intentionally omitted: override even if button already has a releases-page URL
          if (txt.length < 80 && txtLowFull.indexOf("linux") >= 0) {
            a.href = "https://github.com/TinaUma/signdrop/releases/download/v1.1.2/SignDrop_1.1.2_amd64.deb";
            a.target = "_blank"; a.rel = "noopener noreferrer";
          }

          if ((txt.indexOf("\\u041f\\u043e\\u043b\\u0438\\u0442\\u0438\\u043a\\u0430") >= 0 ||
               txt.indexOf("\\u043a\\u043e\\u043d\\u0444\\u0438\\u0434\\u0435\\u043d\\u0446\\u0438\\u0430\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u0438") >= 0) &&
              (!href || href === "#")) {
            a.href = "/privacy.html";
          }

          if (txt.indexOf("\\u041f\\u043e\\u043b\\u044c\\u0437\\u043e\\u0432\\u0430\\u0442\\u0435\\u043b\\u044c\\u0441\\u043a\\u043e\\u0435 \\u0441\\u043e\\u0433\\u043b\\u0430\\u0448\\u0435\\u043d\\u0438\\u0435") >= 0 &&
              (!href || href === "#")) {
            a.href = "/terms.html";
          }
        });
      }

      // Docker click capture
      document.addEventListener("click", function(e) {
        var el = e.target;
        for (var i = 0; i < 6; i++) {
          if (!el || el === document) break;
          var txt = el.textContent || "";
          if (txt.trim().toLowerCase().indexOf("docker") >= 0 && txt.trim().length < 40) {
            e.stopImmediatePropagation(); e.preventDefault();
            window.open("https://github.com/TinaUma/signdrop#docker", "_blank", "noopener,noreferrer");
            return;
          }
          el = el.parentElement;
        }
      }, true);

      function patchText() {
        document.querySelectorAll(".sd-header-nav a, nav a").forEach(function(a) {
          if (a.textContent.trim() === "\\u041a\\u0430\\u043a") { a.textContent = "\\u0418\\u0434\\u0435\\u044f"; }
        });
      }

      function findSmallest(nodes, mustHave, mustNotHave, maxLen) {
        var best = null, bestLen = 9999999;
        nodes.forEach(function(el) {
          var txt = el.textContent;
          var ok = mustHave.every(function(s) { return txt.indexOf(s) >= 0; });
          var bad = mustNotHave.some(function(s) { return txt.indexOf(s) >= 0; });
          if (ok && !bad && txt.length < (maxLen || 2000) && txt.length < bestLen) {
            best = el; bestLen = txt.length;
          }
        });
        return best;
      }

      function patchLayout() {
        var nodes = Array.from(document.querySelectorAll("div,article,li,section"));
        var msiCard = findSmallest(nodes,
          ["\\u0423\\u0441\\u0442\\u0430\\u043d\\u043e\\u0432\\u0449\\u0438\\u043a .msi"],
          ["\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Windows"]);
        if (msiCard) msiCard.style.display = "none";

        var winCard = findSmallest(nodes,
          ["\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Windows"],
          ["\\u0418\\u0441\\u0445\\u043e\\u0434\\u043d\\u044b\\u0439 \\u043a\\u043e\\u0434", "Docker"]);
        if (!winCard) return;

        var userCol = winCard;
        for (var i = 0; i < 8; i++) {
          var p = userCol.parentElement;
          if (!p || p === document.body) break;
          if (p.textContent.indexOf("\\u0418\\u0441\\u0445\\u043e\\u0434\\u043d\\u044b\\u0439 \\u043a\\u043e\\u0434") >= 0 ||
              p.textContent.indexOf("Docker") >= 0) break;
          userCol = p;
        }
        var twoCol = userCol.parentElement;
        if (!twoCol || twoCol === document.body) return;

        twoCol.style.cssText += ";display:flex!important;flex-direction:column!important;gap:24px!important;align-items:stretch!important;";
        userCol.style.cssText += ";width:100%!important;max-width:100%!important;";
        winCard.style.cssText += ";width:100%!important;max-width:100%!important;";

        var devSection = findSmallest(nodes,
          ["\\u0418\\u0441\\u0445\\u043e\\u0434\\u043d\\u044b\\u0439 \\u043a\\u043e\\u0434", "Docker"],
          ["\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Windows"]);
        if (!devSection) return;
        devSection.style.cssText += ";width:100%!important;max-width:100%!important;";
        var devNodes = Array.from(devSection.querySelectorAll("div,article"));
        var devInner = findSmallest(devNodes,
          ["\\u0418\\u0441\\u0445\\u043e\\u0434\\u043d\\u044b\\u0439 \\u043a\\u043e\\u0434", "Docker"],
          ["\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Windows"]) || devSection;
        if (devInner.children.length >= 2) {
          devInner.style.cssText += ";display:flex!important;flex-direction:row!important;gap:16px!important;flex-wrap:wrap!important;";
          Array.from(devInner.children).forEach(function(c) {
            c.style.cssText += ";flex:1!important;min-width:220px!important;";
          });
        }
      }

      function patchFooterCopyright() {
        document.querySelectorAll("footer *").forEach(function(el) {
          if (el.children.length > 0) return;
          var txt = el.textContent || "";
          if (txt.indexOf("TAUSIK Core") < 0) return;
          el.innerHTML = el.innerHTML
            .replace("TAUSIK Core", '<a href="https://github.com/Kibertum/tausik-core" target="_blank" rel="noopener noreferrer">TAUSIK Core</a>')
            .replace("\\u041b\\u0438\\u0446\\u0435\\u043d\\u0437\\u0438\\u044f MIT", '<a href="https://github.com/TinaUma/signdrop/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">\\u041b\\u0438\\u0446\\u0435\\u043d\\u0437\\u0438\\u044f MIT</a>');
        });
      }

      function patchPlatformDownload() {
        var ua = navigator.userAgent.toLowerCase();
        var isWin = ua.indexOf("windows") >= 0;
        var isMac = (ua.indexOf("mac os") >= 0 || ua.indexOf("macintosh") >= 0) &&
                    ua.indexOf("iphone") < 0 && ua.indexOf("ipad") < 0;
        var isAndroid = ua.indexOf("android") >= 0;
        var isIOS = /iphone|ipad|ipod/.test(ua);
        var isLinux = ua.indexOf("linux") >= 0 && !isAndroid;
        var isMobile = isAndroid || isIOS;

        var platforms = {
          win:   { text: "\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Windows",
                   href: "https://github.com/TinaUma/signdrop/releases/download/v1.1.2/SignDrop_1.1.2_x64-setup.exe" },
          mac:   { text: "\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Mac",
                   href: "https://github.com/TinaUma/signdrop/releases/download/v1.1.2/SignDrop_1.1.2_aarch64.dmg" },
          linux: { text: "\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Linux",
                   href: "https://github.com/TinaUma/signdrop/releases/download/v1.1.2/SignDrop_1.1.2_amd64.deb" }
        };
        var detected = isWin ? "win" : isMac ? "mac" : isLinux ? "linux" : "win";

        var headerBtn = null;
        document.querySelectorAll("a, button").forEach(function(el) {
          var txt = el.textContent.trim();
          if (txt.indexOf("\\u0421\\u043a\\u0430\\u0447\\u0430\\u0442\\u044c \\u0434\\u043b\\u044f Windows") >= 0 && txt.length < 60) {
            headerBtn = el;
          }
        });
        if (!headerBtn) return;

        if (isMobile) {
          var msg = document.createElement("span");
          msg.textContent = "\\u0422\\u043e\\u043b\\u044c\\u043a\\u043e \\u0434\\u043b\\u044f \\u041f\\u041a";
          msg.style.cssText = "color:rgba(255,255,255,0.5);font-size:0.85rem;";
          headerBtn.parentNode.replaceChild(msg, headerBtn);
          return;
        }

        var p = platforms[detected];
        headerBtn.textContent = p.text;
        headerBtn.href = p.href;
        headerBtn.target = "_blank";
        headerBtn.rel = "noopener noreferrer";

      }

      initCookieBanner();
      patchLinks();
      patchText();
      patchLayout();
      patchFooterCopyright();
      patchPlatformDownload();
      setTimeout(function(){ initCookieBanner(); patchLinks(); patchText(); patchLayout(); patchFooterCopyright(); patchPlatformDownload(); }, 1500);
      setTimeout(function(){ initCookieBanner(); patchLinks(); patchText(); patchLayout(); patchFooterCopyright(); patchPlatformDownload(); }, 4000);
    });
  </script>"""

with open(SRC, encoding="utf-8") as f:
    content = f.read()

ANCHOR = '<meta charset="utf-8">'
if ANCHOR not in content:
    print("ERROR: anchor not found in source file")
    sys.exit(1)

new_content = content.replace(ANCHOR, ANCHOR + "\n" + PATCH, 1)

with open(DST, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Written {len(new_content)} chars, {new_content.count(chr(10)) + 1} lines")
checks = [
    "patchLinks",
    "patchLayout",
    "initCookieBanner",
    "yandex.ru",
    "tausik-core",
    "cloudtips",
    "privacy.html",
    "terms.html",
    "aarch64.dmg",
    "amd64.deb",
]
for c in checks:
    status = "OK" if c.lower() in new_content.lower() else "MISSING"
    print(f"  {c}: {status}")
