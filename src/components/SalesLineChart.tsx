import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const filterAndGroupTransactions = (
  transactions: any[],
  period: "week" | "month" | "year"
) => {
  const now = new Date();
  const startDate = new Date();

  if (period === "week") {
    startDate.setDate(now.getDate() - 7);
  } else if (period === "month") {
    startDate.setMonth(now.getMonth() - 1);
  } else if (period === "year") {
    startDate.setFullYear(now.getFullYear() - 1);
  }

  const filteredTransactions = transactions.filter((t) => new Date(t.date) >= startDate);

  const grouped = filteredTransactions.reduce((acc, t) => {
    const dateKey =
      period === "year"
        ? new Date(t.date).toISOString().slice(0, 7) // YYYY-MM para meses
        : new Date(t.date).toISOString().slice(0, 10); // YYYY-MM-DD para días
    acc[dateKey] = (acc[dateKey] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(grouped).sort(); // Asegurar orden cronológico
  const data = labels.map((key) => grouped[key]);

  return { labels, data };
};

export const SalesLineChart = ({
  transactions,
  period = "week", // Puede ser "week", "month" o "year"
}: {
  transactions: any[];
  period: "week" | "month" | "year";
}) => {
  const { labels, data } = filterAndGroupTransactions(transactions, period);

  return (
    <div className="vertical-center w-full min-h-[200px]">
      <Line
        data={{
          labels,
          datasets: [
            {
              label:
                period === "year"
                  ? "Ventas mensuales"
                  : "Ventas diarias",
              data,
              borderColor: "rgba(75,192,192,1)", // Color de la línea
              backgroundColor: "rgba(75,192,192,0.2)", // Relleno debajo de la línea
              tension: 0.4, // Suavizado de la línea
              pointRadius: 10, // Ocultar los puntos
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text:
                period === "year"
                  ? "Ventas mensuales (último año)"
                  : period === "month"
                  ? "Ventas diarias (último mes)"
                  : "Ventas diarias (última semana)",
              font: { size: 14 },
            },
            legend: {
              display: false, // Ocultar la leyenda
            },
            datalabels: {
              display: false, // Desactivar los valores sobre los puntos
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: period === "year" ? "Meses" : "Días",
              },
            },
            y: {
              title: {
                display: true,
                text: "Monto $",
              },
              beginAtZero: true, // Asegurar que el eje comience en 0
            },
          },
        }}
      />
    </div>
  );
};
