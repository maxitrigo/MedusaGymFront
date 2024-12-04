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
  Filler
} from "chart.js";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

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

const calculateMonthlyVariation = (data: number[]) => {
  const lastMonth = data[data.length - 2] || 0; // Penúltimo mes
  const currentMonth = data[data.length - 1] || 0; // Último mes
  const variation =
    lastMonth !== 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;
  return variation.toFixed(2); // Redondear a 2 decimales
};

export const SalesLineChart = ({
  transactions,
  period = "week", // Puede ser "week", "month" o "year"
}: {
  transactions: any[];
  period: "week" | "month" | "year";
}) => {
  const chartRef = useRef<any>(null); // Referencia al gráfico
  const { labels, data } = filterAndGroupTransactions(transactions, period);

  // Agregar listener para manejar redimensionamiento
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.resize(); // Forzar redimensionamiento
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const monthlyVariation = period === "year" ? calculateMonthlyVariation(data) : null

  return (
    <div className="vertical-center w-full h-full min-h-[200px] max-h-[600px]">
      <div className="horizontal-between w-full pb-2">

        <div className="horizontal-center">
          <div className="p-4 rounded-full bg-background mr-4">
            <p className="text-3xl text-green-500"><RiMoneyDollarCircleLine /></p>
          </div>
          <p className="text-zinc-400 text-xl font-bold italic">{period === "year"
                    ? "Ventas mensuales"
                    : period === "month"
                    ? "Ventas diarias (último mes)"
                    : "Ventas diarias (última semana)"}</p>
        </div>
      {period === "year" && (
        <div
          className={`text-center text-xs p-2 rounded-3xl horizontal-center ${
            monthlyVariation && +monthlyVariation >= 0
              ? "bg-green-900 text-green-400 border border-green-500"
              : "bg-red-900 text-red-400 border border-red-500"
          }`}
        >
          <span>
            {monthlyVariation && +monthlyVariation >= 0 ? <BsArrowUpShort className="text-2xl" /> : <BsArrowDownShort className="text-2xl" />}
          </span>
          <span className="font-bold pr-1">
            {monthlyVariation && +monthlyVariation >= 0 && <span className="text-sm">+</span> }
            {monthlyVariation}%
          </span>
        </div>
      )}

      </div>
      <div className="h-full w-full">
        <Line
          ref={chartRef} // Asigna el ref al gráfico
          data={{
            labels,
            datasets: [
              {
                data,
                borderColor: "rgba(75,192,192,1)", // Color de la línea
                backgroundColor: "rgba(75,192,192,0.1)", // Relleno debajo de la línea
                tension: 0.4, // Suavizado de la línea
                // pointRadius: 0, // Ocultar los puntos
                fill: 'origin'
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false,
                text:
                period === "year"
                    ? "Ventas mensuales (último año)"
                    : period === "month"
                    ? "Ventas diarias (último mes)"
                    : "Ventas diarias (última semana)",
                font: { size: 14 },
                color: "#E4E4E7",
              },
              legend: {
                display: false, // Ocultar la leyenda
              },
              datalabels: {
                anchor: "end",
                align: "end",
                display:false,
                color: "#E4E4E7",
              },
              filler: {
                propagate: true
              }
            },
            scales: {
              x: {
                title: {
                  display: false,
                  text: period === "year" ? "Meses" : "Días",
                  color: "#E4E4E7",
                },
              },
              y: {
                title: {
                  display: false,
                  text: "Monto $",
                  color: "#E4E4E7",
                },
                beginAtZero: true, // Asegurar que el eje comience en 0
                ticks: {
                  padding: 0,
                }
              },
            },
          }}
          />
        </div>
    </div>
  );
};
