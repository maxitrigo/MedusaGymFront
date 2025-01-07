import { useEffect, useState } from "react";
import { fetchUserReservations } from "../helpers/DataRequests";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReservationComponent: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const storedSlug = sessionStorage.getItem("slug");

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchUserReservations();
        setReservations(data);
      } catch (err) {
        setError("Hubo un error al cargar tus reservas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  if (loading) return <p>Cargando tus reservas...</p>;
  if (error) return <p>{error}</p>;

  const handleClick = () => {
    navigate(`/${storedSlug}/reservations`);
  };

  const filteredReservations = reservations.filter(
    (reservation) => reservation.status !== "Cancelled"
  );

  return (
    <div
      onClick={handleClick}
      className="w-full p-4 mt-2 text-zinc-300 bg-zinc-900 rounded-4xl"
    >
      <div className="flex justify-between items-center pb-4">
          <p className="font-bold text-lg px-2">Reservas</p>
        <div>
          <p className="text-xl text-zinc-200 rounded-full bg-background p-2">
            <FiArrowUpRight />
          </p>
        </div>
      </div>

        { filteredReservations.length === 0 ? (
        <p className="text-center">No tienes reservas actualmente.</p>
      ) : (
        <div className="w-full space-y-4">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="w-full flex justify-between items-center bg-zinc-800 p-4 rounded-3xl shadow-md hover:bg-zinc-700 transition-colors"
            >
              <div>
                <h3 className="text-lg font-bold text-[#e8ff21]">
                  {reservation.resource.name}
                </h3>
              </div>
              <div className="flex items-end space-x-2">
                <p className="text-sm">{reservation.day},</p>
                <p className="text-sm">
                  {reservation.time} <span className="font-semibold">Hs</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationComponent;
