import { NavBar } from "../../components/NavBar";
import QRGenerator from "../../components/QrGenerator";
import QRScanner from "../../components/QrScanner";

export const QrScann = () => {
    return (
        <div className="w-full overflow-hidden overscroll-none bg-white">
            <NavBar />
            <div className="relative w-full h-full">
                {/* QRScanner fijo en la pantalla */}
                <div className="fixed top-0 left-0 w-full h-full">
                    <QRScanner />
                </div>

                {/* QRGenerator desplazándose hacia arriba con el scroll */}
                <div className="mt-[500px] pb-20 relative bg-white rounded-tl-3xl rounded-tr-3xl h-full">
                    <QRGenerator />
                </div>
            </div>
        </div>
    );
};
