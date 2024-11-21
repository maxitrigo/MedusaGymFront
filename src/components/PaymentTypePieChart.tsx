import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const filterTransactionsByDate = (transactions: any[], period: "Semanal" | "Mensual" | "Anual") => {
  const now = new Date();
  const startDate = new Date();

  if (period === "Semanal") {
    startDate.setDate(now.getDate() - 7);
  } else if (period === "Mensual") {
    startDate.setMonth(now.getMonth() - 1);
  } else if (period === "Anual") {
    startDate.setFullYear(now.getFullYear() - 1);
  }

  return transactions.filter((t) => new Date(t.date) >= startDate);
};

const paymentTypeColors: Record<string, string> = {
    "efectivo": "#4fc969",
    "mercado_pago": "#FFCE56",
    "tarjeta_debito": "#9a36eb",
    "tarjeta_credito": "#ac65e6",
    "transferencia": "#36A2EB",
};

export const PaymentTypeBarChart = ({
  transactions,
  period = "Semanal", // Puede ser "Semanal", "Mensual" o "Anual"
}: {
  transactions: any[];
  period: "Semanal" | "Mensual" | "Anual";
}) => {
  const filteredTransactions = filterTransactionsByDate(transactions, period);

  const groupedByPaymentType = filteredTransactions.reduce((acc, t) => {
    acc[t.paymentType] = (acc[t.paymentType] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(groupedByPaymentType);
  const data = Object.values(groupedByPaymentType);

  const backgroundColors = labels.map((label) => paymentTypeColors[label] || "#CCCCCC"); // Color por defecto si no está definido.

  return (
    <div className="vertical-center" style={{ width: "100%", height: "250px" }}>
      <Bar
        data={{
          labels, // Las etiquetas serán los tipos de pago
          datasets: [
            {
              label: `Monto por Tipo de Pago (${period})`,
              data, // Los valores correspondientes a cada tipo de pago
              backgroundColor: backgroundColors, // Colores para cada barra
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: `Monto por Tipo de Pago (${period})`,
              font: { size: 12 },
            },
            legend: {
              labels: {
                font: { size: 10 },
                usePointStyle: true,
              },
            },
          },
          scales: {
            x: {
              // Configuración del eje X para mostrar las etiquetas correctamente
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true, // El eje Y comienza desde 0
              grid: {
                display: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

