import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WorkoutContainer } from "../../components/WorkoutContainer";
import { deleteWorkout } from "../../helpers/DataRequests";


export const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gymSlug }: any = useParams();
  const { user } = location.state || {};

  const handleRoutine = (user: any) => {
    navigate(`/${gymSlug}/create-workout`, { state: { user } });
  };
  const [routines, setRoutines] = useState<any[]>([]);

  useEffect(() => {
    if (user.workouts.length > 0) {
      setRoutines(user.workouts)
    }

  },[user])

  const handleDelete = async (id: string) => {
    const response = await deleteWorkout(id);
    if (response) {
      alert("Rutina eliminada con exito!");
      navigate(`/${gymSlug}/dashboard`);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {user ? (
        <div className="rounded-3xl p-2 max-w-md sm:max-w-full">
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#e8ff21] text-zinc-900 w-24 h-24 flex items-center justify-center rounded-full text-4xl font-bold">
              {user.name[0]}
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-zinc-200">
              {user.name}
            </h1>
            <p className="text-zinc-200 text-sm">
              Estado:{" "}
              <span
                className={`font-medium ${
                  user.status === "active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status === "active" ? "Activo" : "Inactivo"}
              </span>
            </p>
          </div>

          <div className="mt-6 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 rounded-3xl shadow-sm">
                <p className="text-sm text-zinc-200">Pases</p>
                <p className="text-lg font-medium text-zinc-200">
                  {user.freePass ? "Ilimitados" : user.admissions}
                </p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-3xl shadow-sm">
                <p className="text-sm text-zinc-200">Suscripcion</p>
                <p className="text-lg font-medium text-zinc-200">
                    {new Date(user.subscriptionEnd).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-zinc-900 rounded-3xl shadow-sm">
              <p className="text-sm text-zinc-200">Ultimo Entrenamiento</p>
              <p className="text-lg font-medium text-zinc-200">
                {user.trainingDates?.length
                  ? new Date(user.trainingDates.at(-1)).toLocaleDateString("es-ES")
                  : "No hay registros"}
              </p>
            </div>

          </div>
          <div className="lg:grid grid-cols-2 gap-4">
                  {routines.length > 0 && (
                    routines.map((routine: any, index) => (
            <div key={routine.id}>
              <h2 className="text-lg font-black italic text-[#e8ff21] mt-4 pr-4 horizontal-end">
                Rutina {index + 1}
              </h2>
              {routine.dailyPlans.map((day: any, dayIndex: number) => (
                <div key={`${routine.id}-${dayIndex}`}>
                  <h3 className="text-md font-bold italic text-[#e8ff21] mb-4 pr-4 horizontal-end">
                    Día {dayIndex + 1}
                  </h3>
                  <div className="rounded-3xl overflow-hidden mb-4">
                    <WorkoutContainer WorkoutsArray={day.dailyPlan} />
                  </div>
                </div>
              ))}
              {/* Botón para eliminar esta rutina semanal */}
              <div className="vertical-center mt-4">
                <button onClick={() => handleDelete(routine.id)} className="button-delete">
                  Eliminar Rutina {index + 1}
                </button>
              </div>
            </div>
          ))
        )}
        </div>

          <div >
            <button onClick={() => handleRoutine(user)} className="mt-6 w-full bg-[#e8ff21] hover:bg-white text-zinc-800 py-2 px-4 rounded-3xl transition-colors">Crear Rutina</button>
          </div>


          <button
            className="mt-6 w-full border border-[#e8ff21] hover:bg-white text-[#e8ff21] py-2 px-4 rounded-3xl transition-colors"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No se encontró información del usuario.</p>
      )}
    </div>
  );
};
