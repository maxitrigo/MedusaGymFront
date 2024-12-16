import { Html5Qrcode } from "html5-qrcode";
import { useRef, useEffect, useState } from "react";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

const QRScanner = ({ isActive }: { isActive: boolean }) => {
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isActive) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isActive]);

  const startScanner = () => {
    if (scannerRef.current) {
      return;
    }

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 40,
      },
      (result) => {
        scanner.pause(true);
        handleScann(result);
        setIsScanned(true);
        stopScanner();
      },
      () => {}
    );
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current = null;
        })
        .catch((err) => console.error("Error al detener el escáner:", err));
    }
  };

  const handleScann = async (data: string) => {
    try {
      let result;

      if (data === "log-training") {
        const { token } = authInfo();
        result = await logTraining(token);
      } else if (data) {
        const token = data;
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
    }
  };

  return (
    <div>
      {isScanned ? (
        <ConfirmationCircle confirmed={confirmed} />
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
};

export default QRScanner;
