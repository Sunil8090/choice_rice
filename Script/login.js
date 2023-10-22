const frontCard = document.querySelector(".front_card");
const signUpBtn = document.querySelector(".signup_msg_btn");
const loginBtn = document.querySelector(".login_msg_btn");
const userEmailInp = document.querySelector(".user_email");
const userFNameInp = document.querySelector(".user_full_name");

signUpBtn.addEventListener("click", () => {
    frontCard.classList.add("front_card_signup");
    userFNameInp.focus();
});

loginBtn.addEventListener("click", () => {
    frontCard.classList.remove("front_card_signup");
    userEmailInp.focus();
});


