import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const { gymSlug }: any = useParams();

  useEffect(() => {
    sessionStorage.setItem('slug', gymSlug);
    if (!isLoggedIn) {
      navigate(`/${gymSlug}`, { state: { from: location } }); // Redirigir a la página de autenticación si no está logueado
    }
  }, [isLoggedIn, navigate, location]);

  return isLoggedIn ? children : null; // Si está logueado, renderiza los children, sino retorna null
};

export default PrivateRoute;