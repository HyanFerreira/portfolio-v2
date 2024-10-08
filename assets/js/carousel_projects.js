document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.content-carousel');
  const nextBtn = document.querySelector('.nextBtnCarousel');
  const prevBtn = document.querySelector('.prevBtnCarousel');
  const carouselBtns = document.querySelector('.content-carousel-btns');

  let isTransitioning = false;
  let carouselItem = 240;
  let carouselItemGap = 30;

  function updateCardWidth() {
    if (window.innerWidth <= 1300) {
      carouselBtns.style.display = 'flex';
    } else {
      carouselBtns.style.display = 'none';
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

  let clickable = true;

  prevBtn.addEventListener('click', () => {
    if (clickable) {
      transitionPrev();
      clickable = false;
      setTimeout(function() {
        clickable = true;
      }, 900);
    }
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
