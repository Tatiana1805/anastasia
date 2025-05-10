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
document.querySelectorAll('.price__el__item__info__el__item').forEach(item => {
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
});

//открытие доп курсов
document.getElementById('addPrice').addEventListener('click', function(e){
  e.preventDefault();
  const containerAdd = document.getElementById("containerAdd")
  if(containerAdd.style.display === 'flex'){
    containerAdd.style.display = 'none';
    this.textContent = 'Смотреть все программы'
  } else {
    containerAdd.style.display = 'flex'
    this.textContent = 'Скрыть все программы'
  }
})

