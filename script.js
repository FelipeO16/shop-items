const navshop_image_url = "assets/images/items/";

//variables

const item = [
  {
    name: "Roupas",
    price: 15000,
    weight: 0.5,
    img: "roupas.png",
    description: "Te permite trocar de roupas onde desejar.",
  },
  {
    name: "Mochila",
    price: 100,
    weight: 0.5,
    img: "mochila.png",
    description: "Aumentará seu espaço no inventário.",
  },
  {
    name: "Rádio",
    price: 100,
    weight: 0.5,
    img: "radio.png",
    description: "Rádio comunicador.",
  },
  {
    name: "Aliança",
    price: 100,
    weight: 0.5,
    img: "alianca.png",
    description: "Aliança de casamento.",
  },
  {
    name: "Galão",
    price: 100,
    weight: 0.5,
    img: "galao.png",
    description: "Para encher seu tanque.",
  },
  {
    name: "Kit de Reparo",
    price: 100,
    weight: 0.5,
    img: "repairkit.png",
    description: "Para reparar seu carro.",
  },
  {
    name: "Militec",
    price: 100,
    weight: 0.5,
    img: "militec.png",
    description: "Para reparar seu motor.",
  },
  {
    name: "Pneu",
    price: 100,
    weight: 0.5,
    img: "pneu.png",
    description: "Para arrumar seu pneu furado.",
  },
  {
    name: "Pen-Drive",
    price: 100,
    weight: 0.5,
    img: "pendrive.png",
    description: "Salve seus arquivos importantes.",
  },
  {
    name: "Gasolina",
    price: 100,
    weight: 0.5,
    img: "gasolina.png",
    description: "Para abastecer seu veículo.",
  },
];

let cart = [];

// functions

function getPrice(price) {
  let str = price.toLocaleString("pt-BR");
  str = str.replace(/,/g, "<span>.</span>");
  return str;
}

function minusAmount(index) {
  if (cart[index].amount > 1) {
    cart[index].amount -= 1;
    updateCartItem(index);
    calculateTotalPrice();
  }
}

function plusAmount(index) {
  cart[index].amount += 1;
  updateCartItem(index);
  calculateTotalPrice();
}

function deleteItem(index) {
  cart[index] = null;
  fillCart();
}

function updateCartItem(index) {
  let quantityInput = $(".cart-left-item-quantity-input-value").eq(index);
  quantityInput.val(cart[index].amount);

  let totalPrice = getItemPrice(index);
  let totalPriceElement = $(".cart-left-item-total-value").eq(index);
  totalPriceElement.text("R$ " + totalPrice);

  let weightValue = cart[index].weight * cart[index].amount;
  let weightElement = $(".cart-left-item-weight-value").eq(index);
  weightElement.text(weightValue + " KG");
}

function getItemPrice(index) {
  let totalPrice = 0;
  totalPrice = cart[index].price * cart[index].amount;
  return totalPrice.toLocaleString("pt-BR");
}

function calculateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i]) {
      totalPrice += cart[i].price * cart[i].amount;
    }
  }

  $(".discount-vip .value").text("-R$ " + totalPrice * 0.1 + ",00");
  $(".total-value .value").text("R$ " + totalPrice * 0.9 + ",00");
}

function calculateTotalWeight() {
  let totalWeight = 0;
  for (let i = 0; i < cart.length; i++) {
    totalWeight += cart[i].weight * cart[i].amount;
  }
  return totalWeight;
}

function calculateTotalItems() {
  return cart.length;
}

function navShopAction(index) {
  if (cart[index]) {
    cart[index].amount++;
  } else {
    cart[index] = {
      ...item[index],
      amount: 1,
    };
  }
  fillCart();
}

function navShopMenu(option) {
  if (option == "cart") {
    $(".listagemNavShop").slideUp(0);
    $("#cart").slideDown(0);
    $("#toCart").slideUp(0);
    $("#toShop").slideDown(0);
    $("#search").toggle("slide");
    $(".title-text").text("Carrinho");
    $(".title small").text("FINALIZE SUA COMPRA");
  } else {
    $("#cart").slideUp(0);
    $(".listagemNavShop").slideDown(0);
    $("#toShop").slideUp(0);
    $("#toCart").slideDown(0);
    $("#search").toggle("slide");
    $(".title-text").text("Lojinha");
    $(".title small").text("Itens para compra");
  }
}

$(".payment-methods").on("click", ".card", function () {
  $(".wallet").removeClass("method-active");
  $(".wallet-selected")[0].style.display = "none";
  $(".card-selected")[0].style.display = "flex";
  $(".card").addClass("method-active");
});

$(".payment-methods").on("click", ".wallet", function () {
  $(".card").removeClass("method-active");
  $(".card-selected")[0].style.display = "none";
  $(".wallet-selected")[0].style.display = "flex";
  $(".wallet").addClass("method-active");
});

$("#search-text").on("keyup", function () {
  $(".listagemNavShop").html("");
  for (let i = 0; i < item.length; i++) {
    if (item[i]) {
      if (
        item[i].name
          .toLowerCase()
          .includes($("#search-text").val().toLowerCase())
      ) {
        $(".listagemNavShop").append(`
          <div class="itemNav">
              <div class="item">
                  <div class="item-weight">${item[i].weight} KG</div>
                  <img src="${navshop_image_url + item[i].img}" width="100">
                  <div class="item-info">
                      <div class="item-name">${item[i].name}</div>
                      <div class="item-value"> R$ ${getPrice(
                        item[i].price
                      )}</div>
                  </div>
                  <div class="item-description">${item[i].description}</div>
                  <div class="button-buy" onClick="navShopAction(${i})">Adicionar ao carrinho</div>
              </div>
          </div>
        `);
      }
    }
  }
});

