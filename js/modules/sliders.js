function sliders() {
    const slidersParent = document.querySelector('.offer__slider-counter'),
        slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        slideNext = document.querySelector('.offer__slider-next'),
        slidePrev = document.querySelector('.offer__slider-prev'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.8s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'), // создание точек в слайдере
        dotsArr = [];
    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) { // создание точек
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // устанавливаем точку к определенному слайду
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;  
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }
    // функция удаления не чисел===================================================================РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ
    function deleteNotNumber(str) {
        return +str.replace(/\D/g, '');
    }
    // ============================================================================================
    slideNext.addEventListener('click', () => {
        if (offset == deleteNotNumber(width) * (slides.length - 1)) { // Здесь работа со строками
            offset = 0;
        } else {
            // offset += +width.slice(0, width.length - 2); Через регулярные выражения
            offset += deleteNotNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    });

    slidePrev.addEventListener('click', () => {
        if (offset == 0) { // Здесь работа со строками
            offset = deleteNotNumber(width) * (slides.length - 1);
        } else {
            offset -= deleteNotNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    });


    dotsArr.forEach(dot => { // кликанье на точку для смены слайдера
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotNumber(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dotsArr.forEach(dot => dot.style.opacity = '.5');
            dotsArr[slideIndex - 1].style.opacity = 1;
        });
    });
}

module.exports = sliders;