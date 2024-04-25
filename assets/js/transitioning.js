document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.container-slider');
  const btnSeta = document.querySelector('.button-seta');
  const linkItems = document.querySelectorAll('.link-item');
  const linkItemsMobile = document.querySelectorAll('.link-item-mobile');
  const cards = document.querySelectorAll('.card');

  let isTransitioning = false;
  let slideHeight = 25;
  let currentSlideIndex = 0;

  function scrollingMobile(cardElement) {
    var startY;
    var lastY;

    // Ouvinte de evento para touchstart
    cardElement.addEventListener('touchstart', function(e) {
      // Captura a posição inicial do toque
      startY = e.touches[0].clientY;
    });

    // Ouvinte de evento para touchmove
    cardElement.addEventListener('touchmove', function(e) {
      // Captura a posição final do toque
      lastY = e.touches[0].clientY;
    });

    // Ouvinte de evento para touchend
    cardElement.addEventListener('touchend', function() {
      // Verifica se houve um movimento significativo para cima ou para baixo
      var deltaY = lastY - startY;
      if (deltaY > 0 && cardElement.scrollTop === 0) {
        // O usuário arrastou para baixo no início do conteúdo
        // console.log('Arrastou para baixo no início');
        updateSlider(currentSlideIndex - 1);
      }

      if (
        deltaY < 0 &&
        cardElement.scrollTop + cardElement.clientHeight >=
          cardElement.scrollHeight
      ) {
        // O usuário arrastou para cima no final do conteúdo
        // console.log('Arrastou para cima no final');
        updateSlider(currentSlideIndex + 1);
      }
    });
  }

  // function resetScrolling(cardElement) {
  //   cardElement.removeEventListener('scroll', scrollingMobile);
  //   cardElement.scrollTop = 0;
  //   cardElement.addEventListener('scroll', function() {
  //     if (cardElement.scrollTop === 0) {
  //       resetScrolling(cardElement);
  //     }
  //   });
  // }

  cards.forEach(card => {
    var chegouAoFinal = false; // variável de controle

    card.addEventListener('scroll', function() {
      // Verifica se a rolagem atingiu o topo
      if (card.scrollTop === 0) {
        // console.log('Rolagem atingiu o topo do conteúdo.');
        chegouAoFinal = false; // reinicia a variável de controle ao chegar ao topo
        scrollingMobile(card);
      }

      // Verifica se a rolagem atingiu o final (com uma margem de erro)
      if (
        !chegouAoFinal &&
        Math.abs(card.scrollTop + card.clientHeight - card.scrollHeight) <= 1
      ) {
        // console.log('Rolagem atingiu o final do conteúdo.');
        chegouAoFinal = true; // marca que a mensagem de chegada ao final já foi exibida
        scrollingMobile(card);
      }
    });

    // Sempre adiciona o evento de rolagem móvel
    scrollingMobile(card);
  });

  function updateSlider(index) {
    if (!isTransitioning && linkItems[index]) {
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
