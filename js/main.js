(function () {
  var script = document.createElement('script');
  script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  script.async = true;
  script.onload = function () {
    if (window.netlifyIdentity) {
      netlifyIdentity.on('login', function () {
        window.location.href = '/admin/';
      });
      var hash = window.location.hash;
      if (hash && (hash.indexOf('invite_token=') > -1 || hash.indexOf('recovery_token=') > -1 || hash.indexOf('confirmation_token=') > -1)) {
        netlifyIdentity.open();
      }
    }
  };
  document.head.appendChild(script);
})();

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

  document.querySelectorAll('.chip-row').forEach(function (row) {
    row.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        row.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
      });
    });
  });
});
