import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

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

export const PaymentTypePieChart = ({
  transactions,
  period = "Semanal", // Puede ser "week", "month" o "year"
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
    <div style={{ width: "100%", height: "250px" }}>
      <Pie
        data={{
          labels,
          datasets: [
            {
              label: `Monto por Tipo de Pago (${period})`,
              data,
              backgroundColor: backgroundColors,
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
        }}
      />
    </div>
  );
};
