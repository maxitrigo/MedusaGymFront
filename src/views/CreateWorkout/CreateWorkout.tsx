import { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { saveGymWorkout } from "../../helpers/DataRequests";

type DailyPlan = {
  day: number;
  dailyPlan: {
    name: string;
    video: string;
    variations?: string;
    sets?: number | null;
    reps?: number | null;
    duration?: number; // Segundos
    rest?: number | null; // Segundos
    weight?: string;
  }[];
};

const CreateWorkout = (userId: string) => {
  const location = useLocation();
  const { user } = location.state || {};
  const gymSlug = sessionStorage.getItem("slug");
  const navigate = useNavigate();
  const [dailyPlans, setDailyPlans] = useState<DailyPlan[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    video: "",
    variations: "",
    sets: null as number | null,
    reps: null as number | null,
    duration: "", // Queda vacío
    rest: "",
    weight: "",
  });

  const handleAddWorkout = () => {
    const restInSeconds = newWorkout.rest ? Number(newWorkout.rest) : 0;

    setDailyPlans((prevPlans) => {
      const updatedPlans = [...prevPlans];
      const dayPlan = updatedPlans.find((plan) => plan.day === selectedDay);

      if (dayPlan) {
        const isDuplicate = dayPlan.dailyPlan.some(
          (workout) => workout.name === newWorkout.name && workout.video === newWorkout.video
        );

        if (!isDuplicate) {
          dayPlan.dailyPlan.push({
            ...newWorkout,
            duration: 0, // Queda vacío
            rest: restInSeconds,
          });
        }
      } else {
        updatedPlans.push({
          day: selectedDay,
          dailyPlan: [{ ...newWorkout, duration: 0, rest: restInSeconds }],
        });
      }

      return updatedPlans;
    });

    setNewWorkout({
      name: "",
      video: "",
      variations: "",
      sets: null,
      reps: null,
      duration: "", // Queda vacío
      rest: "",
      weight: "",
    });
  };

  const handleDeleteWorkout = (day: number, index: number) => {
    setDailyPlans((prevPlans) =>
      prevPlans
        .map((plan) =>
          plan.day === day
            ? { ...plan, dailyPlan: plan.dailyPlan.filter((_, i) => i !== index) }
            : plan
        )
        .filter((plan) => plan.dailyPlan.length > 0) // Eliminamos días vacíos
    );
  };
  

  const handleSaveWorkouts = async () => {
    const formattedWorkouts = {
      type: "gimnasio_tradicional",
      level: "Principiante",
      dailyPlans: dailyPlans.map((plan) => ({
        day: plan.day,
        dailyPlan: plan.dailyPlan.map((workout: any) => ({
          name: workout.name,
          video: workout.video,
          variations: workout.variations || "",
          sets: workout.sets || 0,
          reps: workout.reps || 0,
          duration: 0, // Queda vacío
          rest: workout.rest || 0,
          weight: workout.weight || "",
        })),
      })),
      createdAt: new Date().toISOString(),
      user: user.id,
    };

    console.log("Resultado en formato Workout:", formattedWorkouts);
    const response = await saveGymWorkout(formattedWorkouts);

    if (response) {
      alert("Plan de entrenamiento guardado correctamente");
      navigate(`/${gymSlug}/dashboard`);
    }

  };

  return (
    <div className="p-2 text-center max-w-screen-md mx-auto pb-24">
        <NavBar/>
      <div className="p-4 bg-zinc-800 rounded-3xl">
        <h2 className="text-xl font-bold text-[#e8ff21]">Plan de Entrenamiento</h2>
        <div className="mb-4">
          <label className="text-zinc-200 mr-2">Seleccionar Día:</label>
          <select
            title="Seleccionar Día"
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            className="px-2 py-1 rounded-xl bg-zinc-700 text-zinc-200"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <option key={day} value={day}>
                Día {day}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Nombre del ejercicio"
            value={newWorkout.name}
            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
            className="px-2 py-1 rounded-xl bg-zinc-700 text-zinc-200 outline-none"
          />
          <input
            type="text"
            name="variations"
            placeholder="Variaciones"
            value={newWorkout.variations}
            onChange={(e) => setNewWorkout({ ...newWorkout, variations: e.target.value })}
            className="px-2 py-1 rounded-xl bg-zinc-700 text-zinc-200 outline-none"
          />
          <input
            type="number"
            name="sets"
            placeholder="Series"
            value={newWorkout.sets !== null ? newWorkout.sets : ""}
            onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value ? Number(e.target.value) : null })}
            className="px-2 py-1 rounded-xl bg-zinc-700 text-zinc-200 outline-none"
          />
          <input
            type="number"
            name="reps"
            placeholder="Repeticiones"
            value={newWorkout.reps !== null ? newWorkout.reps : ""}
            onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value ? Number(e.target.value) : null })}
            className="px-2 py-1 rounded-xl bg-zinc-700 text-zinc-200 outline-none"
          />
          <input
            type="number"
            name="rest"
            placeholder="Descanso (segundos)"
            value={newWorkout.rest}
            onChange={(e) => setNewWorkout({ ...newWorkout, rest: e.target.value })}
            className="px-2 py-1 rounded-xl bg-zinc-700 text-zinc-200 outline-none"
          />
          <button
            onClick={handleAddWorkout}
            className="bg-[#e8ff21] text-zinc-900 font-bold py-2 px-4 rounded-3xl clickable"
          >
            Agregar Ejercicio
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-[#e8ff21]">Plan de Entrenamiento</h2>
        {dailyPlans.map((plan) => (
          <div key={plan.day} className="mt-4">
            <h3 className="text-lg font-bold text-zinc-200">Día {plan.day}</h3>
            <div className="overflow-x-auto w-full rounded-2xl">
              <table className="table-auto overflow-hidden border-collapse w-full">
                <thead>
                  <tr className="bg-[#e8ff21] text-zinc-900">
                    <th className=" px-1 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                      EJERCICIO
                    </th>
                    <th className="px-1 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                      Series
                    </th>
                    <th className="px-1 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                      Reps
                    </th>
                    <th className="px-1 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                      Descanso
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {plan.dailyPlan.map((workout, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"}>
                      <td className="px-1 py-2 md:px-6 md:py-4 text-zinc-200 font-black italic">
                        {workout.name}
                        {workout.variations && ` (${workout.variations})`}
                      </td>
                      <td className="py-2 md:py-4 text-zinc-200 text-center font-black italic">
                        {workout.sets || 0}
                      </td>
                      <td className="py-2 md:py-4 text-zinc-200 text-center font-black italic">
                        {workout.reps || ""}
                      </td>
                      <td className="py-2 md:py-4 text-zinc-200 text-center font-black italic">
                        {workout.rest || ""}
                      </td>
                      <td className="py-2 md:py-4 text-center">
                        <button
                          onClick={() => handleDeleteWorkout(plan.day, index)}
                          className=""
                        >
                          <IoCloseCircleSharp className="text-red-500 clickable text-3xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSaveWorkouts}
        className="bg-[#e8ff21] text-zinc-900 font-bold py-2 px-4 rounded-3xl clickable mt-6 "
      >
        Guardar Plan
      </button>
    </div>
  );
};

export default CreateWorkout;