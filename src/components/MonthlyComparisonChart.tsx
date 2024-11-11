import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Datos de ejemplo para los 12 meses del año
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Entrenamientos Completados',
      data: [20, 18, 22, 25, 23, 19, 27, 30, 28, 26, 24, 29], // Datos mensuales
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      borderRadius: 10,
    },
  ],
};

// Configuración del gráfico
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    labels: {
        color: 'white',
    },
    font: {
        size: 16
    },
    title: {
      display: true,
      text: 'Entrenamientos Completados por Mes',
    },
  },
};

const MonthlyComparisonChart: React.FC = () => {
  return (
    <div className='w-full'>
        <Bar data={monthlyData} options={options} />;
    </div>
)
};

export default MonthlyComparisonChart;
