document.addEventListener("DOMContentLoaded", function () {
  let price_d = JSON.parse(localStorage.getItem("Total_price"));
  // Fetch product data from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const { name, price } = data;
      const options = {
        key: "rzp_test_t4heii9WnxLBjh",
        amount: price_d * 100, // Amount in paise (i.e., ₹500 = 50000)
        currency: "INR",
        name: "Your Company Name",
        description: name,
        image: "https://yourcompany.com/logo.png",
        order_id: "", // Leave empty for now
        handler: function (response) {
          alert(
            "Payment successful. Payment ID: " + response.razorpay_payment_id
          );
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Create a Razorpay instance
      const rzp = new Razorpay(options);

      // Handle the Pay Now button click
      document
        .getElementById("payButton")
        .addEventListener("click", function () {
          rzp.open();
        });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
});
