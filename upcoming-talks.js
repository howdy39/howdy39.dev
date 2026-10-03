// Hides the upcoming-talk cards whose date (data-talk-date="YYYY/MM/DD") is before
// today, and shows the "no talks" message when none are left. The page is static,
// so this runs in the browser; the cards themselves are plain HTML in the page,
// which keeps their images in the server-rendered HTML.
(function () {
  function today() {
    var d = new Date();
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "/" + mm + "/" + dd;
  }

  function apply() {
    var now = today();
    document.querySelectorAll("[data-upcoming-talks]").forEach(function (box) {
      var visible = 0;
      box.querySelectorAll("[data-talk-date]").forEach(function (el) {
        var past = el.getAttribute("data-talk-date") < now;
        el.style.display = past ? "none" : "";
        if (!past) visible += 1;
      });
      var empty = box.querySelector("[data-upcoming-empty]");
      if (empty) empty.style.display = visible === 0 ? "" : "none";
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      apply();
    });
  }

  apply();
  // The site navigates without reloading, so apply again when the page content changes.
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
})();
