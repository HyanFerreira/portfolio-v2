document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.container-slider');
  const btnSeta = document.querySelector('.button-seta');
  const scrolldown = document.querySelector('.scrolldown');
  const linkItems = document.querySelectorAll('.link-item');
  // const linkItemsMobile = document.querySelectorAll('.link-item-mobile');
  const cards = document.querySelectorAll('.card');

  let isTransitioning = false;
  let slideHeight = 25;
  let currentSlideIndex = 0;
  let touchStartY = 0;

  function scrollingMobile(cardElement) {
    // Ouvinte de evento para touchstart
    cardElement.addEventListener('touchstart', function(e) {
      // Captura a posição inicial do toque
      touchStartY = e.touches[0].clientY;
    });

    // Ouvinte de evento para touchend
    cardElement.addEventListener('touchend', function(e) {
      // Captura a posição final do toque
      var touchEndY = e.changedTouches[0].clientY;

      // Calcula a diferença entre a posição inicial e final do toque
      var deltaY = touchEndY - touchStartY;

      // Verifica se o movimento foi significativo
      if (Math.abs(deltaY) > 50) {
        // Ajuste este valor conforme necessário
        if (deltaY > 0 && cardElement.scrollTop === 0) {
          // O usuário arrastou para baixo no início do conteúdo
          updateSlider(currentSlideIndex - 1);
        }

        if (
          deltaY < 0 &&
          cardElement.scrollTop + cardElement.clientHeight >=
            cardElement.scrollHeight
        ) {
          // O usuário arrastou para cima no final do conteúdo
          updateSlider(currentSlideIndex + 1);
        }
      }
    });
  }

  cards.forEach(card => {
    card.addEventListener('scroll', function() {
      // Verifica se a rolagem atingiu o topo
      if (card.scrollTop === 0) {
        scrollingMobile(card);
      }

      // Verifica se a rolagem atingiu o final
      if (card.scrollTop + card.clientHeight >= card.scrollHeight) {
        scrollingMobile(card);
      }
    });

    scrollingMobile(card);
  });

  const containerMedia = document.querySelector('.container-media');

  function updateSlider(index) {
    if (!isTransitioning && linkItems[index]) {
      isTransitioning = true;

      // Checa se está saindo do último slide
      if (
        currentSlideIndex === slider.children.length - 1 &&
        index < currentSlideIndex
      ) {
        containerMedia.style.bottom = '40px';
      }

      // Checa se está chegando no último slide
      if (index === slider.children.length - 1 && index > currentSlideIndex) {
        containerMedia.style.bottom = '80px';
      }

      currentSlideIndex = index;
      slider.style.transition = 'transform 900ms';
      slider.style.transform = `translateY(-${slideHeight * index}%)`;
      linkItems.forEach(item => item.classList.remove('selected'));
      linkItems[index].classList.add('selected');
      // linkItemsMobile.forEach(item => item.classList.remove('active'));
      // linkItemsMobile[index].classList.add('active');
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

  // linkItemsMobile.forEach((item, index) => {
  //   item.addEventListener('click', function() {
  //     updateSlider(index);
  //   });
  // });

  function reloadRefresh() {
    if (linkItems[0].classList.contains('selected')) {
      // console.log('O primeiro card está ativo.');
      document.documentElement.style.overscrollBehaviorY = 'auto';
    } else {
      // console.log('O primeiro card não está ativo.');
      document.documentElement.style.overscrollBehaviorY = 'contain';
    }
  }

  window.addEventListener('touchend', reloadRefresh);

  function handleClick() {
    if (currentSlideIndex < slider.children.length - 1) {
      updateSlider(currentSlideIndex + 1);
    }
  }

  btnSeta.addEventListener('click', handleClick);
  scrolldown.addEventListener('click', handleClick);

  function scrolling(event) {
    if (event.deltaY > 0 && currentSlideIndex < slider.children.length - 1) {
      updateSlider(currentSlideIndex + 1);
    } else if (event.deltaY < 0 && currentSlideIndex > 0) {
      updateSlider(currentSlideIndex - 1);
    }
  }

  const alertEnabled = document.querySelector('.alert-enabled');
  const alertDisabled = document.querySelector('.alert-disabled');

  let isAlertDisabledActive = true;

  function alertMessage() {
    if (window.innerWidth >= 1080) {
      if (window.innerWidth >= 1300) {
        if (!isAlertDisabledActive) {
          alertDisabled.style.animation = 'none';
          alertEnabled.style.animation = 'var(--alert-animation)';
          isAlertDisabledActive = true;
        }
      } else {
        if (isAlertDisabledActive) {
          alertEnabled.style.animation = 'none';
          alertDisabled.style.animation = 'var(--alert-animation)';
          isAlertDisabledActive = false;
        }
      }
    }
  }

  window.addEventListener('resize', alertMessage);

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
