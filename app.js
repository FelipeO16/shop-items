

let cart = []

const navshop_image_url = 'http://sv2.eagleworld.com.br/itens/'

var shopType = 'sell';
var navConfig;
const fun_navshop = new Module('fun_navshop');

function setNavShopNui({ config }) {
    navConfig = config;
    $(".base-nexus .itens-list").empty()
    $("body").fadeIn(500)
    var shopIndex = 1;

    console.log(navConfig)

    let buyAmount = 0;
    let sellAmount = 0;

    for (const [key, value] of Object.entries(config)) {
        if (value.type == shopType) {
            shopButton = ''
            if (shopType == 'buy') {
                buyAmount++
                shopButton = 'Comprar';
            } else {
                sellAmount++
                shopButton = 'Vender';
            }

            valueType = '';
            if (value.typeMoney == 'ilegal') {
                valueType = '(SUJO)';
            }

            $(".base-nexus .itens-list").append(`
                <div class="box" data-item="celular" onclick="nexus.addToCart(${shopIndex}, '${value.index}','${value.typeMoney}')">
                    <img src="${navshop_image_url}${ParseItemImage(value.index)}.png" alt="">
                    <div class="information">
                        <small>${value.name}</small>
                        <span>$ <a>${nexus.parse_number(value.price)} ${valueType}</a></span>
                    </div>
                </div>
            `)

        }
        shopIndex++;
    }
}

window.addEventListener("keydown", function(event) {
    if(event.code == "Escape"){
        FetchData('close', {})
    }
})

$(document).on("click", ".base-nexus .menu-list .box", function () {
    $('.base-nexus .menu-list .box').removeAttr('id');
    $(this).attr('id','box-active');
});

var boxOpen = false
const nexus = {
    changeStatus:() => {
        if(boxOpen){
            $(".cart .cart-itens").addClass("right-active")
            boxOpen = false
        }else{
            $(".cart .cart-itens").removeClass("right-active")
            boxOpen = true
        }
    },

    addToCart: (price,index,type) => {
        let dados = {name: index, quantity: 1,price:price,type:type}
        const i = cart.findIndex(_dados => _dados.name === dados.name);
        if (i > -1) {
            cart[i].quantity = cart[i].quantity + 1; // (2)
            cart[i].price = cart[i].price + price; // (2)
        }else{
            cart.push(dados)
        }
        nexus.loadCart()
    },

    loadCart:() => {

        $("#quantityCart").html(Object.values(cart).length)
        $(".drop-list .center-box").empty()
        if(cart){
            
            for([k,v] of Object.entries(cart)){
                $(".drop-list .center-box").append(`
                <div class="box">
                    <span style="text-transform:uppercase">${v.name}</span>
                    <small>${v.quantity}x</small>
                </div>
            `)
            }
        }
    },

    navShopAction: () => {

        FetchData('navShopNuiAction', cart);
        cart = []
        nexus.loadCart()
    },

    parse_number: (data) =>{
        data += '';
        x = data.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    },
}

fun_navshop.registerOpenUiFunction((data) => {
    let buyAmount = 0;
    let sellAmount = 0;

    for (const [key, value] of Object.entries(data.config)) {
        if (value.type == 'buy') {
            buyAmount++
        } else {
            sellAmount++
        }
    }

    if (buyAmount > 0) {
        document.getElementById("menuBuy").style.display = ''
        shopType = 'buy'
    } else document.getElementById("menuBuy").style.display = 'none'

    if (sellAmount > 0) {
        document.getElementById("menuSell").style.display = ''
        shopType = 'sell'
    } else document.getElementById("menuSell").style.display = 'none'

    setNavShopNui(data)
})

fun_navshop.registerCloseUiFunction(() => {
    cart = []
    FetchData('close', {})
})

function changeStatus(){
    if(boxOpen){
        $(".cart .cart-itens").addClass("right-active")
        boxOpen = false
    }else{
        $(".cart .cart-itens").removeClass("right-active")
        boxOpen = true
    }
}