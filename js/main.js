//скейлинг страницы при уменьшении экрана
function scalePage() {
  const maxWidth = 1400; // Максимальная ширина контейнера
  const browserWidth = window.innerWidth; // Ширина окна браузера
  const windowWidth = $(window).width(); // Внутренняя ширина, без скроллбара

  if (browserWidth > 900 && browserWidth < maxWidth) {
    // Рассчитываем коэффициент масштабирования
    const scale = windowWidth / maxWidth;

    // Применяем масштабирование
    $(".main").css({
      transform: `scale(${scale})`,
      width: `${maxWidth}px`, // Фиксируем ширину контейнера
      transformOrigin: "top left", // Точка отсчета масштабирования
    });

    function heightCorrection() {
      const originalHeight = $(".main").outerHeight();
      const scaledHeight = originalHeight * scale;
      $(".main").css("height", `${scaledHeight}px`);
    }

    heightCorrection();
  } else {
    $(".main").css({
      transform: "none",
      width: "100%",
      transformOrigin: "unset",
    });
  }
}

// Карусель для сертификатов
const diplomaSwiper = new Swiper(".qualification__info__diploma__imgs", {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: ".diploma-next",
    prevEl: ".diploma-prev",
  },
  // Критически важные параметры:
  injectStyles: false, // Отключаем встроенные стили
  updateOnWindowResize: true,
  resizeObserver: true,
  // Отключаем все внутренние отступы:
  on: {
    init: function () {
      this.wrapperEl.style.padding = "0";
      this.slides.forEach((slide) => (slide.style.padding = "0"));
    },
  },
});


document.addEventListener("DOMContentLoaded", function () {
  const reviewsSwiper = new Swiper(".reviews__swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    navigation: {
      nextEl: ".reviews__info__arrows .next",
      prevEl: ".reviews__info__arrows .prev",
    },
    noSwiping: true, // Отключает перетаскивание по всему слайдеру
    noSwipingClass: "reviews__info__list__el__link", // Разрешает клики по этому классу
    preventInteractionOnTransition: true, // Фикс для плавности

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
  const reviewAll = document.querySelectorAll(".reviews__info__list__el__all");
  const popup = document.querySelector(".review-popup");
  const popupText = document.querySelector(".review-popup__text");
  const popupClose = document.querySelector(".review-popup__close");

  reviewAll.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const reviewEl = this.closest(".reviews__info__list__el");
      
      // Клонируем только содержимое отзыва
      const reviewContent = reviewEl.querySelector('.review__content').cloneNode(true);
      
      popupText.innerHTML = '';
      popupText.appendChild(reviewContent);
      
      // Показываем попап через добавление класса
      popup.classList.add('active');
      document.body.style.overflow = "hidden";
    });
  });

  // Закрытие попапа
  popupClose.addEventListener("click", () => {
    popup.classList.remove('active');
    document.body.style.overflow = "auto";
  });

  // Закрытие по клику на оверлей
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
      document.body.style.overflow = "auto";
    }
  });
});

//открытие доп текста в прайсе на jquery с анимацией
$(".price__el__item__info__el__item").on("click", function (e) {
  e.preventDefault();

  if (
    $(this).prev(".price__el__item__info__el__more").css("display") === "block"
  ) {
    $(this).prev(".price__el__item__info__el__more").slideUp();
    $(this).find(".price__el__item__info__el__item__btn").text("Подробнее");
  } else {
    $(this).prev(".price__el__item__info__el__more").slideDown();
    $(this).find(".price__el__item__info__el__item__btn").text("Скрыть");
  }
});

//открытие доп курсов на jquery с анимацией
$("#addPrice").on("click", function (e) {
  e.preventDefault();
  console.log("add trigger");

  if ($("#containerAdd").css("display") != "none") {
    $("#containerAdd").slideUp();
    $(this).text("Смотреть все программы");
  } else {
    $("#containerAdd").slideDown();
    $("#containerAdd").css("display", "flex");
    $(this).text("Скрыть все программы");
  }
});

//popup

$(".open__popup").on("click", function (e) {
  e.preventDefault();

  $(".overlay, .popup__consult").fadeIn();
  $("body").css("overflow", "hidden");
});

$(".popup__close").on("click", function (e) {
  e.preventDefault();

  $(".overlay, .popup__consult").fadeOut();
  $("body").css("overflow", "auto");
});

$(".popup__form--consult").on("submit", function (e) {
  e.preventDefault();

  let inputsValid = false;
  let checkboxValid = false;
  let allValid = false;

  function checkInputs() {
    const inputs = $(".popup-input");

    inputs.each(function () {
      if ($(this).val().trim() === "") {
        inputsValid = false;
      } else {
        inputsValid = true;
      }
    });

    return inputsValid;
  }

  function checkPrivacy() {
    if ($(".accept-ppd-popup").prop("checked")) {
      checkboxValid = true;
      $(".popup__form__check__fake").css("outline", "none");
    } else {
      checkboxValid = false;
      $(".popup__form__check__fake").css("outline", "1px dashed red");
    }
  }

  function checkValidity() {
    if (inputsValid && checkboxValid) {
      allValid = true;
    } else {
      allValid = false;
    }

    console.log(allValid);
  }

  checkInputs();
  checkPrivacy();
  checkValidity();

  if (!allValid) {
    e.preventDefault();

    $(".popup").fadeOut();
    $(".popup__message__title").text(
      "Валидация не пройдена. Необходимо заполнить все поля формы и дать согласие на обработку персональных данных"
    );
    $(".overlay, .popup__message").fadeIn();
    $("body").css("overflow", "hidden");

    $(".popup__close--msg").on("click", function (e) {
      e.preventDefault();

      $(".popup__message").fadeOut();
      $(".popup__consult").fadeIn();
    });
  } else {
    $(".popup__message__text").text(
      "Валидация не пройдена. Необходимо заполнить все поля формы и дать согласие на обработку персональных данных"
    );
    console.log("валидация пройдена");

    //код для отправки формы
  }
});

//бургер
const container = document.querySelector(".nav__mobile__btn");
const burger = document.querySelector(".nav__mobile__btn__menu");
const burgerClose = document.querySelector(".nav__mobile__btn__close");
const menu = document.querySelector(".nav__mobile__btn__menu__el");
const nav = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav__mobile__list li a");

// Функция для открытия меню
function openMenu() {
  menu.style.display = "block";
  nav.style.display = "none";
  burger.style.display = "none";
  burgerClose.style.display = "block";
  setTimeout(() => menu.classList.add("active"), 10);
}

// Функция для закрытия меню
function closeMenu() {
  menu.classList.remove("active");
  setTimeout(() => {
    menu.style.display = "none";
    nav.style.display = "flex";
    burger.style.display = "block";
    burgerClose.style.display = "none";
  }, 300);
}

// Обработчик клика по кнопке
container.addEventListener("click", function() {
  if (menu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Закрытие при клике на пункты меню
navItems.forEach(item => {
  item.addEventListener("click", closeMenu);
});