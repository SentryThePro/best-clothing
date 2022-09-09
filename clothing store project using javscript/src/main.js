let shop = document.getElementById('shop');

let loader=document.getElementById('loader');

window.addEventListener('load',()=>{
   loader.style.display='none';
   console.log('load');  
});


let basket = JSON.parse(localStorage.getItem('data')) || [];




let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {
            id,
            name,
            img,
            price,
            desc
        } = x;
        let search=basket.find((x)=> x.id === id )||[];

            return `
        <div id=product-id-${id} class="item">
        <img width="250" height="250" src="${img}" >
    <div class="deatils">
    <h3>${name}</h3>
    <p>${desc}</p>
    
    <div class="pricing-quantity">
        <div class="pricing">
             <h2> Rs ${price} /-</h2>
            <div class="btns">
                <i onclick="dcr(${id})" class="bi bi-dash-lg">-</i>
                <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                <i  onclick="incr(${id})" class="bi bi-plus-lg">+</i>

            </div>
        </div>
    </div>
    
    </div>
    </div>
        `
    }).join(""));
}


generateShop()



let incr = (id) => {
    let selectedItems = id;
    var search = basket.find((x) => x.id === selectedItems.id);
    if (search === undefined) {
        basket.push({
            id: selectedItems.id,
            item: 1

        });
    } else {
        search.item += 1;
    }
    update(selectedItems.id)
        localStorage.setItem('data',JSON.stringify(basket));
    //   console.log(basket);
    
};

let dcr = (id) => {
    let selectedItems = id;
    var search = basket.find((x) => x.id === selectedItems.id);
    if(search === undefined)return;

    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    
    update(selectedItems.id)
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem('data',JSON.stringify(basket));


    
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation=()=>{
    let cartIcon=document.getElementById('cart-amount');
    let total = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
  cartIcon.innerHTML=total;
    
}



calculation()












