import { Link, useLocation } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import { VscGraphLine } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { IoQrCode } from "react-icons/io5";

export const NavBar = () => {
  const gymSlug = useSelector((state: any) => state.gym.slug);
  const role = useSelector((state: any) => state.user.role);
  const subscriptionEnd = useSelector((state: any) => state.gym.subscriptionEnd);
  const [activeItem, setActiveItem] = useState<string>("");

  const location = useLocation();

  // Cambiar activo automáticamente cuando cambie la ruta
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveItem(path || "home");
  }, [location.pathname]);

  // Obtener fecha actual
  const currentDate = new Date();
  const subscriptionDate = new Date(subscriptionEnd);

  return (
    <div className="horizontal-center fixed bottom-4 w-full z-50">
      <nav className="horizontal-between lg:pl-12 max-w-3xl lg:pr-12 bg-zinc-900 rounded-2xl m-2 w-full gap-2 shadow-2xl">
        <div
          className={`text-4xl p-2 rounded-2xl ${
            activeItem === "qrscann" ? "bg-[#e8ff21] text-zinc-900" : "text-white"
          }`}
        >
          <Link to={`/${gymSlug}/qrscann`} onClick={() => setActiveItem("qrscann")}>
            <IoQrCode />
          </Link>
        </div>
        
        <div
          className={`text-4xl p-2 rounded-2xl ${
            activeItem === "home" ? "bg-[#e8ff21] text-zinc-900" : "text-white"
          }`}
        >
          <Link to={`/${gymSlug}/home`} onClick={() => setActiveItem("home")}>
            <BiSolidHome />
          </Link>
        </div>

        {/* Mostrar el Dashboard solo si la suscripción es válida */}
        {subscriptionEnd && currentDate < subscriptionDate && (
          <div
            className={`text-4xl p-2 ${
              activeItem === "dashboard"
                ? "bg-[#e8ff21] text-zinc-900 p-2 rounded-2xl"
                : "text-white"
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
                    filter:
                      activeItem === "dashboard"
                        ? "invert(18%) sepia(5%) saturate(100%) brightness(0.15) contrast(90%)"
                        : "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                  }}
                  alt="dumbbell gym"
                />
              )}
            </Link>
          </div>
        )}

        {/* Mostrar el Metrics solo si la suscripción es válida y el rol es admin */}
        {role === "admin" && subscriptionEnd && currentDate < subscriptionDate && (
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
    </div>
  );
};