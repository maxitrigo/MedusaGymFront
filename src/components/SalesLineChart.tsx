import { Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
);

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

  const filteredTransactions = transactions.filter(
    (t) => new Date(t.date) >= startDate
  );

  const grouped = filteredTransactions.reduce((acc, t) => {
    const dateKey =
      period === "year"
        ? new Date(t.date).toISOString().slice(0, 7) // YYYY-MM
        : new Date(t.date).toISOString().slice(0, 10); // YYYY-MM-DD
    acc[dateKey] = (acc[dateKey] || 0) + t.netAmount; // filtra los montos netos
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(grouped).sort();
  const data = labels.map((key) => grouped[key]);

  return { labels, data };
};

const calculateMonthlyVariation = (data: number[]) => {
  if (data.length < 2) return "0.00"; // Manejo para evitar errores
  const lastMonth = data[data.length - 2] || 0;
  const currentMonth = data[data.length - 1] || 0;
  const variation =
    lastMonth !== 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;
  return variation.toFixed(2);
};

export const SalesLineChart = ({
  transactions,
  period = "week",
}: {
  transactions: any[];
  period: "week" | "month" | "year";
}) => {
  const chartRef = useRef<any>(null);
  const { labels, data } = filterAndGroupTransactions(transactions, period);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(212, 255, 0, 0.15)");
      gradient.addColorStop(0.5, "rgba(212, 255, 0, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [chartRef, data]);

  const monthlyVariation =
    period === "year" ? calculateMonthlyVariation(data) : null;

  return (
    <div className="vertical-center w-full h-full min-h-[200px] max-h-[600px]">
      <div className="horizontal-between w-full pb-2">
        <div className="horizontal-center">
          <div className="p-4 rounded-full bg-background mr-4">
            <p className="text-3xl text-[#e8ff21]">
              <RiMoneyDollarCircleLine />
            </p>
          </div>
          <div className="text-zinc-200 text-md sm:text-xl font-bold italic">
            {period === "year"
              ? "Ingresos mensuales"
              : period === "month"
              ? "Ingresos diarios (último mes)"
              : "Ingresos diarios (última semana)"}
            {period === "year" && (<div className="text-3xl lg:text-4xl font-normal">${Number(data[data.length - 1]) || 0}</div>)}
          </div>
        </div>
        {period === "year" && (
          <div
            className={`text-center text-sm p-2 rounded-3xl vertical-center ${
              monthlyVariation && +monthlyVariation >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            <span>
              {monthlyVariation && +monthlyVariation >= 0 ? (
                <IoIosTrendingUp className="text-lg mr-1" />
              ) : (
                <IoIosTrendingDown className="text-lg mr-1" />
              )}
            </span>
            <span className="font-bold pr-1">
              {monthlyVariation && +monthlyVariation >= 0 && (
                <span className="text-sm">+</span>
              )}
              {monthlyVariation}%
            </span>
          </div>
        )}
      </div>
      <div className="h-full w-full">
        <Line
          ref={chartRef}
          data={{
            labels,
            datasets: [
              {
                data,
                borderColor: "#d4ff00",
                borderWidth: 2,
                pointRadius: 4,
                pointBorderWidth: 3,
                tension: 0.4,
                fill: true,
                pointHoverRadius: 10
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: {
                display: false
              }
            },
            scales: {
              x: {
                ticks: { color: "#E4E4E7" },
              },
              y: {
                beginAtZero: true,
                ticks: { color: "#E4E4E7" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
