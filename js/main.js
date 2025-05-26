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

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Открытие/закрытие меню
  burger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Закрытие при клике на ссылку
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Закрытие при клике вне меню
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});
// Вызываем функцию при загрузке страницы и изменении размера окна
// $(window).on("resize load", scalePage);
//скейлинг страницы при уменьшении экрана



// function toggleContainer(containerId) {
//   const container = document.getElementById(containerId);
//   const isVisible = container.style.display === 'block';

//   // Скрываем все контейнеры
//   const containers = document.querySelectorAll('.price__container__el__item');
//   containers.forEach((c) => {
//       c.style.display = 'none';
//   });

//   // Показываем или скрываем выбранный контейнер
//   container.style.display = isVisible ? 'none' : 'block';
// }


// Карусель для сертификатов
const diplomaSwiper = new Swiper('.qualification__info__diploma__imgs', {
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: '.diploma-next',
    prevEl: '.diploma-prev',
  },
  // Критически важные параметры:
  injectStyles: false, // Отключаем встроенные стили
  updateOnWindowResize: true,
  resizeObserver: true,
  // Отключаем все внутренние отступы:
  on: {
    init: function() {
      this.wrapperEl.style.padding = '0';
      this.slides.forEach(slide => slide.style.padding = '0');
    }
  }
});



document.addEventListener('DOMContentLoaded', function() {
  // Инициализация слайдера отзывов
  const reviewsSwiper = new Swiper('.reviews__swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    navigation: {
      nextEl: '.reviews__info__arrows .next',
      prevEl: '.reviews__info__arrows .prev',
    },
    noSwiping: true, // Отключает перетаскивание по всему слайдеру
    noSwipingClass: 'reviews__info__list__el__link', // Разрешает клики по этому классу
    preventInteractionOnTransition: true, // Фикс для плавности

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
});

//открытие доп текста в прайсе
/* document.querySelectorAll('.price__el__item__info__el__item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const container = e.target.closest(".price__el__item__info__el") //доходим до родителя
    const moreText = container.querySelector('.price__el__item__info__el__more') //обращаемся к скрытому тексту через родителя
    const buttonText = container.querySelector(".price__el__item__info__el__item__btn")

    if (moreText.style.display === "block") {
      moreText.style.display = "none";
      buttonText.textContent = "Подробнее";
    } else {
      moreText.style.display = "block";
      buttonText.textContent = "Скрыть";
    }
  });
}); */

//открытие доп текста в прайсе на jquery с анимацией
$('.price__el__item__info__el__item').on('click', function(e) {
  e.preventDefault();

  if ($(this).prev('.price__el__item__info__el__more').css('display') === 'block') {
    $(this).prev('.price__el__item__info__el__more').slideUp();
    $(this).find('.price__el__item__info__el__item__btn').text('Подробнее');
  } else {
    $(this).prev('.price__el__item__info__el__more').slideDown();
    $(this).find('.price__el__item__info__el__item__btn').text('Скрыть');
  }
});
//открытие доп текста в прайсе на jquery с анимацией

//открытие доп курсов
/* document.getElementById('addPrice').addEventListener('click', function(e){
  e.preventDefault();
  const containerAdd = document.getElementById("containerAdd")
  if(containerAdd.style.display === 'flex'){
    containerAdd.style.display = 'none';
    this.textContent = 'Смотреть все программы'
  } else {
    containerAdd.style.display = 'flex'
    this.textContent = 'Скрыть все программы'
  }
}) */

  //открытие доп курсов на jquery с анимацией
$('#addPrice').on('click', function(e) {
  e.preventDefault();
  console.log('add trigger');
  
  if ($('#containerAdd').css('display') != 'none') {
    $('#containerAdd').slideUp();
    console.log('add true');
    $(this).text('Смотреть все программы')
  } else {
    $('#containerAdd').slideDown();
    $('#containerAdd').css('display', 'flex');
    $(this).text('Скрыть все программы')

    console.log('add false');
  }
});

//popup

$('.open__popup').on('click', function(e) {
  e.preventDefault();

  $('.overlay, .popup__consult').fadeIn();
  $('body').css('overflow', 'hidden');
});

$('.popup__close').on('click', function(e) {
  e.preventDefault();

  $('.overlay, .popup__consult').fadeOut();
  $('body').css('overflow', 'auto');
});

$('.popup__form--consult').on('submit', function(e) {
  e.preventDefault();

  let inputsValid = false;
  let checkboxValid = false;
  let allValid = false;

  function checkInputs() {
    const inputs = $('.popup-input');
    
    inputs.each(function() {
        if ($(this).val().trim() === '') {
          inputsValid = false;
        } else {
          inputsValid = true;
        }
    });
    
    return inputsValid;
  }

  function checkPrivacy() {

    if ($('.accept-ppd-popup').prop('checked')) {
      checkboxValid = true;
      $('.popup__form__check__fake').css('outline', 'none');
    } else {
      checkboxValid = false;
      $('.popup__form__check__fake').css('outline', '1px dashed red');
    }
    
  }

  function checkValidity() {
    if(inputsValid && checkboxValid) {
      allValid = true;
    } else {
      allValid = false;
    }

    console.log(allValid);
    
  }

  checkInputs();
  checkPrivacy();
  checkValidity();

  if(!allValid) {
    e.preventDefault();

    $('.popup').fadeOut();
    $('.popup__message__title').text('Валидация не пройдена. Необходимо заполнить все поля формы и дать согласие на обработку персональных данных');
    $('.overlay, .popup__message').fadeIn();
    $('body').css('overflow', 'hidden');

    $('.popup__close--msg').on('click', function(e) {
      e.preventDefault();

      $('.popup__message').fadeOut();
      $('.popup__consult').fadeIn();
    });
  } else {
    $('.popup__message__text').text('Валидация не пройдена. Необходимо заполнить все поля формы и дать согласие на обработку персональных данных');
    console.log('валидация пройдена');
    
    //код для отправки формы
  }
});
