function parseFrontMatter(raw) {
  var match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  var fmLines = match[1].split(/\r?\n/);
  var data = {};
  fmLines.forEach(function (line) {
    var idx = line.indexOf(":");
    if (idx === -1) return;
    var key = line.slice(0, idx).trim();
    var val = line.slice(idx + 1).trim();
    val = val.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    data[key] = val;
  });
  return { data: data, body: match[2] };
}

function extractTikTokId(url) {
  if (!url) return "";
  var match = url.match(/video\/(\d+)/);
  return match ? match[1] : "";
}

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("post");
  var body = document.getElementById("post-body");

  if (!slug) {
    body.textContent = "No story specified.";
    return;
  }

  fetch("../content/posts/" + slug + ".md")
    .then(function (res) {
      if (!res.ok) throw new Error("Not found");
      return res.text();
    })
    .then(function (raw) {
      var parsed = parseFrontMatter(raw);
      var data = parsed.data;

      document.getElementById("post-title").textContent = data.title || "Untitled story";
      document.getElementById("page-title").textContent = (data.title || "Story") + " — Lean Luggage";
      document.getElementById("post-location").textContent = data.location || "Travel Story";
      if (data.excerpt) {
        document.getElementById("page-description").setAttribute("content", data.excerpt);
      }
      if (data.date) {
        var d = new Date(data.date);
        document.getElementById("post-date").textContent = isNaN(d) ? data.date : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      }

      body.innerHTML = window.marked ? marked.parse(parsed.body) : parsed.body;

      if (data.tiktok_url) {
        var tiktokId = extractTikTokId(data.tiktok_url);
        var wrap = document.getElementById("post-tiktok");
        wrap.innerHTML =
          '<div class="tiktok-block">' +
          '<p class="eyebrow" style="color:var(--stamp);">Most-viewed TikTok for this place</p>' +
          '<blockquote class="tiktok-embed" cite="' + data.tiktok_url + '" data-video-id="' + tiktokId + '" style="max-width: 605px;min-width: 325px;"><section></section></blockquote>' +
          "</div>";
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.tiktok.com/embed.js";
        document.body.appendChild(s);
      }
    })
    .catch(function () {
      body.textContent = "This story couldn't be loaded.";
    });
});
