let ykData = [
  {
      "id": "1011",
      "image_urls": [
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12447439-1354866381155694.jpg",
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12447439-8414795815726525.jpg"
      ],
      "name": "Christophe Robin Regenerating Serum with Prickly Pear Oil 50ml",
      "brand": "Christophe Robin",
      "skin_type": "Afro & Textured",
      "product_type": "hairCare",
      "price": "37.00",
      "description": "Christophe Robin Regenerating Serum nourishes and repairs hair with prickly pear oil.",
      "reviews": {
          "average_rating": 4.9,
          "total_reviews": 45
      },
      "quantity": 2
  },
  {
      "id": "1012",
      "image_urls": [
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12526882-6914866384402807.jpg",
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12526882-1374759321226874.jpg",
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12526882-6634891232652453.jpg"
      ],
      "name": "VIRTUE Recovery Shampoo 240ml",
      "brand": "VIRTUE",
      "skin_type": "Braided",
      "product_type": "hairCare",
      "price": "29.00",
      "description": "VIRTUE Recovery Shampoo helps revive and strengthen hair, perfect for braided styles.",
      "reviews": {
          "average_rating": 4.7,
          "total_reviews": 33
      },
      "quantity": 1
  },
  {
      "id": "1013",
      "image_urls": [
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/14883059-2025073174137070.jpg",
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/14883059-4165073174241173.jpg",
          "https://static.thcdn.com/images/large/webp//productimg/1600/1600/14883059-2115073174396501.jpg"
      ],
      "name": "VIRTUE Celebrate Hair Repair Full Pro Size Duo (Worth $168.00)",
      "brand": "VIRTUE",
      "skin_type": "Curly & Wavy",
      "product_type": "hairCare",
      "price": "115.00",
      "description": "VIRTUE Celebrate Hair Repair Duo is a complete set for celebrating healthy and repaired hair.",
      "reviews": {
          "average_rating": 4.9,
          "total_reviews": 47
      },
      "quantity": 1
  }
]

// var cartData = JSON.parse(localStorage.getItem("add your key here.....")) || [];
var cartData = ykData;
let allProductSubtotal = 0;
let discount = 0;

function renderProducts(data) {
  data.forEach(function (element) {
    let cartProductSingleCard = document.createElement("div");
    cartProductSingleCard.className = "cartProductSingleCard";

    let productImageAndTitle = document.createElement("div");
    productImageAndTitle.className = "productImageAndTitle";

    let imageWrapper = document.createElement("div");
    imageWrapper.id = "imageWrapper";

    let productImage = document.createElement("img");
    productImage.src = element.image_urls[0];
    imageWrapper.appendChild(productImage);

    let productTitleWrapperCartPage = document.createElement("div");
    productTitleWrapperCartPage.id = "productTitleWrapperCartPage";

    let productTitle = document.createElement("p");
    productTitle.id = "product-title";
    productTitle.textContent = element.name;
    productTitleWrapperCartPage.appendChild(productTitle);

    productImageAndTitle.appendChild(imageWrapper);
    productImageAndTitle.appendChild(productTitleWrapperCartPage);

    let itemPriceWrapper = document.createElement("div");
    itemPriceWrapper.id = "itemPriceWrapper";

    let itemPrice = document.createElement("p");
    itemPrice.textContent = `$${element.price}`;
    itemPriceWrapper.appendChild(itemPrice);

    let quantity = element.quantity;
    let productSubtotal = element.price * quantity;
    let quantitySelector = document.createElement("div");
    quantitySelector.id = "quantitySelector";

    let quantityDecrement = document.createElement("button");
    quantityDecrement.id = "quantityDecrement";
    quantityDecrement.innerHTML = '<i class="fa-solid fa-minus"></i>';
    quantitySelector.appendChild(quantityDecrement);

    quantityDecrement.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        productSubtotal = quantity * element.price;
        allProductSubtotal -= Number(element.price);
        quantitySpan.textContent = quantity;
        subtotalPrice.textContent = `$${productSubtotal.toFixed(2)}`;

        if (hasDiscountBeenApplied) {
          discount = allProductSubtotal * 0.3;
        }

        updateSummery();
      }
    });

    let quantitySpan = document.createElement("span");
    quantitySpan.textContent = quantity;
    quantitySelector.appendChild(quantitySpan);

    let quantityIncrement = document.createElement("button");
    quantityIncrement.id = "quantityIncrement";
    quantityIncrement.innerHTML = '<i class="fa-solid fa-plus"></i>';
    quantitySelector.appendChild(quantityIncrement);

    quantityIncrement.addEventListener("click", function () {
      quantity++;
      productSubtotal = quantity * element.price;
      allProductSubtotal += Number(element.price);
      quantitySpan.textContent = quantity;
      subtotalPrice.textContent = `$${productSubtotal.toFixed(2)}`;

      if (hasDiscountBeenApplied) {
        discount = allProductSubtotal * 0.3;
      }

      updateSummery();
    });

    let subtotalWrapper = document.createElement("div");
    subtotalWrapper.id = "subtotalWrapper";

    let subtotalPrice = document.createElement("p");
    subtotalPrice.textContent = `$${productSubtotal.toFixed(2)}`;

    subtotalWrapper.appendChild(subtotalPrice);

    let removeIconWrapper = document.createElement("div");
    removeIconWrapper.id = "removeIconWrapper";

    let removeIcon = document.createElement("i");
    removeIcon.className = "fa-solid fa-circle-xmark";
    removeIconWrapper.appendChild(removeIcon);
    subtotalWrapper.appendChild(removeIconWrapper);

    removeIcon.addEventListener("click", removeProduct);

    cartProductSingleCard.appendChild(productImageAndTitle);
    cartProductSingleCard.appendChild(itemPriceWrapper);
    cartProductSingleCard.appendChild(quantitySelector);
    cartProductSingleCard.appendChild(subtotalWrapper);

    let parent = document.querySelector("#cartItemShowCaseWrapper");
    parent.appendChild(cartProductSingleCard);
    allProductSubtotal += productSubtotal;
  });
  updateSummery();
}


