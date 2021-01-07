window.addEventListener('DOMContentLoaded', function(){
    'use strict';

// Timer
function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        
    function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),

            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
    }
    let total = setInterval(updateClock, 1000);
    function updateClock(){
        let timer = getTimeRemaining();

        if (timer.timeRemaining > 0) {
            timerHours.textContent = ('0' + timer.hours).slice(-2);
            timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
            timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
        } else if (timer.timeRemaining <= 0){
            timerHours.textContent = ('00');
            timerMinutes.textContent = ('00');
            timerSeconds.textContent = ('00');
            clearInterval(total);
        }
    }
    updateClock();
}
    countTimer('7 january 2021' );
// menu

const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
    menu =  document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItems = menu.querySelectorAll('ul>li');


    const actionMenu = () =>{
        menu.classList.toggle('active-menu');
        // if(!menu.style.transform || menu.style.transform === `translate(-100%)`){
        //     menu.style.transform = `translate(0)`;
        // }else{
        //     menu.style.transform = `translate(-100%)`;
        // }
    };
    btnMenu.addEventListener('click', actionMenu);
    closeBtn.addEventListener('click', actionMenu);

    
    menuItems.forEach((elem) => elem.addEventListener('click', actionMenu));
}
toggleMenu();

// popup
const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupClose = document.querySelector('.popup-close'),
    popupContent = document.querySelector('.popup-content'); 
    
    
    popupBtn.forEach((elem) =>{
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if (window.innerWidth > 768) {
                animate({
                    duration: 5000,
                    timing: function(timeFraction) {
                        return Math.pow(timeFraction, 2)
                    },
                    draw: function(progress) {
                        popupContent.style.left = progress * 500 + 'px';
                    }
                });
            } else {
                popupContent.style.margin = 'auto';
            }
            
        });
    });
    // window.addEventListener('resize', () => { 
    //     if(window <= 768){
    //         popupContent.style.left = '0px';
    //     }
    //     console.log(window);
    //  });
    popupClose.addEventListener('click', () =>{
        popup.style.display = 'none';
    });

    // animate popup
    function animate({timing, draw, duration}) {

        let start = performance.now();
    
        requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction >= 1) timeFraction = 1;
    
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);
    
        draw(progress); // отрисовать её
    
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
}

togglePopUp();

});

