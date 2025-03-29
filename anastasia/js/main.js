//скейлинг страницы при уменьшении экрана
function scalePage() {
    const maxWidth = 1165; // Максимальная ширина контейнера
    const browserWidth = window.innerWidth; // Ширина окна браузера
    const windowWidth = $(window).width(); // Внутренняя ширина, без скроллбара


    if (browserWidth > 900 && browserWidth < maxWidth) {
        // Рассчитываем коэффициент масштабирования
        const scale = windowWidth / maxWidth;

        // Применяем масштабирование
        $('.wrapper').css({
            transform: scale(${scale}),
            width: ${maxWidth}px, // Фиксируем ширину контейнера
            transformOrigin: 'top left', // Точка отсчета масштабирования
        });
    } else {
        // Если ширина экрана больше или равна 1760px, сбрасываем масштабирование
        $('.wrapper').css({
            transform: 'none',
            width: '100%',
            transformOrigin: 'unset'
        });
    }
}

// Вызываем функцию при загрузке страницы и изменении размера окна
$(window).on('resize load', scalePage);
//скейлинг страницы при уменьшении экрана