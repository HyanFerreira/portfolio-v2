document.addEventListener('DOMContentLoaded', function() {
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

  function reloadRefresh() {
    if (document.documentElement.scrollTop === 0) {
      
    }
  }

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
      showError(errorName, 'Fill in this field.');
      nameLabel.classList.add('error');
      nameInput.classList.add('error');
    } else if (name.length < 3) {
      showError(errorName, 'Name must contain at least 3 characters.');
      nameLabel.classList.add('error');
      nameInput.classList.add('error');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      showError(errorName, 'Do not use numbers and/or special characters.');
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
      showError(errorEmail, 'Fill in this field.');
      emailLabel.classList.add('error');
      emailInput.classList.add('error');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showError(errorEmail, 'Enter a valid email.');
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
      showError(errorMessage, 'Fill in this field.');
      messageLabel.classList.add('error');
      messageInput.classList.add('error');
    } else if (message.length < 5) {
      showError(errorMessage, 'Message must contain at least 5 characters.');
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
      showError(errorSubmit, 'Please fill in all fields correctly.');
    }
  }

  // Adiciona os event listeners para os inputs
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  // Adiciona o event listener para o botão de submit
  submitButton.addEventListener('click', validateForm);
});
