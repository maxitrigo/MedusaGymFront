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
      <div className='font-normal'>
        <p><strong>Miembros Activos:</strong> {metrics?.activeMembersCount ?? 'N/A'}</p>
        <p><strong>Retención de Clientes:</strong> {metrics?.retentionRate ? `${metrics.retentionRate}%` : 'N/A'}</p>
        <p><strong>Tasa de Abandono:</strong> {metrics?.churnRate ? `${metrics.churnRate}%` : 'N/A'}</p>
        <p><strong>Ingresos Mensuales Recurrentes Anualizado:</strong> ${metrics?.mrr ? metrics.mrr.toFixed(2) : '0.00'}</p>
        <p><strong>Ingresos Por Cantidad de Socios:</strong> ${metrics?.incomePerUser ? metrics.incomePerUser.toFixed(2) : '0.00'}</p>
        <p><strong>Ingresos Anuales Totales:</strong> ${metrics?.totalIncome ? metrics.totalIncome.toFixed(2) : '0.00'}</p>
      </div>
    </div>
  );
};

export default GymMetrics;

