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



function toggleContainer(containerId) {
  const container = document.getElementById(containerId);
  const isVisible = container.style.display === 'block';

  // Скрываем все контейнеры
  const containers = document.querySelectorAll('.price__container__el__item');
  containers.forEach((c) => {
      c.style.display = 'none';
  });

  // Показываем или скрываем выбранный контейнер
  container.style.display = isVisible ? 'none' : 'block';
}

// let header = document.querySelector(".header")
// window.onscroll = function(){
    
// if(window.scrollY > 100){
// header.style.background = "#E1EEF6"
// }
// else{
// header.style.background = "#e1eef6ab" 
// }
// }