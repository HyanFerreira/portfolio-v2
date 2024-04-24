document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.container-slider');
  const btnSeta = document.querySelector('.button-seta');
  const linkItems = document.querySelectorAll('.link-item');

  let isTransitioning = false;
  let slideHeight = 25;
  let currentSlideIndex = 0;

  const linkItemsMobile = document.querySelectorAll('.link-item-mobile');

  function activeLink() {
    linkItemsMobile.forEach(item => {
      item.classList.remove('active');
      this.classList.add('active');
    });
  }

  linkItemsMobile.forEach(item => {
    item.addEventListener('click', activeLink);
  });

  function updateSlider(index) {
    if (!isTransitioning) {
      isTransitioning = true;
      currentSlideIndex = index;
      slider.style.transition = 'transform 900ms';
      slider.style.transform = `translateY(-${slideHeight * index}%)`;
      linkItems.forEach(item => item.classList.remove('selected'));
      linkItems[index].classList.add('selected');
      linkItemsMobile.forEach(item => item.classList.remove('active'));
      linkItemsMobile[index].classList.add('active');
      setTimeout(() => {
        isTransitioning = false;
      }, 900);
    }
  }

  linkItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      updateSlider(index);
    });
  });

  linkItemsMobile.forEach((item, index) => {
    item.addEventListener('click', function() {
      updateSlider(index);
    });
  });

  btnSeta.addEventListener('click', function() {
    if (currentSlideIndex < slider.children.length - 1) {
      updateSlider(currentSlideIndex + 1);
    }
  });

  function scrolling(event) {
    if (event.deltaY > 0 && currentSlideIndex < slider.children.length - 1) {
      updateSlider(currentSlideIndex + 1);
    } else if (event.deltaY < 0 && currentSlideIndex > 0) {
      updateSlider(currentSlideIndex - 1);
    }
  }

  function enableScrolling() {
    if (window.innerWidth >= 1300) {
      window.addEventListener('wheel', scrolling);
    } else {
      window.removeEventListener('wheel', scrolling);
    }
  }

  enableScrolling();

  window.addEventListener('resize', enableScrolling);

  document.addEventListener('keydown', function(event) {
    if (
      event.key === 'ArrowDown' &&
      currentSlideIndex < slider.children.length - 1
    ) {
      updateSlider(currentSlideIndex + 1);
    } else if (event.key === 'ArrowUp' && currentSlideIndex > 0) {
      updateSlider(currentSlideIndex - 1);
    }
  });

  function updateSliderHeight() {
    const numSlides = document.querySelectorAll('.slide').length;
    const sliderHeight = slideHeight * numSlides;
    slider.style.height = `${sliderHeight}%`;
  }

  window.addEventListener('resize', updateSliderHeight);

  updateSliderHeight();
});
