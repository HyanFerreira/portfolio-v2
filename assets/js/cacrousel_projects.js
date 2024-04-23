document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.content-carousel');
  const nextBtn = document.querySelector('.nextBtnCarousel');
  const prevBtn = document.querySelector('.prevBtnCarousel');

  let isTransitioning = false;
  let carouselItem = 200;
  let carouselItemGap = 30;

  function updateCardWidth() {
    if (window.innerWidth > 2300) {
      carouselItem = 300;
      console.log('300');
    } else if (window.innerWidth > 1300) {
      carouselItem = 200;
      console.log('200');
    } else {
      carouselItem = 140;
      console.log('140');
    }
  }

  window.addEventListener('resize', updateCardWidth);
  updateCardWidth();

  function transitionNext() {
    if (!isTransitioning) {
      isTransitioning = true;
      slider.style.transition = 'transform 900ms';
      slider.style.transform = `translate(-${carouselItem +
        carouselItemGap}px)`;
      setTimeout(() => {
        slider.style.transition = 'none';
        slider.style.transform = 'translate(0)';
        slider.appendChild(slider.firstElementChild);
        isTransitioning = false;
      }, 900);
    }
  }

  function transitionPrev() {
    if (!isTransitioning) {
      isTransitioning = true;
      slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
      slider.style.transition = 'none';
      slider.style.transform = `translate(-${carouselItem +
        carouselItemGap}px)`;
      setTimeout(() => {
        slider.style.transition = 'transform 900ms';
        slider.style.transform = 'translate(0)';
        isTransitioning = false;
      }, 0);
    }
  }

  nextBtn.addEventListener('click', () => {
    transitionNext();
  });

  prevBtn.addEventListener('click', () => {
    transitionPrev();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      transitionNext();
    } else if (event.key === 'ArrowRight') {
      transitionPrev();
    }
  });

  updateSliderWidth();

  window.addEventListener('resize', updateSliderWidth);

  function updateSliderWidth() {
    const numSliders = document.querySelectorAll('.carousel-item').length;

    const sliderWidth = (carouselItem + carouselItemGap) * numSliders;
    slider.style.width = `${sliderWidth}px`;
  }
});
