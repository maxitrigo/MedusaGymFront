import { useState } from "react"
import { getBodyWeightWorkout, getCrossfitWorkout, getFunctionalWorkout, getGymWorkout, saveGymWorkout } from "../helpers/DataRequests"
import { WorkoutContainer } from "./WorkoutContainer"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"

export const Workouts = () => {
    const [functional, setFunctional] = useState([])
    const [bodyWeight, setBodyWeight] = useState([])
    const [crossfit, setCrossfit] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [bodyWeightWarmUps, setBodyWeightWarmUps] = useState([])
    const [functionalWarmUps, setFunctionalWarmUps] = useState([])
    const [crossfitWarmUps, setCrossfitWarmUps] = useState([])
    const [goal, setGoal] = useState('')
    const [frequency, setFrequency] = useState(1)
    const [isOpen, setIsOpen] = useState({
        functional: false,
        bodyWeight: false,
        crossfit: false,
        weightLifting: false,
        arrowFunctional: <MdKeyboardArrowRight />,
        arrowBodyWeight: <MdKeyboardArrowRight />,
        arrowCrossfit: <MdKeyboardArrowRight />,
        arrowWeightLifting: <MdKeyboardArrowRight />,
    })

    const handleFunctional = async () => {
        const level = sessionStorage.getItem('level') as string
        const response = await getFunctionalWorkout( level )
        const workout = response[0].exercises
        const warmUp = response[0].warmUp
        setFunctional(workout)
        setFunctionalWarmUps(warmUp)
        setIsOpen({...isOpen, functional: true, arrowFunctional: isOpen.functional ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})
    }

    const handleBodyWeight = async () => {
        const level = sessionStorage.getItem('level') as string
        const response = await getBodyWeightWorkout( level )
        const workout = response[0].exercises
        const warmUp = response[0].warmUp
        setBodyWeightWarmUps(warmUp)
        setBodyWeight(workout)
        setIsOpen({...isOpen, bodyWeight: true, arrowBodyWeight: isOpen.functional ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})
    }

    const handleCrossfit = async () => {
        const level = sessionStorage.getItem('level') as string
        const response = await getCrossfitWorkout( level )
        const workout = response[0].exercises
        const warmUp = response[0].warmUp
        setCrossfitWarmUps(warmUp)
        setCrossfit(workout)
        setIsOpen({...isOpen, crossfit: true, arrowCrossfit: isOpen.functional ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})
    }

    const handleWeightLifting = async () => {
        const level = sessionStorage.getItem('level') as string
        const response = await getGymWorkout( level, goal, frequency )
        const workout = response
        setWorkouts(workout)
        setIsOpen({...isOpen, weightLifting: true, arrowWeightLifting: isOpen.functional ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})
    }


    const handleSaveRoutine = async () => {
        const level = sessionStorage.getItem('level') as string
        const workout = workouts
        const response = await saveGymWorkout({
            dailyPlans: workout, 
            level, 
            type: 'gimnasio_tradicional'
        })
        console.log(response);
        sessionStorage.removeItem("userRoutines")
        window.location.reload()
    }

    return (
        <div className="w-full">
            <div className="mb-4 bg-zinc-900 text-zinc-200 rounded-3xl mt-4 cursor-pointer" onClick={() => setIsOpen({...isOpen, functional: !isOpen.functional, arrowFunctional: isOpen.functional ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})}>
                <div className="horizontal-between cursor-pointer px-6 py-3">
                    <p className="font-black text-xl italic">Entrenamiento Funcional</p>
                    <div className="text-2xl">
                        {isOpen.arrowFunctional}
                    </div>
                </div>
                {isOpen.functional &&
                <div>
                    <div className="w-full">
                        <WorkoutContainer WorkoutsArray={functionalWarmUps} />
                        <WorkoutContainer WorkoutsArray={functional} />
                    </div>
                    <div className="vertical-center mt-4 pb-4">
                        <button className="button-form-primary" onClick={handleFunctional}>Generar Rutina</button>
                    </div>
                </div>
                }
            </div>
            <div className="mb-4 bg-zinc-900 text-zinc-200 rounded-3xl mt-4 cursor-pointer" onClick={() => setIsOpen({...isOpen, bodyWeight: !isOpen.bodyWeight, arrowBodyWeight: isOpen.bodyWeight ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})}>
                <div className="horizontal-between cursor-pointer px-6 py-3">
                    <p className="font-black text-xl italic">Body Weight WOD</p>
                    <div className="text-2xl">
                        {isOpen.arrowBodyWeight}
                    </div>
                </div>
                {isOpen.bodyWeight &&
                <div>
                    <WorkoutContainer WorkoutsArray={bodyWeightWarmUps} />
                    <WorkoutContainer WorkoutsArray={bodyWeight} />
                    <div className="vertical-center mt-2 pb-4">
                    <button className="button-form-primary" onClick={handleBodyWeight}>Generar Rutina</button>
                    </div>

                </div>
                }
            </div>
            <div className="mb-4 bg-zinc-900 text-zinc-200 rounded-3xl mt-4 cursor-pointer" onClick={() => setIsOpen({...isOpen, crossfit: !isOpen.crossfit, arrowCrossfit: isOpen.crossfit ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})}>
                <div className="horizontal-between cursor-pointer px-6 py-3">
                    <p className="font-black text-xl italic">Crossfit WOD</p>
                    <div className="text-2xl">
                        {isOpen.arrowCrossfit}
                    </div>
                </div>
                {
                    isOpen.crossfit &&
                    <div>
                        <WorkoutContainer WorkoutsArray={crossfitWarmUps} />
                        <WorkoutContainer WorkoutsArray={crossfit} />
                        <div className="vertical-center mt-2 pb-4">
                        <button className="button-form-primary" onClick={handleCrossfit}>Generar Rutina</button>
                        </div>
                    </div>
                }
            </div>
            <div className="mb-4 bg-zinc-900 text-zinc-200 rounded-3xl mt-4 cursor-pointer" >
                <div className="horizontal-between cursor-pointer px-6 py-3" onClick={() => setIsOpen({...isOpen, weightLifting: !isOpen.weightLifting, arrowWeightLifting: isOpen.weightLifting ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />})}>
                    <p className="font-black text-xl italic">Weight Lifting</p>
                    <div className="text-2xl">
                        {isOpen.arrowWeightLifting}
                    </div>

                </div>
                {isOpen.weightLifting &&
                <div>
                    <div className="p-4">
                        <label htmlFor="goal" className="block mb-2 text-sm font-medium">Selecciona tu objetivo</label>
                        <select name="goal" id="goal" title="goal" className="block w-full px-4 py-2 text-sm text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-2xl focus:ring-2 focus:ring-zinc-500 focus:outline-none mb-4" onChange={(e) => setGoal(e.target.value)}>
                            <option value="">Selecciona una opción</option>
                            <option value="definicion muscular">Definicion muscular</option>
                            <option value="hipertrofia">Hipertrofia</option>
                            <option value="resistencia muscular">Resistencia muscular</option>
                            <option value="entrenamiento de fuerza">Entrenamiento de fuerza</option>
                        </select>
                        <label htmlFor="frequency" className="block mb-2 text-sm font-medium">Selecciona la frecuencia semanal de entrenamiento</label>
                        <select name="frequency" id="frequency" className="block w-full px-4 py-2 text-sm text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-2xl focus:ring-2 focus:ring-zinc-500 focus:outline-none mb-4" onChange={(e) => setFrequency(parseInt(e.target.value))}>
                            <option value="">Selecciona una opción</option>
                            <option value="1">1 vez por semana</option>
                            <option value="2">2 veces por semana</option>
                            <option value="3">3 veces por semana</option>
                            <option value="4">4 veces por semana</option>
                            <option value="5">5 veces por semana</option>
                            <option value="6">6 veces por semana</option>
                        </select>
                    </div>

                <div className="vertical-center">
                    <button className="button-form-primary mb-4" onClick={handleWeightLifting}>Generar Rutina</button>
                </div>
                {workouts.map((workout: any, index) =>
                    <div key={index} className="mb-2">
                        <p className="mb-2 text-xl vertical-center font-black italic">Rutina del Dia {workout.day}</p>
                        <WorkoutContainer WorkoutsArray={workout.dailyPlan}/>
                    </div>
                )}
                {workouts.length === 0 ? <p className="mb-2 text-xl vertical-center font-black italic"></p> : 
                <div className="vertical-center">
                    <button className="button-form-primary mb-4" onClick={handleSaveRoutine}>Guardar Rutina</button>
                </div>
                }
                </div>
                }
            </div>
        </div>
    )
}