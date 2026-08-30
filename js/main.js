document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.nl-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type=email]');
      var note = form.parentElement.querySelector('.nl-note');
      if (input && input.value) {
        form.innerHTML = '';
        var msg = document.createElement('p');
        msg.style.fontFamily = "'IBM Plex Mono', monospace";
        msg.style.fontSize = '.85rem';
        msg.textContent = "Stamped. You're on the list — welcome aboard.";
        form.replaceWith(msg);
      }
    });
  });

  // Chip filters (Hidden Gems / Itineraries index) — purely visual toggle
  document.querySelectorAll('.chip-row').forEach(function (row) {
    row.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        row.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
      });
    });
  });
});
