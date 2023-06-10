const navshop_image_url = 'http://sv2.eagleworld.com.br/itens/'

const item = [
    { name: 'Roupas', price: 100, weight: 0.5, img: 'roupas.png' },
    { name: 'Mochila', price: 100, weight: 0.5, img: 'mochila.png' },
    { name: 'Rádio', price: 100, weight: 0.5, img: 'radio.png' },
    { name: 'Aliança', price: 100, weight: 0.5, img: 'alianca.png' },
    { name: 'Galão', price: 100, weight: 0.5, img: 'galao.png' },
    { name: 'Kit de Reparo', price: 100, weight: 0.5, img: 'repairkit.png' },
    { name: 'Militec', price: 100, weight: 0.5, img: 'militec.png' },
    { name: 'Pneu', price: 100, weight: 0.5, img: 'pneu.png' },
    { name: 'Pen-Drive', price: 100, weight: 0.5, img: 'pendrive.png' },
    { name: 'Gasolina', price: 100, weight: 0.5, img: 'gasolina.png' },
]

$('#search-text').on('keyup', function(){
    var search = $(this).val();
    $(".listagemNavShop").html('');
    var filtered = item.filter(function (el) {
        return el.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
    for (let i = 0; i < filtered.length; i++) {
        $(".listagemNavShop").append(`
            <div class="itemNav">
                <div class="item">
                    <div class="item-weight">${filtered[i].weight} KG</div>
                    <img src="${navshop_image_url + filtered[i].img}" width="100">
                    <div class="item-info">
                        <div class="item-name">${filtered[i].name}</div>
                        <div class="item-value">R$ ${filtered[i].price}</div>
                    </div>
                    <div class="item-description">Te permite trocar de roupas onde desejar.</div>
                    <div class="button-buy" onClick="navShopAction('', '')">Adicionar ao carrinho</div>
                </div>
            </div>
        `)
    }
});


function fillMain() {
    // do a for to fill the main
    for (let i = 0; i < 10; i++) {
        $(".listagemNavShop").append(`
            <div class="itemNav">
                <div class="item">
                    <div class="item-weight">${item[i].weight} KG</div>
                    <img src="${navshop_image_url + item[i].img}" width="100">
                    <div class="item-info">
                        <div class="item-name">${item[i].name}</div>
                        <div class="item-value">R$ ${item[i].price}</div>
                    </div>
                    <div class="item-description">Te permite trocar de roupas onde desejar.</div>
                    <div class="button-buy" onClick="navShopAction('', '')">Adicionar ao carrinho</div>
                </div>
            </div>
        `)
    }
}


fillMain()

// var shopType = 'sell';
// var navConfig;

// const fun_navshop = new Module('fun_navshop');

// function setNavShopNui({ config }) {
//     navConfig = config;
//     $(".listagemNavShop").html('');
//     var shopIndex = 1;

//     let buyAmount = 0;
//     let sellAmount = 0;

//     for (const [key, value] of Object.entries(config)) {
//         if (value.type == shopType) {
//             shopButton = ''
//             if (shopType == 'buy') {
//                 buyAmount++
//                 shopButton = 'Comprar';
//             } else {
//                 sellAmount++
//                 shopButton = 'Vender';
//             }

//             valueType = '';
//             if (value.typeMoney == 'ilegal') {
//                 valueType = '<span>(SUJO)</span>';
//             }
//             let str = value.price.toLocaleString('en-US');
//             str = str.replace(/,/g, '<span>.</span>');
//             $(".listagemNavShop").append(`
//             <div class="itemNav">

//                 <img src="${navshop_image_url}${ParseItemImage(value.index)}.png">
//                 <div class="item-info">
//                 ${value.name}<br>
//                     <small><span style="font-family: 'black';">$</span>${str}${valueType}</small>
//                 </div>
//                 <div class="button-buy" onClick="navShopAction(${shopIndex}, '${value.index}')">${shopButton}</div>
//             </div>
//             `);
//         }
//         shopIndex++;
//     }



//     $('.itemNav').mouseenter(function() {
//         $(this).addClass("active");
//     });

//     $('.itemNav').mouseleave(function() {
//         $(this).removeClass("active");
//     });
// }

// fun_navshop.registerOpenUiFunction((data) => {
//     let buyAmount = 0;
//     let sellAmount = 0;

//     for (const [key, value] of Object.entries(data.config)) {
//         if (value.type == 'buy') {
//             buyAmount++
//         } else {
//             sellAmount++
//         }
//     }

//     if (buyAmount > 0) {
//         document.getElementById("menuBuy").style.display = 'flex'
//         shopType = 'buy'
//     } else document.getElementById("menuBuy").style.display = 'none'

//     if (sellAmount > 0) {
//         document.getElementById("menuSell").style.display = 'flex'
//         shopType = 'sell'
//     } else document.getElementById("menuSell").style.display = 'none'

//     setNavShopNui(data)
// })

// function navShopMenu(t) {
//     shopType = t;
//     $(".itemMenu").removeClass("active");
//     if (shopType == 'buy') {
//         $("#menuBuy").addClass("active");
//     } else {
//         $("#menuSell").addClass("active");
//     }
//     setNavShopNui({ config: navConfig });
// }


// function navShopAction(index, item) {
//     var arr = { index, item };
//     FetchData('navShopNuiAction', arr);
// }

// fun_navshop.registerCloseUiFunction(() => {
//     FetchData('close', {})
// })

