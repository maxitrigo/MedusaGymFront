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
    <div className="vertical-center" style={{ width: "100%", height: "250px" }}>
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
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.3,
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
              labels: {
                font: { size: 10 },
              },
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
            },
          },
        }}
      />
    </div>
  );
};
