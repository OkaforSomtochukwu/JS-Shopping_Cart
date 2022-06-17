let shop = document.getElementById("shop");

console.log(shop);

// TO STORE THE DATA IN THE CART
let basket = JSON.parse(localStorage.getItem("data")) || [];

// TO GENERATE THE DATA: Works on selecting the exact data of the products chosen/ DATABASE
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];

      return `
        <div id=product-id-${id} class="item">
               <img width="220" src=${img} alt="">
               <div class="details">
                   <h3>${name}</h3>
                   <p>${desc}</p>
                   <div class="price-quantity">
                       <h2>$ ${price}</h2>
                       <div class="buttons">
                           <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                           <div id=${id} class="quantity">
                                ${search.item === undefined ? 0 : search.item}
                           </div>
                           <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                       </div>
                   </div>
               </div>
           </div>
    `;
    })
    .join(""));
};

generateShop(); //To call the function generate shop.

// INCREMENT FUNCTION : To increase the number of items in the cart.
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket)); //To Prevent data loss even after refreshing th page by storing in the local storage
};

// DECREMENT FUNCTION: To decrease the number of items in the cart.
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket)); //To Prevent data loss even after refreshing th page by storing in the local storage
};

// UPDATE FUNCTION : To Update the number of selected items on the item.
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;

  calculation();
};

// To Calculate the total items.
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  // cartIcon.innerHTML = 100;
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();