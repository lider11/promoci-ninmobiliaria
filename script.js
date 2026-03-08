const money = new Intl.NumberFormat('es-CO');

function calcularPlan(valorLote) {
  const separacion = valorLote >= 40000000 ? 2000000 : 1000000;
  const cuotaInicial = valorLote * 0.25 - separacion;
  const financiado = valorLote * 0.7;
  const mensualidad = financiado / 35;
  const cuotaFinal = valorLote * 0.05;

  return {
    separacion,
    cuotaInicial,
    mensualidad,
    cuotaFinal,
  };
}

const boton = document.getElementById('calcular');
const inputLote = document.getElementById('lote');
const resultado = document.getElementById('resultado');

function renderResultado() {
  if (!inputLote || !resultado) return;

  const valorLote = Number(inputLote.value || 0);

  if (valorLote < 35000000) {
    resultado.innerHTML = 'Ingresa un valor de lote igual o superior a $35.000.000.';
    return;
  }

  const plan = calcularPlan(valorLote);

  resultado.innerHTML = `
    <p><strong>Separación:</strong> $${money.format(plan.separacion)}</p>
    <p><strong>Cuota inicial restante (25%):</strong> $${money.format(plan.cuotaInicial)}</p>
    <p><strong>35 cuotas (70%):</strong> $${money.format(Math.round(plan.mensualidad))}/mes</p>
    <p><strong>Cuota final (5%):</strong> $${money.format(plan.cuotaFinal)}</p>
  `;
}

if (boton) {
  boton.addEventListener('click', renderResultado);
}

if (inputLote) {
  inputLote.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      renderResultado();
    }
  });
}

renderResultado();
