import React, { useEffect, useState } from "react";
import { cancelReservation, fetchUserReservations } from "../helpers/DataRequests";

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleCancel = async (reservationId: string) => {
    try {
        await cancelReservation(reservationId)
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
    
  }

  return (
    <div className="max-w-full px-4 py-6 text-zinc-300 bg-zinc-900 m-4 rounded-3xl mb-24">
      {reservations.length === 0 ? (
        <p className="text-center">No tienes reservas actualmente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reservations.filter((reservation) => reservation.status !== 'Cancelled').length > 0 ? (
            reservations
                .filter((reservation) => reservation.status !== 'Cancelled')
                .map((reservation) => (
                <div
                    key={reservation.id}
                    className="bg-background p-6 rounded-3xl shadow-md flex justify-between items-center"
                >
                    <div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-[#e8ff21]">
                        {reservation.resource.name}
                        </h3>
                    </div>
                    <div className="mt-4 text-center space-y-2">
                        <p>
                        <span className="font-semibold">Día:</span> {reservation.day}
                        </p>
                        <p>
                        <span className="font-semibold">Hora:</span> {reservation.time}
                        </p>
                    </div>
                    </div>
                    <div className="text-center">
                    <button
                        onClick={() => handleCancel(reservation.id)}
                        className="bg-red-500 py-2 px-2 rounded-3xl font-bold mt-2 clickable"
                    >
                        Cancelar
                    </button>
                    </div>
                </div>
                ))
            ) : (
            <p className="text-center">No tienes reservas actualmente.</p>
            )}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
