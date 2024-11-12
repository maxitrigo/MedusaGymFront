import { useEffect, useState } from "react";
import { getUserById } from "../helpers/DataRequests";

interface StreakDay {
  date: string;
  completed: boolean;
}

const WorkoutStreak = () => {
  const [streak, setStreak] = useState<StreakDay[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserById();

      const completedDates = user.trainingDates
        ? user.trainingDates.map((date: string) => ({
            date,
            completed: true,
          }))
        : []; // Si trainingDates es null, se asigna un array vacío


      const currentYear = new Date().getFullYear();
      const fullYearStreak: StreakDay[] = [];

      // Generar todos los días del año
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(currentYear, month + 1, 0).getDate(); // Número de días en el mes

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${currentYear}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const isCompleted = completedDates.some(
            (completedDate: any) => completedDate.date === dateStr
          );

          fullYearStreak.push({ date: dateStr, completed: isCompleted });
        }
      }

      setStreak(fullYearStreak);
    };

    fetchUserData();
  }, []);

  const getColor = (completed: boolean): string => {
    return completed ? "bg-green-300" : "bg-red-300";
  };

  // Agrupar los días en semanas de 7 días
  const weeks = [];
  for (let i = 0; i < streak.length; i += 7) {
    weeks.push(streak.slice(i, i + 7));
  }


  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-16 text-white font-bold">
        <div>Ene</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Abr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Ago</div>
        <div>Set</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dic</div>
      </div>
      <div className="flex space-x-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {week.map((streakDay) => (
              <div
                key={streakDay.date}
                className={`w-4 h-4 rounded ${getColor(streakDay.completed)}`}
                title={streakDay.date}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutStreak;
