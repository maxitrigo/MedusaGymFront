import { useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import TransactionForm from "./TransactionForm"
import { ShowTransactions } from "./ShowTransactions"

export const DailyRegister = () => {
    const[isOpen, setIsOpen] = useState(false)
    const[isOpen2, setIsOpen2] = useState(false)

    return(
        <div className="container-principal">
            <div onClick={() => setIsOpen(!isOpen)} className="horizontal-between cursor-pointer">
            <h1>Registro de Ventas</h1>
            <p className="text-2xl">{isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</p>
            </div>
            {isOpen && 
            <div>
                <div>
                    <ShowTransactions />
                </div>
                <div onClick={() => setIsOpen2(!isOpen2)} className="bg-background horizontal-between cursor-pointer mb-4 rounded-3xl px-6 py-2">
                    <h2 className="text-zinc-200">Registrar Venta</h2>
                    <p className="text-2xl">{isOpen2 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</p>
                </div>{isOpen2 && <TransactionForm />}
            </div>
            }
        </div>
    )
}