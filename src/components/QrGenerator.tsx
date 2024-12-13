import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { authInfo } from "../helpers/DataRequests";

const QRGenerator: React.FC = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        generateQRCode()
    })

    const generateQRCode = async () => {

        try {
            const { token } = authInfo();
            if (!token) {
                setErrorMessage("Error: No se encontró un token válido.");
                return;
            }
            const url = await QRCode.toDataURL(token);
            setQrCodeUrl(url);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error generando el QR:", error);
            setErrorMessage("Error generando el QR.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {qrCodeUrl && (
                <div className="mt-10 h-3/4">
                    <img src={qrCodeUrl} alt="Código QR" />
                </div>
            )}
        </div>
    );
};

export default QRGenerator;
