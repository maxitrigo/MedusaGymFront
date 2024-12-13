import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { authInfo, logTraining } from '../helpers/DataRequests';
import { useDispatch } from 'react-redux';
import { setGymUser } from '../Redux/gymUserSlice';
import ConfirmationCircle from './ConfirmationCircle';

const QRScanner: React.FC = () => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [scannerUsed, setScannerUsed] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleScan = async (decodedText: string) => {
    try {
      let result;

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

      if (result && !result.error) {
        dispatch(setGymUser(result));
        setConfirmed(true);
      } else {
        setConfirmed(false);
      }
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      setConfirmed(false);
    } finally {
      setScannerUsed(true);
    }
  };

  useEffect(() => {
    if (qrCodeRef.current && !scannerUsed) {
      const html5QrCode = new Html5Qrcode('qr-reader'); // Usamos Html5Qrcode directamente
      html5QrCode
        .start(
          { facingMode: 'environment' }, // Cámara trasera
          {
            fps: 40,
            qrbox: { width: 150, height: 150 },
          },
          handleScan, // Callback para procesar el texto del QR
          () => {
          }
        )
        .catch((err) => console.error('Error al iniciar cámara:', err));
    }

    return () => {
      Html5Qrcode.getCameras().then((cameras) => {
        if (cameras.length > 0) {
          console.log("Cámaras detectadas:", cameras);
        }
      })
    };
  }, [scannerUsed]);

  return (
    <div className='w-full h-[500px] bg-backgorund'>
      {
        !scannerUsed ? 
        <div id="qr-reader" ref={qrCodeRef}></div> : 
        <ConfirmationCircle confirmed={confirmed} />
      }
    </div>
  );
};

export default QRScanner;
