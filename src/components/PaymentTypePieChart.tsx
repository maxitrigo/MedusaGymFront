import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

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
  "Efectivo": "#4CAF50",
  "Mercado Pago": "#0079C1",
  "Visa Debito": "#F7B600",
  "Visa Credito": "#1A1F71",
  "Master Debito": "#F79E1B",
  "Maestro Debito": "#7375CF",
  "OCA Credito": "#00AEEF",
  "Otras Credito": "#9E9E9E",
  "AMEX Credito": "#016FD0",
  "Master Credito": "#EB001B",
  "Transferencia": "#27ae60"
};

export const PaymentTypeBarChart = ({
  transactions,
  period = "Semanal",
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

  const backgroundColors = labels.map((label) => paymentTypeColors[label] || "#CCCCCC");

  return (
    <div className="vertical-center w-full min-h-[200px]">
      <Bar
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
              display: false,
              position: "right",
            },
            datalabels: {
              display: true,
              color: "#D8D8D8",
              align: "center",
              anchor: "center",
              rotation: -90,
              font: {
                family: "Nunito Sans",
                style: "italic",
                weight: 900,
                size: 10,
              },
              formatter: (value, context) => {
                const labelIndex = context.dataIndex;
                return labels[labelIndex] || ""; // Asegurarse de no acceder a índices fuera del rango
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: { size: 10 },
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};
