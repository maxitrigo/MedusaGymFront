import { useState } from "react";
import { getTransactions } from "../helpers/DataRequests";
import { PaymentTypePieChart } from "./PaymentTypePieChart";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { SalesLineChart } from "./SalesLineChart";

export const GymPerformance = () => {
    const [transactions, setTransactions] = useState([]);

    const [isOpen, setIsOpen] = useState({ form: false, arrow: <MdKeyboardArrowRight /> })

    const handleIsOpen = async() => {
        setIsOpen({
            form: !isOpen.form,
            arrow: isOpen.form ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />
        });
        const transactions = await getTransactions();
        setTransactions(transactions);
    };
    return (
        <div onClick={handleIsOpen} className="container-principal">
            <div className="horizontal-between cursor-pointer">
                <h2>Graficos de Ventas</h2>
                <p className="text-2xl">{isOpen.arrow}</p>
            </div>
            {isOpen.form && 
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-neutral-600">Monto por tipo de pago</h2>
                </div>
                <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 bg-white rounded-3xl p-4 gap-4">
                    <div className="border border-neutral-300 p-8 rounded-3xl">
                    <PaymentTypePieChart transactions={transactions} period="Semanal"/>
                    </div>
                    <div className="border border-neutral-300 p-8 rounded-3xl">
                    <PaymentTypePieChart transactions={transactions} period="Mensual" />
                    </div>
                    <div className="border border-neutral-300 p-8 rounded-3xl">
                    <PaymentTypePieChart transactions={transactions} period="Anual" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mt-6 text-neutral-600">Ventas por periodo</h2>
                </div>
                <div className="space-y-4 p-8">
                    <div className="border border-neutral-300 p-2 rounded-3xl">
                    <SalesLineChart transactions={transactions} period="week" />
                    </div>
                    <div className="border border-neutral-300 p-2 rounded-3xl">
                    <SalesLineChart transactions={transactions} period="month" />
                    </div>
                    <div className="border border-neutral-300 p-2 rounded-3xl">
                    <SalesLineChart transactions={transactions} period="year" />
                    </div>
                </div>
            </div>
}

        </div>

    )
}