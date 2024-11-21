import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTransactions, deleteTransaction } from "../helpers/DataRequests";

export const ShowTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { gymSlug } = useSelector((state: any) => state.gym);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await getTransactions();
      setTransactions(transactions);
    };
    fetchTransactions();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const filteredTransactions = transactions.filter(
    (transaction: any) => transaction.date.startsWith(today) && transaction.clientId === 'cajero'
  );

  const transactionsGroupedByPaymentType = filteredTransactions.reduce(
    (acc: any, transaction: any) => {
      if (!acc[transaction.paymentType]) {
        acc[transaction.paymentType] = [];
      }
      acc[transaction.paymentType].push(transaction);
      return acc;
    },
    {}
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("No autorizado. Por favor, inicie sesión.");
          navigate(`/${gymSlug}`);
        } else {
          alert("Error al cargar los usuarios.");
        }
      } else {
        alert("Error desconocido.");
      }
    }
  };

  const totalAmount = filteredTransactions.reduce(
    (total: number, transaction: any) => total + transaction.amount,
    0
  );

  return (
    <div className="pb-12 px-2 sm:px-4">
      <p className="text-lg font-semibold mb-4">Transacciones Registradas Hoy</p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-1 text-left">Fecha</th>
              <th className="px-2 py-1 text-left">Hora</th>
              <th className="px-2 py-1 text-left">Tipo de Pago</th>
              <th className="px-2 py-1 text-left">Monto</th>
              <th className="px-2 py-1 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(transactionsGroupedByPaymentType).map((paymentType) => {
              const transactionsForPaymentType = transactionsGroupedByPaymentType[paymentType];
              const subtotalForPaymentType = transactionsForPaymentType.reduce(
                (subtotal: number, transaction: any) => subtotal + transaction.amount,
                0
              );

              return (
                <React.Fragment key={paymentType}>
                  {transactionsForPaymentType.map((transaction: any) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="px-2 py-1">{transaction.date.split("T")[0]}</td>
                      <td className="px-2 py-1">
                        {new Date(new Date(transaction.date).getTime() - 3 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[1]
                          .slice(0, 5)}
                      </td>
                      <td className="px-2 py-1">{transaction.paymentType}</td>
                      <td className="px-2 py-1">{transaction.amount}</td>
                      <td className="px-2 py-1 text-center">
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-4xl transition-transform transform active:scale-95 text-xs"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="px-2 py-1" colSpan={3}></td>
                    <td className="px-2 py-1 text-right">Subtotal {paymentType}:</td>
                    <td className="px-2 py-1 text-right">
                      ${subtotalForPaymentType.toFixed(2)}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="px-2 py-1" colSpan={3}></td>
              <td className="px-2 py-1 text-right">Total:</td>
              <td className="px-2 py-1 text-right">${totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
