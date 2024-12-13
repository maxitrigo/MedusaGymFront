import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

const QRScanner: React.FC = () => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [scannerUsed, setScannerUsed] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleScan = async (decodedText: string) => {
    try {
      let result;

      if (decodedText === "log-training") {
        const { token } = authInfo();
        result = await logTraining(token);
        alert("Entrenamiento registrado con éxito.");
      } else if (decodedText) {
        const token = decodedText;
        result = await logTraining(token);
        alert("Respuesta del QR procesada.");
      } else {
        alert("Acción desconocida en el QR.");
      }

      if (result && !result.error) {
        dispatch(setGymUser(result));
        setConfirmed(true);
      } else {
        setConfirmed(false);
      }
    } catch (error) {
      alert("Error al procesar el QR: " + error);
      setConfirmed(false);
    } finally {
      setScannerUsed(true);
    }
  };

  useEffect(() => {
    const checkCameraPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        alert("Permiso para usar la cámara concedido.");
        // Verificar si las pistas están activas
        const videoTrack = stream.getVideoTracks()[0];
        if (!videoTrack || !videoTrack.enabled) {
          alert("La cámara no está activa.");
          return;
        }
        // Detenemos el stream inmediatamente después de verificar
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        alert("No se puede acceder a la cámara: " + error);
        return;
      }
    };

    const startQRScanner = async () => {
      if (qrCodeRef.current && !scannerUsed) {
        const html5QrCode = new Html5Qrcode("qr-reader");
        try {
          await html5QrCode.start(
            { facingMode: "environment" },
            { fps: 40, qrbox: { width: 250, height: 250 } },
            handleScan,
            (error) => alert("Error en lectura QR: " + error)
          );
          alert("QR Scanner iniciado correctamente.");
        } catch (err) {
          alert("Error al iniciar QR Scanner: " + err);
        }
      }
    };

    checkCameraPermissions().then(() => startQRScanner());

    return () => {
      Html5Qrcode.getCameras().then((cameras) => {
        if (cameras.length > 0) {
          alert("Cámaras detectadas: " + cameras.length);
        }
      });
    };
  }, [scannerUsed]);

  return (
    <div className="bg-background h-full w-full text-white">
      {!scannerUsed ? (
        <div
          id="qr-reader"
          ref={qrCodeRef}
          className="w-full h-full"
        ></div>
      ) : (
        <ConfirmationCircle confirmed={confirmed} />
      )}
    </div>
  );
};

export default QRScanner;
