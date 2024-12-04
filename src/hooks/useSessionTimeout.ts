import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';

const useSessionTimeout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const sessionHasStarted = sessionStorage.getItem('sessionStarted')

        if(sessionHasStarted) {
            return
        }

        sessionStorage.setItem('sessionStarted', 'true')

        setTimeout(() => {
            const gymSlug = sessionStorage.getItem('slug')
            alert('La sesion caduco, por favor inicia sesion nuevamente!')
            dispatch(logout())
            navigate(`/${gymSlug}`)
        }, 14400000)

    }, []);

};

export default useSessionTimeout;