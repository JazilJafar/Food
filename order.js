// Hello guys we are starting our js for that Order page
// First step is getting button and give function
let ordbtn = document.querySelectorAll(".orderbtn");
let cartitem = document.querySelector("#cartitem");
let cartnum = document.querySelector("#cartnum");
let carttotal = document.querySelector("#carttotal");
let clearcart = document.querySelector("#clearcart");
let foodsearch = document.querySelector("#foodsearch");
let searchbtn = document.querySelector("#searchbtn");
let noresult = document.querySelector("#noresult");
let foodcards = document.querySelectorAll(".griditem");
let cart = [];
ordbtn.forEach(function (btn) {
    btn.addEventListener("click", function (){
      let food = btn.parentElement;
      let foodname = food.querySelector("h2").innerText;
      let foodprice = food.querySelector("p").innerText;
      foodprice = Number(foodprice.replace(/[^\d.]/g, ""));
      let existingfood = cart.find(function (item) {
        return item.name === foodname;
      })
      if (existingfood){
        existingfood.quantity ++;
      }else{
        cart.push({
            name: foodname,
            price: foodprice,
            quantity: 1
        })
      }
      updatecart();
    });
});
function updatecart(){
    cartitem.innerHTML = "";
    let totalitems = 0;
    let totalprice = 0;
    cart.forEach(function (item){
      totalitems += item.quantity;
        totalprice += item.price * item.quantity;
    });
    cartnum.innerText = totalitems;
    if (cart.length === 0){
        let empty = document.createElement("p");
        empty.className = "emptycart";
        empty.innerText = "Your cart is empty";
        cartitem.appendChild(empty);
    }
    cart.forEach(function(item, index){
        let itembox = document.createElement("div");
        itembox.className = "cartrow";
        let iteminfo = document.createElement("div");
        let name = document.createElement("h3");
        name.innerText = item.name;
        let price = document.createElement("p");
        price.innerText = "$" + (item.price * item.quantity).toFixed(2);
        iteminfo.appendChild(name);
        iteminfo.appendChild(price);
        let controls = document.createElement("div");
        controls.className = "cartcontrols";
        let minus = document.createElement("button");
        minus.innerText = "-";
        minus.addEventListener("click", function(){
            item.quantity --;
            if (item.quantity <= 0){
                cart.splice(index, 1);
            }
            updatecart();
        })
        let quantity = document.createElement("span");
        quantity.innerText = item.quantity;
        let plus = document.createElement("button");
        plus.innerText = "+";
        plus.addEventListener("click", function(){
            item.quantity ++;
            updatecart();
        });
        let remove = document.createElement("button");
        remove.innerText = "Remove";
        remove.className = "removebtn";
        remove.addEventListener("click", function(){
            cart.splice(index, 1);
            updatecart();
        })
        controls.appendChild(minus);
        controls.appendChild(quantity);
        controls.appendChild(plus);
        controls.appendChild(remove);
        itembox.appendChild(iteminfo);
        itembox.appendChild(controls);
        cartitem.appendChild(itembox);
    });
   carttotal.innerText = "$" + totalprice.toFixed(2);
 }
 clearcart.addEventListener("click", function(){
    cart = [];
    updatecart();
 });
 function searchfood(){
    let searchvalue = foodsearch.value.toLowerCase().trim();
    let found = 0;
    foodcards.forEach(function(food){
        let foodname = food.querySelector("h2").innerText.toLowerCase();
        if (foodname.includes(searchvalue)){
            food.style.display = "";
            found++;
        }else{
            food.style.display = "none";
        }
    });
 if (found === 0){
        noresult.style.display = "block";
 } else{
        noresult.style.display = "none";
 }
 }
 foodsearch.addEventListener("input", searchfood);

searchbtn.addEventListener("click", searchfood);
 updatecart();