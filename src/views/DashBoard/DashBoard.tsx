import { useSelector } from "react-redux";
import { AdminDashboard } from "../../components/AdminDashboards";
import { NavBar } from "../../components/NavBar";
import { UserDashboard } from "../../components/UserDashboard";
import { useEffect, useState } from "react";

export default function DashBoard() {
  const role = useSelector((state: any) => state.user.role);
  const subscriptionEnd = useSelector((state: any) => state.gym.subscriptionEnd); // Obtener fecha de finalización de suscripción
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);

  useEffect(() => {
    // Comprobar si la suscripción está activa
    const checkSubscription = () => {
      const currentDate = new Date();
      const subscriptionDate = new Date(subscriptionEnd);
      setIsSubscriptionActive(subscriptionDate > currentDate); // Si la fecha de la suscripción es mayor a hoy, está activa
    };

    checkSubscription(); // Comprobar la suscripción cuando el componente se monta
  }, [subscriptionEnd]);

  if (role === 'admin' && !isSubscriptionActive) {
    return (
      <div className="flex flex-col items-center h-full p-2 overflow-y-auto pb-24 max-w-[768px] m-auto">
        <NavBar />
        <div className="text-center text-white p-4">
          <h2>Tu suscripción ha caducado. Renueva para acceder al panel de administración.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full p-2 overflow-y-auto pb-24 max-w-[768px] m-auto">
      <NavBar />
      {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}