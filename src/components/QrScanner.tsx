import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

const QRScanner: React.FC = () => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [scannerUsed, setScannerUsed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const startScanner = async () => {
      try {
        // Obtener la cámara
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          // Procesar los frames del video
          const processFrame = () => {
            if (!canvasRef.current || !videoRef.current) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
              // Dibujar el frame del video en el canvas
              context.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height
              );

              // Obtener los datos de imagen del canvas
              const imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );

              // Intentar detectar el código QR
              const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

              if (qrCode && qrCode.data) {
                handleScan(qrCode.data);
                stopScanner(); // Detener al encontrar un QR válido
              } else {
                // Seguir procesando frames
                animationFrameId = requestAnimationFrame(processFrame);
              }
            }
          };

          // Comenzar el ciclo de procesamiento
          processFrame();
        }
      } catch (err) {
        console.error("Error al iniciar la cámara: ", err);
      }
    };

    const stopScanner = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop()); // Detener la cámara
      }
      cancelAnimationFrame(animationFrameId); // Detener el loop de frames
    };

    startScanner();

    return () => {
      stopScanner(); // Liberar recursos al desmontar
    };
  }, []);

  const handleScan = async (decodedText: string) => {
    try {
      let result;

      if (decodedText === "log-training") {
        const { token } = authInfo();
        result = await logTraining(token);
      } else if (decodedText) {
        const token = decodedText;
        result = await logTraining(token);
      }

      if (result && !result.error) {
        dispatch(setGymUser(result));
        setConfirmed(true);
      } else {
        setConfirmed(false);
      }
    } catch (error) {
      setConfirmed(false);
    } finally {
      setScannerUsed(true);
    }
  };

  return (
    <div className="bg-background w-full h-full text-white">
      {!scannerUsed ? (
        <div className="relative">
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            muted
          ></video>
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
            }}
          ></canvas>
        </div>
      ) : (
        <ConfirmationCircle confirmed={confirmed} />
      )}
    </div>
  );
};

export default QRScanner;
