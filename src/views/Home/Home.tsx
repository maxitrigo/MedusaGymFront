import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { Button } from "../../components/Button";
import { GlassCard } from "../../components/GlassCard";
import { FaUsers } from "react-icons/fa";
import { SiOpenaccess } from "react-icons/si";
import { SlGraph, SlScreenSmartphone } from "react-icons/sl";

export default function Home() {
    useSessionTimeout(); // aca comienza el inicio de sesion
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create-gym');
    };

    return (
        <div className="min-h-screen text-white">
        {/* Sección Hero */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Gradiente de fondo */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 " />
          </div>
  
          {/* Contenido */}
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <span className="text-3xl lg:text-6xl font-bold italic text-[#e4ff00]">GYM</span>
                  <span className="text-3xl lg:text-6xl font-bold italic">metrics</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Gestioná tu Gimnasio
                  <span className="text-[#e4ff00] italic"> de Forma Inteligente!</span>
                </h1>
                {isLoggedIn ? (
                  <p className="text-lg lg:text-xl text-zinc-300 mb-8">
                    Para crear tu gimnasio, haz clic en el botón "Comenzar ahora" y completa el formulario.
                  </p>
                ) : (
                  <>
                    <p className="text-lg lg:text-xl text-zinc-300">
                      Optimiza la administración de tu gimnasio con nuestra plataforma integral.
                    </p>
                    <p className="text-lg lg:text-xl text-zinc-300 mb-8">
                      Control de miembros, pagos y accesos en un solo lugar.
                    </p>
                  </>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button onClick={handleClick} variant="primary">
                    Comenzar Ahora 
                  </Button>
                </div>
              </div>
  
              <div className="w-full">
                <img 
                  src="phone.png"
                  alt="Dashboard Gimnasio"
                />
              </div>
            </div>
  
            {/* Características */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:mt-24">
              <GlassCard className="text-center p-6">
                <FaUsers className="w-10 h-10 text-[#e4ff00] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Control de Miembros</h3>
                <p className="text-zinc-300 text-sm">Gestiona fácilmente tu base de usuarios</p>
              </GlassCard>
  
              <GlassCard className="text-center p-6">
                <SiOpenaccess className="w-10 h-10 text-[#e4ff00] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Control de Acceso</h3>
                <p className="text-zinc-300 text-sm">Monitorea entradas y salidas en tiempo real</p>
              </GlassCard>
  
              <GlassCard className="text-center p-6">
                <SlGraph className="w-10 h-10 text-[#e4ff00] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Análisis y Reportes</h3>
                <p className="text-zinc-300 text-sm">Estadísticas detalladas de tu negocio</p>
              </GlassCard>
  
              <GlassCard className="text-center p-6">
                <SlScreenSmartphone className="w-10 h-10 text-[#e4ff00] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">App Móvil</h3>
                <p className="text-zinc-300 text-sm">Gestiona desde cualquier dispositivo</p>
              </GlassCard>
            </div>
  
            {/* Sección CTA */}
            <div className="mt-16 lg:mt-24">
              <GlassCard className="text-center p-8 lg:p-12">
                <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                  ¿Listo para revolucionar la gestión de tu gimnasio?
                </h2>
                <p className="text-zinc-300 mb-8 max-w-3xl mx-auto">
                  Unite a los cientos de gimnasios que ya optimizaron su administración con nuestra plataforma.
                </p>
                <Button onClick={handleClick} variant="primary" className="text-lg px-8 py-4">
                  Prueba Gratuita por 30 Días
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    );
}