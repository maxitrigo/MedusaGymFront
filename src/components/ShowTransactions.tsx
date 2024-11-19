import { useEffect, useState } from "react"
import { deleteTransaction, getTransactions } from "../helpers/DataRequests";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ShowTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const { gymSlug } = useSelector((state: any) => state.gym);

    useEffect(() => {
        const fetchTransactions = async () => {
            const transactions = await getTransactions();
            setTransactions(transactions);
        }
        fetchTransactions();
    },[])

    const today = new Date().toISOString().split('T')[0];

    const filteredTransactions = transactions.filter((transaction: any) => transaction.date.startsWith(today))

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id);
            window.location.reload();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    // Maneja el error 401
                    alert("No autorizado. Por favor, inicie sesión.");
                    navigate(`/${gymSlug}`);
                } else {
                    alert("Error al cargar los usuarios.");
                }
            } else {
                alert("Error desconocido.");
            }
            
        }
    }
    


    return (
        <div className="pb-12">
                <p>Transacciones Registradas Hoy</p>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Hora</th>
                <th className="px-4 py-2 text-left">Tipo de Pago</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction: any) => (
                <tr key={transaction.id} className="border-b text-xs">
                  <td className="px-4 py-2">{transaction.date.split('T')[0]}</td>
                  <td className="px-4 py-2">
                    {new Date(new Date(transaction.date).getTime() - 3 * 60 * 60 * 1000).toISOString().split('T')[1].slice(0, 5)}
                  </td>
                  <td className="px-4 py-2">{transaction.paymentType}</td>
                  <td className="px-4 py-2">{transaction.amount}</td>
                  <td className="px-4 py-2">
                    <div>
                    <button onClick={() => handleDelete(transaction.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-4xl transition-transform transform active:scale-95">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}