import { useState } from "react";
import { IoMdQrScanner, IoMdClose } from "react-icons/io";
import { NavBar } from "../../components/NavBar";
import QRGenerator from "../../components/QrGenerator";
import QRScanner from "../../components/QrScanner";

export const QrScann = () => {
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleToggleScanner = () => {
    setIsScannerVisible(!isScannerVisible);
  };

  return (
    <div className="w-full pb-60 bg-white">
      <NavBar />

      {/* Botón para mostrar el QRScanner */}
      {!isScannerVisible ? (
        <div className="vertical-center m-auto h-[400px]">
            <p className="font-bold italic">Haz click, para escanear el QR</p>
          <button
            className="text-10xl text-zinc-900 clickable"
            onClick={handleToggleScanner}
          >
            <IoMdQrScanner />
          </button>
        </div>
      ) : (
        // Mostrar QRScanner y el botón para cerrar
        <div className="vertical-center w-full">
          <QRScanner />
          <div className="flex justify-center mt-4">
            <button
              className="text-4xl p-2 rounded-2xl bg-red-500 text-white"
              onClick={handleToggleScanner}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}

      {/* Componente QRGenerator */}
      <div className="vertical-center w-full bg-white mt-4">
        <QRGenerator />
      </div>
    </div>
  );
};

