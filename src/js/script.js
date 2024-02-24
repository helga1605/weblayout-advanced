
// Burger
let burger = document.querySelector(`.burger`);
let menu = document.querySelector(`.header320-list`);
let menuLinks = menu.querySelectorAll(`.header320-item`);

burger.addEventListener(`click`,
  function () {

    burger.classList.toggle(`burger--active`);
    menu.classList.toggle(`header320-list--active`);
    document.body.classList.toggle(`stop-scroll`);
  })

menuLinks.forEach(function (el) {
  el.addEventListener(`click`, function () {
    burger.classList.remove(`burger--active`);
    menu.classList.remove(`header320-list--active`);
    document.body.classList.remove(`stop-scroll`)
  })
})

// Search

document.querySelector(".header__btn-open").addEventListener("click", function () {
  document.querySelector(".header__form").classList.add("form__active");
  this.classList.add("active");
})

document.addEventListener("click", function (e) {
  let target = e.target;
  let form = document.querySelector(".form");
  if (!target.closest(".form-container") && target.closest(".closed-search")) {
    form.classList.remove("form__active");
    form.querySelector("input").value = "";
    document.querySelector(".header__btn-open").classList.remove("active")
  }

  if (target.closest(".closed-search")) {
    form.classList.remove("form__active");
    form.querySelector("input").value = "";
    document.querySelector(".header__btn-open").classList.remove("active")
  }
})

