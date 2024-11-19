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
            <h1>Registrar Venta</h1>
            <p className="text-2xl">{isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</p>
            </div>
            {isOpen && 
            <div>
                <div>
                    <ShowTransactions />
                </div>
                <div className="horizontal-between cursor-pointer mb-4 border rounded-3xl px-6 py-2">
                    <h2 onClick={() => setIsOpen2(!isOpen2)} className="text-neutral-600">Registrar Venta</h2>
                    <p className="text-2xl">{isOpen2 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</p>
                </div>{isOpen2 && <TransactionForm />}
            </div>
            }
        </div>
    )
}