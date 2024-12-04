import { Link, useLocation } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import { VscGraphLine } from "react-icons/vsc";
import { useState, useEffect } from "react";
import QRScanner from "./QrScanner";
import { IoMdQrScanner } from "react-icons/io";
import { IoQrCode } from "react-icons/io5";
import QRGenerator from "./QrGenerator";

export const NavBar = () => {
  const gymSlug = useSelector((state: any) => state.gym.slug);
  const role = useSelector((state: any) => state.user.role);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");

  const location = useLocation();

  // Cambiar activo automáticamente cuando cambie la ruta
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveItem(path || "home");
  }, [location]);

  return (
    <div className="horizontal-center fixed bottom-0 w-full z-50">
      <nav className="horizontal-between lg:pl-12 max-w-3xl lg:pr-12 bg-zinc-900 rounded-2xl m-2 w-full gap-2 shadow-2xl">
        <span
          className={`text-4xl p-2 cursor-pointer ${
            activeItem === "scanner" ? "bg-[#e8ff21] text-zinc-900 p-2 rounded-2xl" : "text-white"
          }`}
          onClick={() => {
            setActiveItem("scanner");
            setIsScannerOpen(!isScannerOpen);
          }}
        >
          <IoMdQrScanner />
        </span>
        <span
          className={`text-4xl p-2 cursor-pointer ${
            activeItem === "qr" ? "bg-[#e8ff21] text-zinc-900 p-2 rounded-2xl" : "text-white"
          }`}
          onClick={() => {
            setActiveItem("qr");
            setIsQrOpen(!isQrOpen);
          }}
        >
          <IoQrCode />
        </span>
        <div
          className={`text-4xl p-2 rounded-2xl ${
            activeItem === "home" ? "bg-[#e8ff21] text-zinc-900" : "text-white"
          }`}
        >
          <Link to={`/${gymSlug}/home`} onClick={() => setActiveItem("home")}>
            <BiSolidHome />
          </Link>
        </div>
        <div
          className={`text-4xl p-2 ${
            activeItem === "dashboard" ? "bg-[#e8ff21] text-zinc-900 p-2 rounded-2xl" : "text-white"
          }`}
        >
          <Link
            to={`/${gymSlug}/dashboard`}
            onClick={() => setActiveItem("dashboard")}
          >
            {role === "admin" ? (
              <MdAdminPanelSettings />
            ) : (
              <img
                className="h-8"
                src="https://www.svgrepo.com/show/189362/dumbbell-gym.svg"
                style={{
                    filter: activeItem === "dashboard" 
                    ? "invert(18%) sepia(5%) saturate(100%) brightness(0.15) contrast(90%)"  // Color activo
                    : "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",  // Color por defecto
                }}
                alt="dumbbell gym"
              />
            )}
          </Link>
        </div>
        {role === "admin" && (
          <div
            className={`text-4xl p-2 ${
              activeItem === "metrics"
                ? "bg-[#e8ff21] text-zinc-900 p-2 rounded-2xl"
                : "text-white"
            }`}
          >
            <Link
              to={`/${gymSlug}/metrics`}
              onClick={() => setActiveItem("metrics")}
            >
              <VscGraphLine />
            </Link>
          </div>
        )}
        <div
          className={`text-4xl p-2 rounded-2xl ${
            activeItem === "profile" ? "bg-[#e8ff21] text-zinc-900" : "text-white"
          }`}
        >
          <Link
            to={`/${gymSlug}/profile`}
            onClick={() => setActiveItem("profile")}
          >
            <RiAccountCircleFill />
          </Link>
        </div>
      </nav>
      {isScannerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-5">
          <div className="bg-background p-4 rounded-3xl shadow-lg w-[350px] vertical-center">
            <QRScanner />
            <button
              onClick={() => setIsScannerOpen(false)}
              className="button-delete mt-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isQrOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-5">
          <div className="bg-background p-4 rounded-3xl shadow-lg w-[350px] vertical-center">
            <QRGenerator />
            <button
              onClick={() => setIsQrOpen(false)}
              className="button-delete mt-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
