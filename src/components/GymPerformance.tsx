import { useState } from "react";
import { getTransactions } from "../helpers/DataRequests";
import { PaymentTypeBarChart} from "./PaymentTypePieChart";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { SalesLineChart } from "./SalesLineChart";
import GymMetrics from "./GymMetrics";

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
                <h2>Metricas</h2>
                <p className="text-2xl">{isOpen.arrow}</p>
            </div>
            {isOpen.form && 
            <div>
                <div>
                    <GymMetrics />
                </div>
                <div>
                    <h2 className="text-2xl mt-6 horizontal-center bg-background py-4 rounded-3xl mb-4">Monto por tipo de pago</h2>
                </div>
                <div className="space-y-4 w-full">
                    <div className="bg-background p-8 rounded-3xl">
                    <PaymentTypeBarChart transactions={transactions} period="Semanal"/>
                    </div>
                    <div className="bg-background p-8 rounded-3xl">
                    <PaymentTypeBarChart transactions={transactions} period="Mensual" />
                    </div>
                    <div className="bg-background p-8 rounded-3xl">
                    <PaymentTypeBarChart transactions={transactions} period="Anual" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl mt-6 horizontal-center bg-background py-4 rounded-3xl">Ventas por periodo</h2>
                </div>
                <div className="space-y-4 p-8">
                    <div className="bg-background p-2 rounded-3xl">
                    <SalesLineChart transactions={transactions} period="week" />
                    </div>
                    <div className="bg-background p-2 rounded-3xl">
                    <SalesLineChart transactions={transactions} period="month" />
                    </div>
                    <div className="bg-background p-2 rounded-3xl">
                    <SalesLineChart transactions={transactions} period="year" />
                    </div>
                </div>
            </div>
}

        </div>

    )
}