let rangeInput = document.querySelectorAll(".range-input input");
let priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");
let priceGap = 100;
let input_min = document.getElementById("input-min");
let input_max = document.getElementById("input-max");
let range_min = document.getElementById("range-min");
let range_max = document.getElementById("range-max");
let container = document.getElementById("container");
let brand_radio = document.getElementsByName("company");
let rating_radio = document.getElementsByName("rat");
let search_bar = document.getElementById("search-bar");

let pagination = document.getElementById("pagination");

let page_count = 1;

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
let price_f = "";
let price_t = "";
let brand_value = "";
let rating_value = "";
let query_value = "";

async function fetchData(
  page = 1,
  price_from = "",
  price_to = 0,
  brand = "",
  rating = "",
  bounce = ""
) {
  try {
    let price_operator =
      price_from && `&price_gte=${price_from}&price_lte=${price_to}`;
    let brand_operator = brand && `&q=${brand}`;
    let rating_operator = rating && `&rating_gte=${rating}`;
    let bounce_operator = bounce && `&q=${bounce}`;
    price_f = price_from;
    price_t = price_to;
    brand_value = brand;
    rating_value = rating;
    query_value = bounce;

    // console.log(price_f, price_t, brand_value, rating_value, query_value);

    let res = await fetch(
      `https://mock-server-unit-005.onrender.com/product?_page=${page}&_limit=8${price_operator}${brand_operator}${rating_operator}${bounce_operator}`
    );
    let data = await res.json();
    displayData(data);
    let total_items = res.headers.get("x-total-count");
    let total_pages = Math.ceil(total_items / 8);

    pagination.innerHTML = "";
    if (total_pages > 1) {
      for (let i = 1; i <= total_pages; i++) {
        let btn = document.createElement("button");
        btn.className = "page_button";
        btn.textContent = i;
        pagination.append(btn);
        btn.addEventListener("click", () => {
          fetchData(
            i,
            price_f,
            price_t,
            brand_value,
            rating_value,
            query_value
          );
        });
      }
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();
//display the data

function displayData(data) {
  container.innerHTML = "";
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
    btn_cart.addEventListener("click", () => {
      check_cart(element);
    });

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

    main_card.append(img_card, body_card);

    setTimeout(() => {
      container.append(main_card);
    }, count);
    count += 100;
  });
}
async function check_cart(element) {
  try {
    let res = await fetch(`https://mock-server-unit-005.onrender.com/Cart`);
    let data = await res.json();
    let flag = true;
   
    for (let item of data) {
      if (item.id == element.id) {
        flag = false;
        break;
      }
    }
   
    if (flag) {
      console.log("hello");
      let res_add = await fetch(
        `https://mock-server-unit-005.onrender.com/Cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(element),
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
//eventlistener
range_min.addEventListener("change", () => {
  let input1 = input_min.value;
  let input2 = input_max.value;
  console.log(input1, input2);
  fetchData(1, input1, input2, brand_value, rating_value, query_value);
});

range_max.addEventListener("change", () => {
  let input1 = input_min.value;
  let input2 = input_max.value;
  console.log(input1, input2);
  fetchData(1, input1, input2, brand_value, rating_value, query_value);
});

input_max.addEventListener("input", () => {
  let input1 = input_min.value;
  let input2 = input_max.value;
  console.log(input1, input2);
  fetchData(1, input1, input2, brand_value, rating_value, query_value);
});

input_min.addEventListener("input", () => {
  let input1 = input_min.value;
  let input2 = input_max.value;
  console.log(input1, input2);
  fetchData(1, input1, input2, brand_value, rating_value, query_value);
});

function getSelectedRadioValue(val) {
  for (var i = 0; i < val.length; i++) {
    if (val[i].checked) {
      return val[i].value;
    }
  }
  return "";
}

function uncheck(val) {
  for (var i = 0; i < val.length; i++) {
    val[i].checked = false;
  }
}

brand_radio.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    var selectedValue = getSelectedRadioValue(brand_radio);
    // var selectedValue1 = getSelectedRadioValue(rating_radio);
    fetchData(1, price_f, price_t, selectedValue, rating_value, query_value);
  });
});

rating_radio.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    var selectedValue = getSelectedRadioValue(rating_radio);
    // var selectedValue1 = getSelectedRadioValue(brand_radio);
    fetchData(1, price_f, price_t, brand_value, selectedValue, query_value);
  });
});

//debounce
let timer = null;
let spinner = document.getElementById("spinner");

search_bar.addEventListener("input", () => {
  price_f = "";
  price_t = "";
  brand_value = "";
  rating_value = "";
  query_value = "";

  uncheck(brand_radio);
  uncheck(rating_radio);

  spinner.style.display = "inline";

  if (timer) {
    clearTimeout(timer);
  }
  let value = search_bar.value;
  timer = setTimeout(() => {
    fetchData("", "", "", "", "", value);
    spinner.style.display = "none";
  }, 1000);
});
