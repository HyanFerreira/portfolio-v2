document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.container');

  let isTransitioning = false;
  let slideHeight = 25;

  updateSliderHeight();

  window.addEventListener('resize', updateSliderHeight);

  function updateSliderHeight() {
    const numSlides = document.querySelectorAll('.slide').length;

    const sliderHeight = slideHeight * numSlides;
    slider.style.height = `${sliderHeight}%`;
  }

  var allowScrollEvent = true;

  window.addEventListener('wheel', function (event) {
    if (allowScrollEvent) {
      allowScrollEvent = false;

      if (event.deltaY > 0) {
        if (!isTransitioning) {
          isTransitioning = true;
          slider.style.transition = 'transform 900ms';
          slider.style.transform = `translateY(-${slideHeight}%)`;
          setTimeout(() => {
            slider.style.transition = 'none';
            slider.style.transform = 'translateY(0)';
            slider.appendChild(slider.firstElementChild);
            isTransitioning = false;
          }, 900);
        }
      } else {
        if (!isTransitioning) {
          isTransitioning = true;
          slider.insertBefore(
            slider.lastElementChild,
            slider.firstElementChild,
          );
          slider.style.transition = 'none';
          slider.style.transform = `translateY(-${slideHeight}%)`;
          setTimeout(() => {
            slider.style.transition = 'transform 900ms';
            slider.style.transform = 'translateY(0)';
            isTransitioning = false;
          }, 0);
        }
      }
      setTimeout(function () {
        allowScrollEvent = true;
      }, 1000);
    }
  });
});
