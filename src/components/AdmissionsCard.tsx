import { useSelector } from "react-redux";

export const AdmissionsCard = () => {
    const freePass = useSelector((state: any) => state.gymUser.freePass);
    const admissions = useSelector((state: any) => state.gymUser.admissions);
    const subscriptionEnd = useSelector((state: any) => state.gymUser.subscriptionEnd);


    const formatedDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

    
    const compareDates = (dateString: string) => {
        const dateNow = new Date();
        const dateEnd = new Date(dateString);
        if (dateNow > dateEnd || !dateString ) {
        return (
                <p className="text-black font-bold">{!dateString ? "No tienes suscripcion" : `Tu suscripcion vencio el ${formatedDate(subscriptionEnd)}`}</p>
        )
    }
}

    return (
        <div className={compareDates(subscriptionEnd) ? "rojo-pastel rounded-4xl p-4 mt-4 w-full space-y-2" : "verde-pastel rounded-4xl p-4 mt-4 w-full space-y-2"}>
            {admissions ? (<p className="font-semibold text-2xl">Ingresos Disponibles: {admissions}</p>) : (<p></p>)}
            {freePass ? (<p
            className="font-semibold text-xl">Tienes ingresos infinitos gracias a tu suscripcion 🌟</p>) : (<p></p>)}
            {compareDates(subscriptionEnd) ? (compareDates(subscriptionEnd)) : (<p className="font-semibold">Tu suscripcion termina el {formatedDate(subscriptionEnd)}</p>)}
            {!freePass && !admissions ? (<p className="font-semibold">No tienes mas ingresos</p>) : (<p></p>)}
        </div>
    )
}