const slides = document.querySelectorAll(".slide");
let show_img = document.getElementById("show_img");
let prod_name = document.getElementById("prod_name");
let price = document.getElementById("amount");
let description = document.getElementById("description");
let ingredients = document.getElementById("Ingredients");
let extra_products = document.getElementById("extra_products");
var counter = 0;

//descrip
let data = JSON.parse(localStorage.getItem("view"));

data.images.forEach((element) => {
  let img = document.createElement("img");
  img.src = element;
  img.className = "slide";
  show_img.append(img);
});

let show_img1 = document.getElementsByClassName("slide");
console.log(show_img1);

for (let i = 0; i < show_img1.length; i++) {
  show_img1[i].style.left = `${i * 100}%`;
}

function slideImage() {
  for (let i = 0; i < show_img1.length; i++) {
    show_img1[i].style.transform = `translateX(-${counter * 100}%)`;
  }
}

function goNext() {
  counter++;
  if (counter == show_img1.length) {
    counter = 0;
  }
  slideImage();
}

function goPre() {
  counter--;
  if (counter == -1) {
    counter = show_img1.length - 1;
  }
  slideImage();
}

function toggleDropdown(element) {
  element.classList.toggle("open");
}

prod_name.textContent = data.name;
price.textContent = data.price;
description.textContent = data.description;

data.Ing.forEach((element) => {
  let btn = document.createElement("button");
  btn.textContent = element;
  btn.className = "btn_ing";
  ingredients.append(btn);
});

//fetch data
async function fetchData(id = 1) {
  try {
    let res = await fetch(
      `https://mock-server-unit-005.onrender.com/product/${id}`
    );
    let data = await res.json();
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}

let one = Math.floor(Math.random() * 14) + 1;
fetchData(one);
let two = Math.floor(Math.random() * 14) + 1;
fetchData(two);
let three = Math.floor(Math.random() * 14) + 1;
fetchData(three);

function displayData(element) {
  // extra_products.innerHTML = "";
  let main_div = document.createElement("div");
  main_div.className = "main_div"

  let main_card = document.createElement("div");
  main_card.className = "main-card";

  let img_card = document.createElement("div");
  img_card.className = "img-card";

  let img = document.createElement("img");
  img.src = element[`main-image`];

  img_card.append(img);

  let body_card = document.createElement("div");
  body_card.className = "body_card";

  let product_name = document.createElement("h3");
  product_name.className = "product_name";
  product_name.textContent = element.name;

  let rating = document.createElement("h4");
  rating.className = "rate_product";

  let temp;
  if (element.rating >= 5) {
    temp = "✮✮✮✮✮";
  } else if (element.rating >= 4) {
    temp = "✮✮✮✮";
  } else if (element.rating >= 3) {
    temp = "✮✮✮";
  } else if (element.rating >= 2) {
    temp = "✮✮";
  } else {
    temp = "✮";
  }
  rating.textContent = temp;

  let price = document.createElement("p");
  price.className = "price";
  price.innerHTML = `<i class="fa-solid fa-tag fa-rotate-90"></i> ₹ ${element.price}`;

  let btn_view = document.createElement("button");
  btn_view.className = "dispay_product";
  btn_view.textContent = "View";

  btn_view.addEventListener("click", () => {
    localStorage.setItem("view", JSON.stringify(element));
    window.location.assign("./view.html");
  });

  let btn_cart = document.createElement("button");
  btn_cart.className = "cart";

  let fo_i = document.createElement("i");
  fo_i.classList.add("fa-solid", "fa-cart-shopping");
  fo_i.id = "cart-anima";

  btn_cart.append(fo_i);

  btn_cart.addEventListener("click", () => {
    fo_i.classList.add("clicked");
    fo_i.classList.add("fa-shake");
    fo_i.style.fontSize = "18px";
    setTimeout(function () {
      fo_i.style.fontSize = "15px";
      fo_i.classList.remove("fa-shake");
      fo_i.classList.remove("clicked");
    }, 500);
  });

  body_card.append(product_name, price, rating, btn_view, btn_cart);
  main_div.append(img_card, body_card);
  extra_products.append(main_div);
}
