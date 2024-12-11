import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// Registra todos los elementos necesarios
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement, ChartDataLabels);

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
  "Efectivo": "rgba(76, 175, 80, 0.6)", // #4CAF50
  "Mercado Pago": "rgba(0, 121, 193, 0.6)", // #0079C1
  "Visa Debito": "rgba(247, 182, 0, 0.6)", // #F7B600
  "Visa Credito": "rgba(26, 31, 113, 0.6)", // #1A1F71
  "Master Debito": "rgba(247, 158, 27, 0.6)", // #F79E1B
  "Maestro Debito": "rgba(115, 117, 207, 0.6)", // #7375CF
  "OCA Credito": "rgba(0, 174, 239, 0.6)", // #00AEEF
  "Otras Credito": "rgba(158, 158, 158, 0.6)", // #9E9E9E
  "AMEX Credito": "rgba(1, 111, 208, 0.6)", // #016FD0
  "Master Credito": "rgba(235, 0, 27, 0.6)", // #EB001B
  "Transferencia": "rgba(39, 174, 96, 0.6)" // #27ae60
};



export const PaymentTypePieChart = ({
  transactions,
  period = "Semanal",
}: {
  transactions: any[];
  period: "Semanal" | "Mensual" | "Anual";
}) => {
  const filteredTransactions = filterTransactionsByDate(transactions, period);
  
  const groupedByPaymentType = filteredTransactions.reduce((acc, t) => {
    acc[t.paymentType] = (acc[t.paymentType] || 0) + t.netAmount; // filtro por total neto
    return acc;
  }, {} as Record<string, number>);
  
  const labels = Object.keys(groupedByPaymentType);
  const data = Object.values(groupedByPaymentType);
  
  const backgroundColors = labels.map((label) => paymentTypeColors[label] || "#CCCCCC");
  
  const borderColors = labels.map((label) => {
    // Calcula un color más oscuro o claro del color de fondo para el borde
    const rgba = paymentTypeColors[label] || "rgba(204, 204, 204, 0.5)";
    return rgba.replace(/0\.6\)$/, "1)"); // Cambia la opacidad a 1 (sin transparencia)
  });

  return (
    <div className="vertical-center w-full h-full max-h-[600px] min-h-[300px]">
      <div className="flex items-center w-full p-4">
        <p className="text-3xl text-[#e8ff21] bg-background rounded-full p-4 mr-4"><RiMoneyDollarCircleLine /></p>
        <p className="font-bold italic text-xs lg:text-sm text-zinc-400 p-2">Monto por Tipo de Pago ({period})</p>
      </div>
      <div className="max-h-[600px] h-full w-full">
      <Pie
  data={{
    labels,
    datasets: [
      {
        label: `Monto por Tipo de Pago (${period})`,
        data,
        backgroundColor: backgroundColors,
        borderWidth: 0,
        offset: 20,
        hoverOffset: 40,
        hoverBorderWidth: 3,
        hoverBorderColor: "rgba(212, 255, 0)",
        hoverBackgroundColor: borderColors,
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: `Monto por Tipo de Pago (${period})`,
        font: { size: 12 },
        color: "#ffffff",
      },
      legend: {
        labels: {
          font: { size: 12 },
          usePointStyle: true,
          color: "#E4E4E7",
        },
        display: true,
        position: "right",
      },
      datalabels: {
        display: false,
        color: "#E4E4E7",
        font: {
          family: "Nunito Sans",
          style: "italic",
          weight: 900,
          size: 10,
        },
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
    layout: {
      padding: {
        top: 10,    // Padding en la parte superior
        right: 0,  // Padding en el lado derecho
        bottom: 10, // Padding en la parte inferior
        left: 10,   // Padding en el lado izquierdo
      },
    },
  }}
/>

      </div>
    </div>
  );
};
