import { NavBar } from "../../components/NavBar"
import QRGenerator from "../../components/QrGenerator"
import QRScanner from "../../components/QrScanner"

export const QrScann = () => {
    return (
        <div className="w-full pb-20 bg-white">
            <NavBar/>
            <div className="vertical-center w-full">
                <QRScanner/>
            </div>
            <div className="vertical-center w-full bg-white">
                <QRGenerator/>
            </div>
        </div>
    )
}