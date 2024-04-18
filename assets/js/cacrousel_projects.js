document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.content-carousel');
  const nextBtn = document.querySelector('.nextBtnCarousel');
  const prevBtn = document.querySelector('.prevBtnCarousel');

  let isTransitioning = false;
  let carouselItem = 200;
  let carouselItemGap = 30;

  nextBtn.addEventListener('click', () => {
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
  });

  prevBtn.addEventListener('click', () => {
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
  });

  updateSliderWidth();

  window.addEventListener('resize', updateSliderWidth);

  function updateSliderWidth() {
    const numSliders = document.querySelectorAll('.carousel-item').length;

    const sliderWidth = (carouselItem + carouselItemGap) * numSliders;
    slider.style.width = `${sliderWidth}px`;
  }
});
