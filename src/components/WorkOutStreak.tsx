import React from 'react';

interface StreakDay {
  date: string;
  completed: boolean;
}

interface WorkoutStreakProps {
  streak: StreakDay[];
}

const WorkoutStreak: React.FC<WorkoutStreakProps> = ({ streak }) => {
  const getColor = (completed: boolean): string => {
    if (completed) return 'bg-green-300'; // Si está completo, verde fuerte
    return 'bg-red-300'; // Si no está completo, gris
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


