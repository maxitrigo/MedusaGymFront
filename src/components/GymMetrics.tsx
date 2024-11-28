import { useState, useEffect } from 'react';
import { getGymMetrics } from '../helpers/DataRequests';

const GymMetrics = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getGymMetrics(); // Llamar a la función sin parámetros
        setMetrics(data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener las métricas del gimnasio');
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className='p-4 space-y-4 bg-background rounded-3xl'>
      <h3 className='font-bold text-2xl bg-zinc-900 py-2 text-center rounded-3xl'>Metricas del Gimnasio</h3>
      <div className='font-normal p-4 space-y-2'>
        <div className='horizontal-between bg-zinc-800 p-2 px-4 rounded-3xl'>
          <p>Miembros Activos:</p>
          {metrics?.activeMembersCount ?? 'N/A'}
        </div>
        <div className='horizontal-between bg-zinc-800 p-2 px-4 rounded-3xl'>
          <p>Retención de Clientes:</p>
          {metrics?.retentionRate ? `${metrics.retentionRate}%` : 'N/A'}
        </div>
        <div className='horizontal-between bg-zinc-800 p-2 px-4 rounded-3xl'>
          <p>Ingresos Mensuales Recurrentes Anualizado:</p>
            ${metrics?.mrr ? metrics.mrr.toFixed(2) : '0.00'}
        </div>
        <div className='horizontal-between bg-zinc-800 p-2 px-4 rounded-3xl'>
          <p>Ingresos Por Cantidad de Socios:</p>
          ${metrics?.incomePerUser ? metrics.incomePerUser.toFixed(2) : '0.00'}
        </div>
        <div className='horizontal-between bg-zinc-800 p-2 px-4 rounded-3xl'>
          <p>Ingresos Anuales Totales:</p>
          ${metrics?.totalIncome ? metrics.totalIncome.toFixed(2) : '0.00'}
        </div>
      </div>
    </div>
  );
};

export default GymMetrics;

