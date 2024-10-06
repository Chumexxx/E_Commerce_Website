const prodArr = [
    {
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]

// let display = document.getElementById("disp2")
// let cartNum = document.getElementById("itemNum")
// let total = document.getElementById("totalSum")

// function appendToCart(position){
//     display.innerHTML += `<p> ${prodArr[position].name} : $ ${ prodArr[position].price}</p>`
//     cartNum.innerText = Number(cartNum.innerText) +1
//     total.innerText = Number(total.innerText) + prodArr[position].price
// }

const addToCart = document.querySelectorAll(".addToCart")
const cartNum = document.getElementById("itemNum")
const total = document.getElementById("totalSum")
const disp2 = document.getElementById("disp2")
const disp3 = document.getElementById("disp3")
const emptyCart = document.getElementById("emptycart")
const cartMessage = document.getElementById("cartMessage")
const confirmOrder = document.getElementById("disp5")
const carbonNeutral = document.getElementById("disp4")


let cart = [];

addToCart.forEach(button => {
   button.addEventListener('click', function () {
       let product = button.parentElement; 
       let name = product.querySelector('.name').innerText;
       let price = parseFloat(product.querySelector('.price').innerText.replace('$', ''));

      
       let existingProduct = cart.find(item => item.name === name);
       if (existingProduct) {
       
           existingProduct.quantity += 1;
       } else {
           
           cart.push({ name: name, price: price, quantity: 1 });
       }

       
       button.style.display = 'none';
       product.querySelector('.incrementDiv').style.display = 'flex';

      
       product.querySelector('#number').innerText = existingProduct ? existingProduct.quantity : 1;

    
       loadCart();
   });
});


function loadCart() {

   disp2.innerHTML =" ";

   cart.forEach(item => {
      let display = document.createElement("disp2");
      display.innerHTML = `<p> ${item.name} : $ ${item.price} x ${item.quantity} </p>`;
      disp2.appendChild(display);
   })
   
   let sum = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    if (sum > 0) 
   {
        disp3.innerHTML = `<h2>Total Order: $${sum.toFixed(2)}</h2>`;

        disp3.style.display = 'block';
    } 
    else 
    {
        disp3.style.display = 'none';
    }


    let itemNum = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartNum.textContent = `${itemNum}`;

    
   if (cart.length === 0) 
   {
      emptyCart.style.display = 'block';
      cartMessage.style.display = 'block';
      confirmOrder.style.display = 'none'; 
      carbonNeutral.style.display = `none`;
   } 
   else 
   {
      emptyCart.style.display = 'none';
      cartMessage.style.display = 'none';
      confirmOrder.style.display = 'block';
      carbonNeutral.style.display = `block`;
   }
}


document.body.addEventListener('click', (event) => {
   if (event.target.matches('#decrease')) 
   {
      updateQuantity(event.target, 1);
   } 
   else if (event.target.matches('#increase')) 
   {
      updateQuantity(event.target, -1);
   }
});

function updateQuantity(button, change){
   let itemDiv = button.parentElement.parentElement;
   let itemName = itemDiv.querySelector('.name').innerText;

   let cartItem = cart.find(item => item.name == itemName);
   if (cartItem)
   {
      cartItem.quantity += change;

      if (cartItem.quantity <= 0) {
         cart = cart.filter(item => item.name !== itemName);

         
         let addToCart = itemDiv.querySelector('.addToCart');
         addToCart.style.display = 'block';
         let quantityControls = itemDiv.querySelector('.incrementDiv');
         quantityControls.style.display = 'none';
     } else {
         
         itemDiv.querySelector('#number').innerText = cartItem.quantity;
     }

     loadCart();
   }
}
