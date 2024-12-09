import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { authInfo, logTraining } from '../helpers/DataRequests';
import { useDispatch } from 'react-redux';
import { setGymUser } from '../Redux/gymUserSlice';
import ConfirmationCircle from './ConfirmationCircle';

const QRScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [scannerUsed, setScannerUsed] = useState<boolean>(false); // Nuevo estado
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleScan = async (decodedText: string) => {
    try {
      setScanResult(decodedText);
      console.log('QR detectado:', decodedText);
  
      let result;
      
      // Si el QR escaneado contiene una acción esperada, llamamos a la función correspondiente
      if (decodedText === 'log-training') {
        const { token } = authInfo();
        result = await logTraining(token);
        console.log('Respuesta del entrenamiento registrado:', result);
      } else if (decodedText) {
        const token = decodedText;
        result = await logTraining(token);
        console.log('Respuesta del entrenamiento registrado:', result);
      } else {
        console.warn('Acción desconocida en el QR');
      }
  
      if (result && !result.error) {  // Si no hay error en el resultado
        dispatch(setGymUser(result));
        setConfirmed(true);
  
        // Esperamos 2 segundos y luego recargamos la página
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      } else {
        setConfirmed(false);  // Si hay error, confirmación en false
      }
  
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      setConfirmed(false);  // Confirmación en false en caso de error
    } finally {
        // Siempre se marca el scanner como usado
        setScannerUsed(true);
        // Esperamos 2 segundos y luego recargamos la página
        // setTimeout(() => {
        //     window.location.reload();
        // }, 3000);
    }
  };
  

  useEffect(() => {
    if (qrCodeRef.current && !scannerUsed) { // Solo renderizamos el escáner si no ha sido usado
      const html5QrCodeScanner = new Html5QrcodeScanner(
        'qr-reader', // ID del contenedor
        {
          fps: 40, // Frames por segundo
          qrbox: { width: 150, height: 150 }, // Tamaño del cuadro de escaneo
        },
        false
      );
  
      // Renderizamos el escáner
      html5QrCodeScanner.render(
        (decodedText) => {
          handleScan(decodedText).finally(() => {
            html5QrCodeScanner.clear(); // Limpiar el escáner después de procesar
          });
        },
        (error) => {
        }
      );
    }

  }, [scannerUsed]); // Dependencia en `scannerUsed`
  

  return (
    <div className='bg-background w-[320px] text-white'>
      {
          !scannerUsed ? 
            <div id="qr-reader" ref={qrCodeRef}></div> : 
            <ConfirmationCircle confirmed={confirmed} />
      }
    </div>
  );
};

export default QRScanner;
