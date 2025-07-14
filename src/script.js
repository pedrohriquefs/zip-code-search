const cepInput = document.getElementById('cepInput');
const error = document.querySelector('#error');

cepInput.addEventListener('focus', () => {
  cepInput.placeholder = '';
});

cepInput.addEventListener('blur', () => {
  cepInput.placeholder = 'Digite o CEP desejado aqui';
});

cepInput.addEventListener('input', () => {
  const onlyNumbers = cepInput.value.replace(/\D/g, '');

if (cepInput.value !== onlyNumbers && cepInput.value !== '') {
  setTimeout(() => {
    cepInput.value = onlyNumbers;
    error.style.display = 'inline';

    setTimeout(() => {
      error.style.display = 'none';
    }, 1000);
  }, 100);
  } else {
    error.style.display = 'none';
  }

  cepInput.value = onlyNumbers;
});

let cep = '';

const handleFormSubmit = async (event) => {
  event.preventDefault();
  cep = cepInput.value.replace(/\D/g, '');
  console.log(`CEP digitado: ${cep}`);
  console.log('Form submitted');
  fetchCepData(cep);
  cepInput.value = '';
};

document.querySelector('.cepForm').addEventListener('submit', handleFormSubmit);

const fetchCepData = async (cep) => {
  if (!cep) return;

  const apiUrl = `https://brasilapi.com.br/api/cep/v1/${cep}`;

try {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('Dados recebidos:', data);

    document.getElementById('cepResponse').innerHTML = `
      <ul>
        <li><strong>CEP:</strong> ${data.cep}</li>
        <li><strong>Bairro:</strong> ${data.neighborhood}</li>
        <li><strong>Cidade:</strong> ${data.city}</li>
        <li><strong>UF:</strong> ${data.state}</li>
      </ul>
    `;

    // Após mais 3 segundos, limpar o conteúdo para tirar da tela
    setTimeout(() => {
      document.getElementById('cepResponse').innerHTML = '';
    }, 5000);

} catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('cepResponse').innerText =
      'Erro ao buscar CEP. Tente novamente.';
  }
};

  /*setTimeout(() => {
    cepInput.value = onlyNumbers;
    error.style.display = 'inline';

    setTimeout(() => {
      error.style.display = 'none';
    }, 1000);
  }, 100);*/