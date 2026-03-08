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
  const valorLote = Number(inputLote.value || 0);

  if (valorLote < 10000000) {
    resultado.innerHTML = 'Ingresa un valor de lote válido.';
    return;
  }

  const plan = calcularPlan(valorLote);

  resultado.innerHTML = `
    <p><strong>Separación:</strong> $${money.format(plan.separacion)}</p>
    <p><strong>Cuota inicial (25%):</strong> $${money.format(plan.cuotaInicial)}</p>
    <p><strong>35 cuotas (70%):</strong> $${money.format(Math.round(plan.mensualidad))}/mes</p>
    <p><strong>Cuota final (5%):</strong> $${money.format(plan.cuotaFinal)}</p>
  `;
}

boton.addEventListener('click', renderResultado);
renderResultado();
