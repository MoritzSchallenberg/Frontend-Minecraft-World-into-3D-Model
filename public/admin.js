// Automatischer Schutz bei Aufruf von admin.html
function checkAdminAccess() {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    location.href = '06 Admin/adminlogin.html';
    return;
  }

  // Optional Backendprüfung per fetch
  fetch(location.pathname, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(res => {
    if (!res.ok) throw new Error('Nicht autorisiert');
  })
  .catch(err => {
    alert('Zugriff verweigert – zurück zum Login');
    location.href = '06 Admin/adminlogin.html';
  });
}

// Aufruf beim Laden der Adminseite
if (window.location.pathname.includes("admin.html")) {
  document.addEventListener("DOMContentLoaded", checkAdminAccess);
}

// Login aus adminlogin.html
function performAdminLogin() {
  const password = document.getElementById('adminPassword').value;
  localStorage.setItem('adminToken', password);
  location.href = 'admin.html';
}