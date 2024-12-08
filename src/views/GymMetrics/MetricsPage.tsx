import { useEffect, useState } from "react";
import { PaymentTypePieChart } from "../../components/PaymentTypePieChart";
import { getGymMetrics, getTransactions } from "../../helpers/DataRequests";
import { NavBar } from "../../components/NavBar";
import { SalesLineChart } from "../../components/SalesLineChart";
import { MetricsCard } from "../../components/MetricsCard";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonArmsUp } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function MetricsPage() {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);

  // Obtener la fecha de fin de la suscripción
  const subscriptionEnd = useSelector((state: any) => state.gym.subscriptionEnd);

  interface Metrics {
    totalIncome: number;
    activeMembersCount: number;
    mrr: number;
    incomePerUser: number;
  }

  useEffect(() => {
    // Verificar si la suscripción está activa
    const checkSubscription = () => {
      const currentDate = new Date();
      const subscriptionDate = new Date(subscriptionEnd);
      setIsSubscriptionActive(subscriptionDate > currentDate); // Si la fecha de la suscripción es mayor a hoy, está activa
    };

    checkSubscription(); // Comprobar la suscripción cuando el componente se monta

    // Si la suscripción está activa, obtener los datos
    if (isSubscriptionActive) {
      const fetchData = async () => {
        try {
          const transactionsData = await getTransactions();
          setTransactions(transactionsData);

          const metricsData = await getGymMetrics();
          setMetrics(metricsData);
        } catch (err) {
          console.error("Error fetching data", err);
        }
      };

      fetchData();
    }
  }, [subscriptionEnd, isSubscriptionActive]);

  const totalIncome = metrics?.totalIncome ? metrics.totalIncome.toFixed(2) : "0.00";
  const activeMembers = metrics?.activeMembersCount ?? "N/A";
  const mrr = metrics?.mrr ? metrics.mrr.toFixed(2) : "0.00";
  const incomePerUser = metrics?.incomePerUser ? metrics.incomePerUser.toFixed(2) : "0.00";
  const incomeIcon = <RiMoneyDollarCircleLine />;
  const membersIcon = <BsPersonArmsUp />;

  if (!isSubscriptionActive) {
    return (
      <div className="vertical-center mb-24 overflow-x-hidden">
        <NavBar />
        <div className="text-center text-white p-4">
          <h2>Tu suscripción ha caducado. Renueva para acceder a las metricas.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="vertical-center mb-24 overflow-x-hidden">
      <NavBar />
      <div className="w-screen flex flex-col">
        <div className="pl-4 pr-4 pt-4 lg:h-[500px] place-items-center grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="w-full h-full bg-zinc-900 rounded-4xl p-4">
            <SalesLineChart transactions={transactions} period="week" />
          </div>
          <div className="w-full h-full bg-zinc-900 rounded-4xl p-4">
            <SalesLineChart transactions={transactions} period="month" />
          </div>
        </div>
        <div className="p-4 place-items-center grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[500px]">
          <div className="w-full h-full vertical-center bg-zinc-900 rounded-4xl p-4">
            <SalesLineChart transactions={transactions} period="year" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 h-full w-full">
            <MetricsCard text={`$${totalIncome}`} title="Ingresos Totales Anuales" icon={incomeIcon} />
            <MetricsCard text={activeMembers} title="Miembros Activos" icon={membersIcon} />
            <MetricsCard text={`$${mrr}`} title="Promedio Mensual Anualizado" icon={incomeIcon} />
            <MetricsCard text={`$${incomePerUser}`} title="Ingresos por Miembro" icon={incomeIcon} />
          </div>
        </div>
      </div>
      <div className="w-screen">
        <div className="pl-4 pr-4 pt-2 place-items-center grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:h-[450px]">
          <div className="w-full h-full bg-zinc-900 rounded-4xl pb-4 pt-2 px-2">
            <PaymentTypePieChart transactions={transactions} period="Semanal" />
          </div>
          <div className="w-full h-full bg-zinc-900 rounded-4xl pb-4 pt-2 px-2">
            <PaymentTypePieChart transactions={transactions} period="Mensual" />
          </div>
          <div className="w-full h-full bg-zinc-900 rounded-4xl pb-4 pt-2 px-2">
            <PaymentTypePieChart transactions={transactions} period="Anual" />
          </div>
        </div>
      </div>
    </div>
  );
}