function fillMain() {
  $("#toShop").slideUp(2);
  $("#cart").slideUp(2);
  for (let i = 0; i < 10; i++) {
    $(".listagemNavShop").append(`
            <div class="itemNav">
                <div class="item">
                    <div class="item-weight">${item[i].weight} KG</div>
                    <img src="${navshop_image_url + item[i].img}" width="100">
                    <div class="item-info">
                        <div class="item-name">${item[i].name}</div>
                        <div class="item-value">R$ ${getPrice(
                          item[i].price
                        )}</div>
                    </div>
                    <div class="item-description">${item[i].description}</div>
                    <div class="button-buy" onClick="navShopAction(${i})">Adicionar ao carrinho</div>
                </div>
            </div>
        `);
  }
}

function fillCart() {
  $(".cart-left-items").html("");
  calculateTotalPrice();

  if (cart.length == 0) {
    $(".cart-left-items").html(
      `<span class="cart-left-items-empty">Carrinho vazio!</span>`
    );
  } else {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]) {
        let cartItem = $(`
          <div class="cart-left-item">
            <div class="cart-left-item-img">
              <img src="${
                navshop_image_url + cart[i].img
              }" class="cart-item-img">
            </div>
            <div class="cart-left-item-info">
              <div class="cart-left-item-name">${cart[i].name}</div>
              <div class="cart-left-item-description">${
                cart[i].description
              }</div>
            </div>
            <div class="cart-left-item-weight">
              <div class="cart-left-item-weight-text">Peso</div>
              <div class="cart-left-item-weight-value">${
                cart[i].weight * cart[i].amount
              } KG</div>
            </div>
            <div class="cart-left-item-quantity">
              <div class="cart-left-item-quantity-input">
                <!-- do a input and buttons plus and minus -->
                <div class="cart-left-item-quantity-input-minus" onClick="minusAmount(${i})>
                    <img src="assets/images/menu_minus.svg" alt="">
                </div>
                <input type="text" class="cart-left-item-quantity-input-value" value="${
                  cart[i].amount
                }" />
                <div class="cart-left-item-quantity-input-plus" onClick="plusAmount(${i})">
                    <img src="assets/images/menu_plus.svg" alt="">
                </div>
              </div>
            </div>
            <div class="cart-left-item-total">
                  <div class="cart-left-item-total-value">R$ ${getItemPrice(
                    i
                  )}</div>
              </div>
              <div class="cart-left-item-remove" onclick="deleteItem(${i})">
                  <img src="assets/images/menu_delete.svg">
              </div>
          </div>
        `);

        let quantityInput = $(`
        <div class="cart-left-item-quantity">
          <div class="cart-left-item-quantity-input">
            <div class="cart-left-item-quantity-input-minus">
              <img src="assets/images/menu_minus.svg" alt="">
            </div>
            <input type="text" class="cart-left-item-quantity-input-value" value="${cart[i].amount}" />
            <div class="cart-left-item-quantity-input-plus">
              <img src="assets/images/menu_plus.svg" alt="">
            </div>
          </div>
        </div>
        `);
        quantityInput
          .find(".cart-left-item-quantity-input-minus")
          .click(function () {
            minusAmount(i);
          });

        quantityInput
          .find(".cart-left-item-quantity-input-plus")
          .click(function () {
            plusAmount(i);
          });

        cartItem.find(".cart-left-item-quantity").replaceWith(quantityInput);
        $(".cart-left-items").append(cartItem);
      } else {
        let cartItem = $(`
          <div class="cart-left-item" style="display: none">
            <div class="cart-left-item-img">
              <img src="" class="cart-item-img">
            </div>
            <div class="cart-left-item-info">
              <div class="cart-left-item-name">name</div>
              <div class="cart-left-item-description">
                description
              </div>
            </div>
            <div class="cart-left-item-weight">
              <div class="cart-left-item-weight-text">Peso</div>
              <div class="cart-left-item-weight-value">
                weight
               KG</div>
            </div>
            <div class="cart-left-item-quantity">
              <div class="cart-left-item-quantity-input">
                <!-- do a input and buttons plus and minus -->
                <div class="cart-left-item-quantity-input-minus" onClick="minusAmount()>
                    <img src="assets/images/menu_minus.svg" alt="">
                </div>
                <input type="text" class="cart-left-item-quantity-input-value" value="
                  cart[i]
                }" />
                <div class="cart-left-item-quantity-input-plus" onClick="plusAmount()">
                    <img src="assets/images/menu_plus.svg" alt="">
                </div>
              </div>
            </div>
            <div class="cart-left-item-total">
                  <div class="cart-left-item-total-value">R$</div>
              </div>
              <div class="cart-left-item-remove" onclick="deleteItem()">
                  <img src="assets/images/menu_delete.svg">
              </div>
          </div>
        `);

        let quantityInput = $(`
        <div class="cart-left-item-quantity">
          <div class="cart-left-item-quantity-input">
            <div class="cart-left-item-quantity-input-minus">
              <img src="assets/images/menu_minus.svg" alt="">
            </div>
            <input type="text" class="cart-left-item-quantity-input-value" value="" />
            <div class="cart-left-item-quantity-input-plus">
              <img src="assets/images/menu_plus.svg" alt="">
            </div>
          </div>
        </div>
        `);
        quantityInput
          .find(".cart-left-item-quantity-input-minus")
          .click(function () {
            minusAmount(i);
          });

        quantityInput
          .find(".cart-left-item-quantity-input-plus")
          .click(function () {
            plusAmount(i);
          });

        cartItem.find(".cart-left-item-quantity").replaceWith(quantityInput);
        $(".cart-left-items").append(cartItem);
      }
    }
  }
}

fillMain();
// fillCart();
