function login() {  
    // Token aus localStorage holen und Seite neu laden mit Auth
    const token = localStorage.getItem('adminToken');
    if (!token) location.href = '06 Admin/adminlogin.html';

    fetch(location.pathname, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => {
      if (!res.ok) throw new Error('Nicht autorisiert');
      return res.text();
    })
    .then(html => {
      document.open();
      document.write(html);
      document.close();
    })
    .catch(err => {
      alert('Zugriff verweigert – zurück zum Login');
      location.href = '06 Admin/adminlogin.html';
    });
  }

function login() {
      const password = document.getElementById('adminPassword').value;
      localStorage.setItem('adminToken', password);

      // Testversuch: Adminseite mit Token laden
      fetch('./admin.html', {
        headers: {
          'Authorization': 'Bearer ' + password
        }
      })
}