// Remove feature
function removeProduct(event) {
  let productElement = event.target.closest(".cartProductSingleCard");

  let title = productElement.querySelector("#product-title").textContent;

  let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  let index = cartData.findIndex(function (product) {
    return product.name === title;
  });

  if (index !== -1) {
    cartData.splice(index, 1);
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  localStorage.setItem("cartData", JSON.stringify(cartData));

  let price = Number(
    productElement.querySelector("#itemPriceWrapper p").textContent.slice(1)
  );
  let quantity = Number(
    productElement.querySelector("#quantitySelector span").textContent
  );

  allProductSubtotal -= price * quantity;

  if (hasDiscountBeenApplied) {
    discount = allProductSubtotal * 0.3;
  }

  productElement.remove();

  let wishlistSection = document.querySelector(".cartWishlistDiv");
  if (wishlistSection) {
    wishlistSection.remove();
  }

  updateSummery();
}

function updateSummery() {
  let itemCount = document.querySelector("#pricingFinalSubtotal");
  itemCount.innerHTML = `Subtotal (${cartData.length} Items)`;

  let discountElement = document.querySelector("#discountPrice");
  discountElement.innerHTML = `-$${discount.toFixed(2)}`;

  let cartSummerySubtotal = document.querySelector("#cartSummerySubtotal");
  cartSummerySubtotal.innerHTML = `$${allProductSubtotal.toFixed(2)}`;

  let totalCartPrice = document.querySelector("#totalCartPrice");
  totalCartPrice.innerHTML = `$${(allProductSubtotal - discount).toFixed(2)}`;
}

// Coupon management
let hasDiscountBeenApplied = false;
let appliedPromoCode = "";

let appliedCouponManagement = document.querySelector(
  ".appliedCouponManagement"
);
let couponAlerts = document.querySelector(".couponAlerts");
let couponAlertText = document.querySelector("#couponAlertText");
let applyDiscountWrapperButton = document.querySelector(
  ".applyDiscountWrapper button"
);
let applyDiscountWrapperInput = document.querySelector(
  ".applyDiscountWrapper input"
);
let showCouponIcon = document.querySelector("#showCoupon i");

appliedCouponManagement.style.display = "none";
couponAlerts.style.display = "none";

applyDiscountWrapperButton.addEventListener("click", function () {
  let promoCode = applyDiscountWrapperInput.value.toUpperCase();

  if (promoCode === "MASAI30" || promoCode === "CLEAN30") {
    if (!hasDiscountBeenApplied) {
      discount = allProductSubtotal * 0.3;
      hasDiscountBeenApplied = true;
      appliedPromoCode = promoCode;
      updateSummery();

      appliedCouponManagement.style.display = "block";
      document.querySelector("#showCoupon p").textContent = promoCode;

      couponAlerts.style.display = "none";
    } else {
      couponAlertText.textContent = "Discount has already been applied.";
      couponAlerts.style.display = "block";
    }
  } else {
    couponAlertText.textContent = "Invalid promo code.";
    couponAlerts.style.display = "block";
  }
});

showCouponIcon.addEventListener("click", function () {
  allProductSubtotal += discount;
  discount = 0;
  hasDiscountBeenApplied = false;
  appliedPromoCode = "";
  updateSummery();

  appliedCouponManagement.style.display = "none";
  couponAlerts.style.display = "none";
});

function openPaymentPage() {
  var newArray = [...cartData];
  var newArrayString = JSON.stringify(newArray);
  var encodedArray = encodeURIComponent(newArrayString);
  window.location.href = "payment.html?data=" + encodedArray;
}

document
  .getElementById("topCheckoutButton")
  .addEventListener("click", openPaymentPage);
document
  .getElementById("bottomCheckoutButton")
  .addEventListener("click", openPaymentPage);

updateSummery();
renderProducts(cartData);
$(function () {
  $("#footer").load("footer.html");
});
