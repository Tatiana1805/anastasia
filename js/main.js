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
let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("qualification__info__diploma__imgs")[0].children;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}


document.addEventListener('DOMContentLoaded', function() {
  const reviewsSwiper = new Swiper('.reviews__swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    // Настройки прокрутки:
    grabCursor: true,
    simulateTouch: true,
    touchRatio: 1,
    touchReleaseOnEdges: true, // Срабатывает при отпускании на краях
    resistance: true, // Упругость при достижении конца
    resistanceRatio: 0.5, // Сила упругости
    
    navigation: {
      nextEl: '.reviews__info__arrows .next',
      prevEl: '.reviews__info__arrows .prev'
    },
    breakpoints: {
      320: { 
        slidesPerView: 1,
        simulateTouch: true // Обязательно для мобилок
      },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});