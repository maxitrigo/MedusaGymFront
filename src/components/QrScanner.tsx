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
      const html5QrCode = new Html5Qrcode("qr-reader"); // Pasamos el ID del div

      html5QrCode
        .start(
          { facingMode: 'environment' },  // Cámara trasera
          {
            fps: 40,  // fotogramas por segundo
            qrbox: { width: 250, height: 250 },  // Tamaño de la caja de QR
          },
          handleScan,  // Callback para procesar el QR
          () => {}  // Callback para errores
        )
        .catch((err) => {
          console.error('Error al iniciar cámara:', err);
        });
    }

    return () => {
      Html5Qrcode.getCameras().then((cameras) => {
        if (cameras.length > 0) {
          console.log("Cámaras detectadas:", cameras);
        }
      });
    };
  }, [scannerUsed]);

  return (
    <div className="bg-background h-full w-full text-white">
      {/* Contenedor de la cámara */}
      {!scannerUsed ? (
        <div
          id="qr-reader" // Usamos el ID aquí
          ref={qrCodeRef}
          className="w-full h-full"  // Asegurarse de que el contenedor ocupe toda la pantalla
        ></div>
      ) : (
        <ConfirmationCircle confirmed={confirmed} />
      )}
    </div>
  );
};

export default QRScanner;