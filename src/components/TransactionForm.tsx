import React, { useEffect, useState } from "react";
import { createTransaction, getPlans, usersGet } from "../helpers/DataRequests";
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

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const tiposPago = ["efectivo", "mercado_pago", "tarjeta_debito", "tarjeta_credito", "transferencia"];

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

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await usersGet();
        setUsers(users); // Guardamos los objetos completos
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };
    const fetchProducts = async () => {
      try {
        const products = await getPlans();
        setProducts(products); // Guardamos los objetos completos
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    loadUsers();
    fetchProducts();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-neutral-300 p-8 m-8 rounded-3xl">
      <div className="horizontal-between">
        <label htmlFor="amount" className="w-1/2">Monto:</label>
        <input
          className="secondary-input"
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
          className="secondary-input"
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
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default FormularioTransaccion;
