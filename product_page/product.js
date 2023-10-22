let rangeInput = document.querySelectorAll(".range-input input");
let priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");
let priceGap = 100;
let input_min = document.getElementById("input-min");
let input_max = document.getElementById("input-max");
let range_min = document.getElementById("range-min");
let range_max = document.getElementById("range-max");
let container = document.getElementById("container");

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(priceInput[0].value),
      maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= priceGap && maxVal <= 10000) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxVal;
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

//main work of container

async function fetchData(page=1,price=0,brand="",rating="",bounce="") {
  try {
    price_operator = `&`
    let res = await fetch(`https://mock-server-unit5.onrender.com/product?_page=${page}&_limit=8`);
    let data = await res.json();
    displayData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// fetchData();
//display the data

function displayData(data) {
  let count = 100;
  data.forEach((element) => {
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

    let price = document.createElement("p");
    price.className = "price";
    price.innerHTML = `<i class="fa-solid fa-tag fa-rotate-90"></i> ₹ ${element.price}`;

    let btn_view = document.createElement("button");
    btn_view.className = "dispay_product";
    btn_view.textContent = "View";

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

    body_card.append(product_name, price, btn_view, btn_cart);

    main_card.append(img_card, body_card);

    setTimeout(() => {
      container.append(main_card);
    }, count);
    count += 100;
  });
}

//eventlistener
range_min.addEventListener("change",()=>{

})
