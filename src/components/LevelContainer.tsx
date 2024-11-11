import { useState, useEffect } from "react";
import { GoNorthStar } from "react-icons/go";

type LevelContainerProps = {
  points: number;
};

export default function LevelContainer({ points }: LevelContainerProps) {
  const [level, setLevel] = useState('');
  const [sublevel, setSublevel] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [textColor, setTextColor] = useState('text-black');
  const [stripeBg, setStripeBg] = useState('bg-background');

  // Función para asignar nivel y subnivel en base a los puntos
  useEffect(() => {
    let levelAssigned = '';
    let sublevelAssigned = 0;

    // Determinar el nivel y subnivel
    if (points < 100) {
      levelAssigned = 'Principiante';
      sublevelAssigned = Math.floor(points / 25) + 1; // 4 subniveles, 25 puntos por subnivel
    } else if (points >= 100 && points < 200) {
      levelAssigned = 'Novato';
      sublevelAssigned = Math.floor((points - 100) / 20) + 1;
    } else if (points >= 200 && points < 300) {
      levelAssigned = 'Intermedio';
      sublevelAssigned = Math.floor((points - 200) / 20) + 1;
    } else if (points >= 300 && points < 400) {
      levelAssigned = 'Avanzado';
      sublevelAssigned = Math.floor((points - 300) / 20) + 1;
    } else if (points >= 500 && points < 600) {
      levelAssigned = 'Maestro';
      sublevelAssigned = Math.floor((points - 400) / 50) + 1;
    } else if (points >= 600) {
      levelAssigned = 'Experto';
      sublevelAssigned = Math.floor((points - 600) / 50) + 1;
    }

    // Solo actualizamos el estado si el valor cambia
    if (levelAssigned !== level) {
      setLevel(levelAssigned);
    }
    if (sublevelAssigned !== sublevel) {
      setSublevel(sublevelAssigned);
    }

    // Asignar el color de fondo
    switch (levelAssigned) {
      case 'Principiante':
        setBackgroundColor('bg-white');
        break;
      case 'Novato':
        setBackgroundColor('gradiente-azul');
        setTextColor('text-white');
        break;
      case 'Intermedio':
        setBackgroundColor('gradiente-violeta');
        setTextColor('text-white');
        break;
      case 'Avanzado':
        setBackgroundColor('gradiente-marron text-white');
        setTextColor('text-white');
        break;
      case 'Maestro':
        setBackgroundColor('gradiente-negro text-white');
        setTextColor('text-white');
        setStripeBg('bg-red-500');
        break;
      case 'Experto':
        setBackgroundColor('gradiente-rojo text-white');
        setTextColor('text-white');
        break;
      default:
        setBackgroundColor('bg-white'); // Un valor por defecto
        setTextColor('text-black');
    }
  }, [points, level, sublevel]); // Dependencia de puntos, nivel y subnivel

  const renderSublevels = () => {
    const sublevelElements = [];
    for (let i = 1; i < sublevel; i++) {
      sublevelElements.push(<div key={i} className="w-1 h-full bg-white mr-2"></div>);
    }
    return sublevelElements;
  };

  return (
    <div className={`flex justify-between rounded-4xl ${backgroundColor} mt-4 mb-4 w-full`}>
      <div className="flex items-center w-1/2 p-1">
        <div className="text-white rounded-full bg-background p-2 text-xl mr-4">
            <GoNorthStar />
        </div>
        <p className={`${textColor} text-black text-xl font-semibold`}>{level}</p>
      </div>
      <div className={`${stripeBg} w-20 flex px-2`}>
        {/* Mostrar el número de subniveles como divs blancos */}
        {renderSublevels()}
      </div>
      <div className="w-5"></div>
    </div>
  );
}
