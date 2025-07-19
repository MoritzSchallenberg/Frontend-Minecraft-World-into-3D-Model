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

function showSubOptions(game) {
  const popup = document.getElementById("popup-content");
  const overlay = document.getElementById("popup-overlay");
  const title = document.getElementById("popup-title");
  const options = document.getElementById("popup-options");

  title.textContent = game.charAt(0).toUpperCase() + game.slice(1);
  options.innerHTML = ""; // Reset

  const subpages = {
    minecraft: [
      { img: "../img/02 Minecraft Welt.jpg", link: "../02 Gameprinter/01-01 Minecraft Welt.html", label: "Welt" },
      { img: "../img/02 Minecraft Skins.jpg", link: "../02 Gameprinter/01-02 Minecraft Character.html", label: "Skin" }
    ],
    sims: [
      { img: "../img/02 Sims Grundstücke.jpg", link: "../02 Gameprinter/02-01 Sims Haus.html", label: "Haus" },
      { img: "../img/02 Sims Familie.jpg", link: "../02 Gameprinter/02-02 Sims Familie.html", label: "Familie" }
    ],
    roblox: [
      { img: "../img/02 Roblox Welt.jpg", link: "../02 Gameprinter/03-01 Roblox Welt.html", label: "Welt" },
      { img: "../img/02 Roblox Character.jpg", link: "../02 Gameprinter/03-02 Roblox Character.html", label: "Character" }
    ]
  };

  if (subpages[game]) {
    subpages[game].forEach(option => {
      const el = document.createElement("a");
      el.href = option.link;
      el.innerHTML = `<img src="${option.img}" alt="${option.label}"><p style="text-align:center;">${option.label}</p>`;
      options.appendChild(el);
    });
  }

  popup.style.display = "block";
  overlay.style.display = "block";
}

function closePopup() {
  document.getElementById("popup-content").style.display = "none";
  document.getElementById("popup-overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const cookieSet = localStorage.getItem("cookies_decision");
  if (!cookieSet) {
    document.getElementById("cookie-banner").style.display = "block";
  }
});

function acceptAllCookies() {
  localStorage.setItem("cookies_decision", "true");
  localStorage.setItem("cookies_analytics", "true");
  localStorage.setItem("cookies_media", "true");
  document.getElementById("cookie-banner").style.display = "none";
}

function declineOptionalCookies() {
  localStorage.setItem("cookies_decision", "true");
  localStorage.setItem("cookies_analytics", "false");
  localStorage.setItem("cookies_media", "false");
  document.getElementById("cookie-banner").style.display = "none";
}

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // Optional: Fetch-Aufruf hier später einbauen
  document.getElementById("contact-success").style.display = "block";
  this.reset();
});
