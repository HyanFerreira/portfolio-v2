document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;

  const nameInput = document.getElementById('name');
  const nameLabel = document.getElementById('nameLabel');

  const emailInput = document.getElementById('email');
  const emailLabel = document.getElementById('emailLabel');

  const messageInput = document.getElementById('message');
  const messageLabel = document.getElementById('messageLabel');

  const submitButton = document.querySelector('.btn-submit-contact');
  const errorSubmit = document.getElementById('errorSubmit');

  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorMessage = document.getElementById('errorMessage');

  const dropdowns = document.querySelectorAll('.dropdown-language');

  const hamburguer = document.querySelector('.hamburguer');
  const navLinks = document.querySelector('.nav-links');

  const ulLinks = document.querySelectorAll('.ul-links li');

  hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  ulLinks.forEach(ulLink => {
    ulLink.addEventListener('click', () => {
      hamburguer.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select-language');
    const ionIcon = dropdown.querySelector('.caret-down-outline');
    const menuLanguage = dropdown.querySelector('.menu-language');
    const options = dropdown.querySelectorAll('.menu-language li');
    const selectedLanguage = dropdown.querySelector('.selected-language');

    select.addEventListener('click', () => {
      select.classList.toggle('select-language-clicked');
      ionIcon.classList.toggle('rotate');
      menuLanguage.classList.toggle('menu-language-open');
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        selectedLanguage.innerText = option.innerText;
        select.classList.remove('select-language-clicked');
        ionIcon.classList.remove('rotate');
        menuLanguage.classList.remove('menu-language-open');

        options.forEach(option => {
          option.classList.remove('active');
        });
        option.classList.add('active');
      });
    });
  });

  // Função para exibir mensagem de erro em um elemento
  function showError(element, message) {
    element.textContent = message;
  }

  // Função para limpar mensagem de erro de um elemento
  function clearError(element) {
    element.textContent = '';
  }

  // Função para validar o nome
  function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
      if (path.includes('/pt-br/')) {
        showError(errorName, 'Preencha este campo.');
      } else {
        showError(errorName, 'Fill in this field.');
      }
      nameLabel.classList.add('error');
      nameInput.classList.add('error');
    } else if (name.length < 3) {
      if (path.includes('/pt-br/')) {
        showError(errorName, 'Nome deve conter no mínimo 3 caracteres.');
      } else {
        showError(errorName, 'Name must contain at least 3 characters.');
      }
      nameLabel.classList.add('error');
      nameInput.classList.add('error');
    } else if (!/^[\p{L}\s]+$/u.test(name)) {
      if (path.includes('/pt-br/')) {
        showError(errorName, 'Não use números ou caracteres especiais.');
      } else {
        showError(errorName, 'Do not use numbers or special characters.');
      }
      nameLabel.classList.add('error');
      nameInput.classList.add('error');
    } else {
      clearError(errorName);
      nameLabel.classList.remove('error');
      nameInput.classList.remove('error');
    }
  }

  // Função para validar o email
  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
      if (path.includes('/pt-br/')) {
        showError(errorEmail, 'Preencha este campo.');
      } else {
        showError(errorEmail, 'Fill in this field.');
      }
      emailLabel.classList.add('error');
      emailInput.classList.add('error');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      if (path.includes('/pt-br/')) {
        showError(errorEmail, 'Insira um e-mail válido.');
      } else {
        showError(errorEmail, 'Enter a valid e-mail.');
      }
      emailLabel.classList.add('error');
      emailInput.classList.add('error');
    } else {
      clearError(errorEmail);
      emailLabel.classList.remove('error');
      emailInput.classList.remove('error');
    }
  }

  // Função para validar a mensagem
  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
      if (path.includes('/pt-br/')) {
        showError(errorMessage, 'Preencha este campo.');
      } else {
        showError(errorMessage, 'Fill in this field.');
      }
      messageLabel.classList.add('error');
      messageInput.classList.add('error');
    } else if (message.length < 5) {
      if (path.includes('/pt-br/')) {
        showError(errorMessage, 'Mensagem deve conter no mínimo 5 caracteres.');
      } else {
        showError(errorMessage, 'Message must contain at least 5 characters.');
      }
      messageLabel.classList.add('error');
      messageInput.classList.add('error');
    } else {
      clearError(errorMessage);
      messageLabel.classList.remove('error');
      messageInput.classList.remove('error');
    }
  }

  function loading() {
    const modalLoading = document.querySelector('.modal-contact-thanks');
    const thanksDesc = document.querySelector('.thanks-desc');
    const containerLoading = document.querySelector('.container-loading');
    const btnClose = document.getElementById('btnClose');
    const thanks = document.querySelector('.thanks');

    modalLoading.classList.add('active');
    setTimeout(function() {
      thanks.classList.add('active');
      containerLoading.classList.add('active');
    }, 100);
    setTimeout(function() {
      containerLoading.classList.remove('active');
      containerLoading.classList.add('disable');
      thanksDesc.classList.add('active');
    }, 3200);

    btnClose.addEventListener('click', function() {
      modalLoading.classList.remove('active');
      thanksDesc.classList.remove('active');
      containerLoading.classList.remove('disable');
      thanks.classList.remove('active');
    });
  }

  // Função para validar o formulário ao ser submetido
  function validateForm(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Verifica se há erro em cada campo
    validateName();
    validateEmail();
    validateMessage();

    // Verifica se todos os campos estão preenchidos e sem erros
    if (
      name !== '' &&
      email !== '' &&
      message !== '' &&
      errorName.textContent === '' &&
      errorEmail.textContent === '' &&
      errorMessage.textContent === ''
    ) {
      clearError(errorSubmit);
      // Aqui você pode fazer qualquer coisa quando o formulário estiver pronto para enviar
      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'hyanferreira.dev@gmail.com',
        Password: '3FA1A39B4D2AAF617720191EE33BBF6D5C61',
        To: 'hcgamesmg2020@gmail.com',
        From: 'hyanferreira.dev@gmail.com',
        Subject: `${name} te enviou uma mensagem!`,
        Body: `Nome: ${name} <br> <br> Email: ${email} <br> <br> Mensagem: ${message}`,
      }).then(() => {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
      });

      loading();
    } else {
      if (path.includes('/pt-br/')) {
        showError(errorSubmit, 'Preencha todos os campos corretamente.');
      } else {
        showError(errorSubmit, 'Please fill in all fields correctly.');
      }
    }
  }

  // Adiciona os event listeners para os inputs
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  // Adiciona o event listener para o botão de submit
  submitButton.addEventListener('click', validateForm);
});
