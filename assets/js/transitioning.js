document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.container-slider');
  const about = document.querySelector('#about');
  const skills = document.querySelector('#skills');
  const projects = document.querySelector('#projects');
  const contact = document.querySelector('#contact');
  const linkItems = document.querySelectorAll('.link-item');

  let isTransitioning = false;
  let slideHeight = 25;
  let currentSlideIndex = 0;

  linkItems.forEach((item) => {
    item.addEventListener('click', function () {
      linkItems.forEach((item) => item.classList.remove('selected'));

      this.classList.add('selected');

      let targetIndex = Array.from(linkItems).indexOf(this);

      slider.style.transition = 'transform 900ms';
      slider.style.transform = `translateY(-${slideHeight * targetIndex}%)`;
    });
  });

  about.addEventListener('click', function () {
    if (currentSlideIndex === 1) {
      currentSlideIndex--;
    } else if (currentSlideIndex === 2) {
      currentSlideIndex -= 2;
    } else if (currentSlideIndex === 3) {
      currentSlideIndex -= 3;
    }
  });

  skills.addEventListener('click', function () {
    if (currentSlideIndex === 0) {
      currentSlideIndex++;
    } else if (currentSlideIndex === 2) {
      currentSlideIndex--;
    } else if (currentSlideIndex === 3) {
      currentSlideIndex -= 2;
    }
  });

  projects.addEventListener('click', function () {
    if (currentSlideIndex === 0) {
      currentSlideIndex = +2;
    } else if (currentSlideIndex === 1) {
      currentSlideIndex++;
    } else if (currentSlideIndex === 3) {
      currentSlideIndex--;
    }
  });

  contact.addEventListener('click', function () {
    if (currentSlideIndex === 0) {
      currentSlideIndex += 3;
    } else if (currentSlideIndex === 1) {
      currentSlideIndex += 2;
    } else if (currentSlideIndex === 2) {
      currentSlideIndex++;
    }
  });

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
        if (
          !isTransitioning &&
          currentSlideIndex < slider.children.length - 1
        ) {
          isTransitioning = true;
          currentSlideIndex++;
          slider.style.transition = 'transform 900ms';
          slider.style.transform = `translateY(-${
            slideHeight * currentSlideIndex
          }%)`;
          setTimeout(() => {
            isTransitioning = false;
          }, 900);
        }
      } else {
        if (!isTransitioning && currentSlideIndex > 0) {
          isTransitioning = true;
          currentSlideIndex--;
          slider.style.transition = 'transform 900ms';
          slider.style.transform = `translateY(-${
            slideHeight * currentSlideIndex
          }%)`;
          setTimeout(() => {
            isTransitioning = false;
          }, 900);
        }
      }
      linkItems.forEach((item) => item.classList.remove('selected'));
      linkItems[currentSlideIndex].classList.add('selected');
      setTimeout(function () {
        allowScrollEvent = true;
      }, 1000);
    }
  });
});
