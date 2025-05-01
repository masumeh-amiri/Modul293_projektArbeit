let count = 0;

function addToCart() {
  count++;
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = count;
  cartCount.classList.add("show");
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const addToCartBtn = document.querySelector(".add-to-cart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const title = document
        .querySelector(".product-title")
        ?.textContent.trim();
      const priceText = document
        .querySelector(".product-price")
        ?.textContent.trim();
      const imageSrc = document
        .querySelector(".productImg")
        ?.getAttribute("src");
      const color = document.getElementById("size")?.value;
      const quantity = parseInt(document.getElementById("quantity")?.value, 10);
      const price = parseFloat(priceText?.replace("CHF", "").trim());

      if (!title || !price || !color || !quantity || !imageSrc) {
        alert("Bitte füllen Sie alle Produktoptionen korrekt aus.");
        return;
      }

      const product = { title, price, color, quantity, image: imageSrc };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let found = false;
      cart = cart.map((item) => {
        if (item.title === product.title && item.color === product.color) {
          item.quantity += product.quantity;
          found = true;
        }
        return item;
      });

      if (!found) {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert("Produkt wurde dem Warenkorb hinzugefügt!");
    });
  }
});

const cartItemsContainer = document.getElementById("cartItems");
const itemCountElement = document.getElementById("itemCount");

// Neues Element für die Gesamtsumme
const totalElement = document.createElement("div");
totalElement.style.textAlign = "right";
totalElement.style.marginTop = "20px";
totalElement.style.fontWeight = "bold";
cartItemsContainer.after(totalElement);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalItems += item.quantity;
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img  class="item-image"src="${item.image}" alt="${item.title}">
      <div class="item-info">
        <h4>${item.title}</h4>
        <small>Farbe: ${item.color || "nicht gewählt"}</small>
        <div class="item-quantity">
          <button class="cart-controls" onclick="updateQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
      </div>
      <div class="item-price">${itemTotalPrice.toFixed(2)} CHF</div>
      <i class="fa fa-trash delete-item" onclick="removeItem(${index})" title="Entfernen"></i>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  itemCountElement.textContent = totalItems;
  totalElement.textContent = `Gesamtsumme: ${totalPrice.toFixed(2)} CHF`;
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  saveAndRender();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndRender();
}

function clearCart() {
  cart = [];
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
// document.querySelector(".add-to-cart")?.addEventListener("click", addToCarts);

renderCart();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = totalCount;
    cartCount.classList.add("show");
  }

  const bag = document.querySelector("#lg-bag a");
  if (bag) {
    const oldCount = document.querySelector(".cart-count");
    if (oldCount) oldCount.remove();

    if (totalCount > 0) {
      const span = document.createElement("span");
      span.classList.add("cart-count");
      span.textContent = totalCount;
      span.style.background = "orange";
      span.style.color = "white";
      span.style.padding = "2px 6px";
      span.style.borderRadius = "10px";
      span.style.fontSize = "12px";
      span.style.marginLeft = "5px";
      bag.appendChild(span);
    }
  }
}
function sendCartToServer(cart) {
  fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Serverantwort:", data);
      // Optional: Erfolgsmeldung anzeigen
      alert("Warenkorb erfolgreich gespeichert!");
    })
    .catch((err) => {
      console.error("Fehler beim Senden:", err);
      alert("Fehler beim Speichern des Warenkorbs.");
    });
}
