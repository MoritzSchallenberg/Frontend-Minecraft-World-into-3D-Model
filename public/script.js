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
    
    function login() {
      const password = document.getElementById('adminPassword').value;
      localStorage.setItem('adminToken', password);

      // Testversuch: Adminseite mit Token laden
      fetch('./admin.html', {
        headers: {
          'Authorization': 'Bearer ' + password
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Falsches Passwort oder Zugriff verweigert');
        return res.text();
      })
      .then(html => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch(err => {
        alert(err.message);
      });
    }
    
    function toggleFavorit(id, name, description, price) {
      let favoriten = JSON.parse(localStorage.getItem("favoriten")) || [];

      const index = favoriten.findIndex(p => p.id === id);
      if (index !== -1) {
        favoriten.splice(index, 1);
        alert("Aus Favoriten entfernt!");
      } else {
        favoriten.push({ id, name, description, price });
        alert("Zu Favoriten hinzugefügt!");
      }

      localStorage.setItem("favoriten", JSON.stringify(favoriten));
    }
    


  function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // damit Icon-Zahl sich aktualisiert
    alert(name + " wurde dem Warenkorb hinzugefügt!");
  }
  


    function openCart() {
      document.getElementById("cart-overlay").style.right = "0";
      renderCartOverlay();
    }

    function closeCart() {
      document.getElementById("cart-overlay").style.right = "-100%";
    }

    function renderCartOverlay() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const container = document.getElementById('cart-content');

      if (cart.length === 0) {
        container.innerHTML = "<p>Der Warenkorb ist leer.</p>";
        return;
      }

      let html = "<ul style='padding-left: 0; list-style: none'>";
      let total = 0;
      cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;
        html += `<li style='margin-bottom: 10px;'>
               <strong>${item.name}</strong><br>
               ${item.quantity} × ${item.price.toFixed(2)} € = ${itemTotal.toFixed(2)} €
             </li>`;
      });
      html += `</ul><p><strong>Gesamt: ${total.toFixed(2)} €</strong></p>`;
      container.innerHTML = html;
    }

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const countSpans = document.querySelectorAll('#cart-count');
      countSpans.forEach(span => {
        if (totalCount > 0) {
          span.textContent = totalCount;
          span.style.display = 'inline-block';
        } else {
          span.style.display = 'none';
        }
      });
    }
    updateCartCount();
  


    const user = localStorage.getItem("currentUser");
    if (user) {
      document.write(`<p>Willkommen, ${user}!</p>`);
    }
  


    function toggleDropdown() {
      const dropdown = document.getElementById("dropdownMenu");
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    function logout() {
      localStorage.removeItem("token");
      location.reload();
    }

    document.addEventListener("DOMContentLoaded", () => {
      const token = localStorage.getItem("token");
      const loginLink = document.getElementById("loginLink");
      const accountMenu = document.getElementById("accountMenu");

      if (token) {
        loginLink.style.display = "none";
        accountMenu.style.display = "block";
      } else {
        loginLink.style.display = "inline-block";
        accountMenu.style.display = "none";
      }
    });
  


    async function ladeProdukte() {
      try {
      const res = await fetch("/api/products");
      const produkte = await res.json();
      const container = document.getElementById("product-list");

      container.innerHTML = "";

      produkte.forEach(p => {
        const el = document.createElement("div");
        el.className = "product-item";
        el.innerHTML = `
        <button onclick="toggleFavorit('${p._id}', '${p.name}', '${p.description}', ${p.price})">❤️ Favorit</button>  
        <img src="bilder/produkt2_vorne.jpg" alt="${p.name}" />
          <h4>${p.name}</h4>
          <p>${p.description}</p>
          <p><strong>${p.price.toFixed(2)} €</strong></p>
          <button onclick="addToCart('${p.name}', ${p.price})">In den Warenkorb</button>
        `;
        container.appendChild(el);
      });
    } catch (err) {
      console.error("Fehler beim Laden der Produkte:", err);
    }
  }

  ladeProdukte();