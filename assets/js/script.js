document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const submitButton = document.querySelector('.btn-submit-contact');
  const errorSubmit = document.getElementById('errorSubmit');

  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorMessage = document.getElementById('errorMessage');

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
      showError(errorName, 'Preencha este campo.');
    } else if (name.length < 3) {
      showError(errorName, 'Nome deve conter no mínimo 3 caracteres.');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      showError(errorName, 'Não utilize números e/ou caracteres especiais.');
    } else {
      clearError(errorName);
    }
  }

  // Função para validar o email
  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
      showError(errorEmail, 'Preencha este campo.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showError(errorEmail, 'Insira um email válido.');
    } else {
      clearError(errorEmail);
    }
  }

  // Função para validar a mensagem
  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
      showError(errorMessage, 'Preencha este campo.');
    } else if (message.length < 5) {
      showError(errorMessage, 'Mensagem deve conter no mínimo 5 caracteres.');
    } else {
      clearError(errorMessage);
    }
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
      console.log('O formulário está pronto para enviar!');
    } else {
      showError(
        errorSubmit,
        'Por favor, preencha todos os campos corretamente.',
      );
    }
  }

  // Adiciona os event listeners para os inputs
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  // Adiciona o event listener para o botão de submit
  submitButton.addEventListener('click', validateForm);
});
