import React, { useState } from "react";
import { createTransaction } from "../helpers/DataRequests";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FormularioTransaccion = () => {
  const navigate = useNavigate();
  const gymSlug = useSelector((state: any) => state.gym.slug);
  const [formData, setFormData] = useState({
    amount: "",
    paymentType: "",
    productId: "",
    quantity: 1,
    userId: "",
  });

  const tiposPago = [
  "Efectivo",
  "Mercado Pago",
  "Visa Debito",
  "Visa Credito",
  "Master Debito",
  "Maestro Debito",
  "OCA Credito",
  "Otras Credito",
  "AMEX Credito",
  "Master Credito",
  "Transferencia"
  ];
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
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
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-background w-full p-4 rounded-3xl font-normal text-zinc-200">
      <div className="horizontal-between">
        <label htmlFor="amount" className="w-1/2">Monto:</label>
        <input
          className="principal-input"
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Ingrese el monto"
          title="Monto a ingresar"
          required
        />
      </div>
      <div className="horizontal-between">
        <label htmlFor="paymentType" className="w-1/2">Tipo de Pago:</label>
        <select
          className="principal-input"
          id="paymentType"
          name="paymentType"
          value={formData.paymentType}
          onChange={handleChange}
          title="Seleccione el tipo de pago"
          required
        >
          <option value="">Selecciona un tipo de pago</option>
          {tiposPago.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
      <div className="vertical-center">
        <button type="submit" className="button-send">Enviar</button>
      </div>
    </form>
  );
};

export default FormularioTransaccion;
