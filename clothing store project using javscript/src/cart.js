let basket = JSON.parse(localStorage.getItem('data')) || [];
let label = document.querySelector('#label');
let shoppingCart = document.querySelector('#shopping-cart');

let calculation = () => {
  let cartIcon = document.getElementById('cart-amount');
  let total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = total;

}



calculation()



let generateCartItems = () => {
  if (basket.length !== 0) {
    return shoppingCart.innerHTML = basket.map((x) => {
      let {
        id,
        name,
        price,
        item,
        desc,
        img
      } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];

      return `
        <div class='cart-item'>
            <img width="100" src='${search.img}'/>
            <div class='details'>
                <div class='title-price-x'>
                  <h4 class='title-price'>
                    <p>${search.name}</p>
                      <p class='cart-item-price'> Rs ${search.price} /-</p>
                   </h4>
                   <div class='x-btn' onclick='removeItem(${id})'>Remove</div>
                </div>
                <div class="btns">
                <i onclick="dcr(${id})" style='color:white;' class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i  onclick="incr(${id})" style='color:white;' class="bi bi-plus-lg"></i>

            </div>

                    <h3>Rs ${item * search.price} /-</h3>
            </div>
        </div>
       `;
    }).join('');
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart Is Empty</h2>
      <a href='index.html'>
        <button class='homebtn'> <span> Back  </span>To Home<button>
      </a>
    `;
  }
}



generateCartItems();

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
  generateCartItems();

  update(selectedItems.id)
      localStorage.setItem('data',JSON.stringify(basket));
  
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
  generateCartItems();
  localStorage.setItem('data',JSON.stringify(basket));


  
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  
totalamount();
};


let removeItem=(id)=>{
    var selectedItem=id;
    console.log(selectedItem.id);
    basket=basket.filter((x)=>x.id !== selectedItem.id);
  generateCartItems();
  calculation();
  totalamount();
      localStorage.setItem('data',JSON.stringify(basket));
}

let clearcart=()=>{
    basket=[];
    generateCartItems();
    calculation();
    localStorage.setItem('data',JSON.stringify(basket));

};

let totalamount=()=>{
  if(basket.length !== 0){
        let amount =basket.map((x)=>{
          let {item,id} =x;
          let search = shopItemsData.find((y) => y.id === id) || [];
                  return item * search.price;

        }).reduce((x,y)=> x+y,0);
       

          label.innerHTML=`
                <h2 style='font-size:25px;'>Total Bill : Rs ${amount} /-</h2>
                <button onclick='checkout()' class='checkout'>Check Out </button>
                <button onclick='clearcart()' class='clear-cart'>Clear Cart </button>
                `; 

  }else return;
};



totalamount();



let checkout=()=>{
  alert("The Feuture is Coming Soon... ");
}







