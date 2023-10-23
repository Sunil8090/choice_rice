function toggleOptions() {
  const options = document.getElementById("categoryOptions");
  options.style.display = options.style.display === "block" ? "none" : "block";
}

function navigateToCategory() {
  window.location.href = `../product_page/product.html`;
}
const productLinks = document.getElementsByClassName("productLink");
for (let i = 0; i < productLinks.length; i++) {
  productLinks[i].addEventListener("click", function () {
    window.location.href = "../product_page/product.html"; // Navigate to the "product.html" page
  });
}
const personIcons = document.querySelectorAll(".bi-person-fill");
personIcons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    window.location.href = "../index.html"; // Navigate to the "cat.html" page
  });
});

const bagIcons = document.querySelectorAll(".bi-bag");
bagIcons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    window.location.href = "../cart/cart.html"; // Navigate to the "cart.html" page
  });
});
window.addEventListener("load", function () {
  const imageContainer = document.querySelector(".image-container");
  const images = document.querySelectorAll(".image-container img");
  const imageCount = images.length;

  let currentIndex = 0;

  function scrollImages() {
    currentIndex = (currentIndex + 1) % imageCount;
    const translateXValue = -currentIndex * 100; // Assuming each image has a width of 100%

    images.forEach((image, index) => {
      image.style.transform = `translateX(${translateXValue}%)`;
    });

    setTimeout(scrollImages, 4000); // Scroll every 2 seconds
  }

  setTimeout(scrollImages, 2000); // Start scrolling after 2 seconds
});
window.onscroll = function () {
  myFunction();
};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
