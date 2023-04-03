//cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Ouverture cart

cartIcon.onclick = () => {
  cart.classList.add("active");
};

//fermeture cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Cart JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//function
function ready() {
  //Retirer l'article du panier
  let reomveCartButtons = document.getElementsByClassName("cart-remove");
  console.log(reomveCartButtons);
  for (let i = 0; i < reomveCartButtons.length; i++) {
    let button = reomveCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //Changements de quantité
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("click", quantiChanged);
  }

  //Ajout au panier
  let addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //bouton acheter
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyBottonClicked);
}

//bouton acheter
function buyBottonClicked(e) {
  alert("votre commande est passée");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Retirer l'article du panier
function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//Changements de quantité
function quantiChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Ajout panier
function addCartClicked(e) {
  let button = e.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;

  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Vous avez déjà ajouté cet article au panier");
      return;
    }
  }

  var cartBoxContent = ` 
            <img src="${productImg}" alt="" class="cart-img" />
              <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity" />
              </div>
              <!-- Remove cart -->
              <i class="bx bx-trash cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantiChanged);
}
//MAJ total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
    console.log("total", total);
    console.log("total ROUND", Math.round(total));
  }
  //si le prix contient une valeur en centimes
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = total + " €";
}
