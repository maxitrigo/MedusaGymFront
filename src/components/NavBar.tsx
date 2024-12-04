import { Link } from "react-router-dom"
import { BiSolidHome } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import { VscGraphLine } from "react-icons/vsc";
import { useState } from "react";
import QRScanner from "./QrScanner";
import { IoMdQrScanner } from "react-icons/io";
import { IoQrCode } from "react-icons/io5";
import QRGenerator from "./QrGenerator";

export const NavBar = () => {
    const gymSlug = useSelector((state: any) => state.gym.slug);
    const role = useSelector((state: any) => state.user.role);

    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isQrOpen, setIsQrOpen] = useState(false);

    const handleScanner = () => {
        setIsScannerOpen(false)
        window.location.reload()
    }


    return (
        <>
        <nav className="flex justify-between items-center fixed bottom-0 lg:pl-12 p-4 max-w-3xl lg:pr-12 bg-zinc-900 rounded-3xl z-50 m-2 w-3/4 shadow-2xl border-2 border-[#121212]">
            <div className="text-4xl text-white">
                <Link to={`/${gymSlug}/home`}><BiSolidHome /></Link>
            </div>
            <span className="text-4xl text-white cursor-pointer" onClick={() => setIsScannerOpen(!isScannerOpen)}><IoMdQrScanner /></span>
            <span className="text-4xl text-white cursor-pointer" onClick={() => setIsQrOpen(!isScannerOpen)}><IoQrCode /></span>
            <div className="text-4xl text-white">
                <Link to={`/${gymSlug}/dashboard`}>{role === 'admin' ? <MdAdminPanelSettings /> : <img className="h-8"
                                                        src="https://www.svgrepo.com/show/189362/dumbbell-gym.svg" 
                                                        style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(180deg)' }} 
                                                        alt="dumbbell gym" 
                                                        />
                                                    }</Link>
            </div>
            {role === 'admin' ? <div className="text-4xl text-white">
                <Link to={`/${gymSlug}/metrics`}><VscGraphLine /></Link>
            </div> : null}
            <div className="text-4xl text-white">
                <Link to={`/${gymSlug}/profile`}><RiAccountCircleFill /></Link>
            </div>
        </nav>
        {isScannerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-5">
                <div className="bg-background p-4 rounded-3xl shadow-lg w-[350px] vertical-center">
                    <QRScanner/>
                    <button onClick={handleScanner} className="button-delete mt-2" > Cerrar </button>
                </div>
            </div>
        )}
        {isQrOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-5">
                <div className="bg-background p-4 rounded-3xl shadow-lg w-[350px] vertical-center">
                    <QRGenerator/>
                    <button onClick={() => setIsQrOpen(false)} className="button-delete mt-2" > Cerrar </button>
                </div>
            </div>
        )}
        </>
    )
}