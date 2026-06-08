/* =============================================================
   login.js — Login and intro screen logic
   The Musical Galleon
   ============================================================= */

function showSignIn() {
  const intro  = document.getElementById('intro-box');
  const signin = document.getElementById('signin-box');

  intro.classList.add('hide');

  setTimeout(() => {
    intro.style.display = 'none';
    signin.classList.add('show');
    document.getElementById('username').focus();
  }, 800);
}

function validateLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorEl  = document.getElementById('error-msg');

  if (username === 'User' && password === 'admin') {
    window.location.href = 'welcome.html';
  } else {
    errorEl.textContent = '✗ Wrong. Try again, ye impostor.';
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;
  const signin = document.getElementById('signin-box');
  if (signin && signin.classList.contains('show')) {
    validateLogin();
  }
});
