const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;
let itemCount = 0;
cart.forEach((item) => {
  total += item.price * item.quantity;
  itemCount += item.quantity;
});

document.getElementById("totalPrice").textContent = `${total.toFixed(2)} CHF`;
document.getElementById("itemCount").textContent = itemCount;

paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total.toFixed(2),
              currency_code: "CHF",
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert(
          "Vielen Dank, " +
            details.payer.name.given_name +
            "! Zahlung erfolgreich."
        );
        localStorage.removeItem("cart");
        window.location.href = "thankyou.html";
      });
    },
  })
  .render("#paypal-button-container");
