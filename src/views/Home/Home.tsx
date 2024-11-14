import { useSelector } from "react-redux";
import CreateGym from "../CreateGym/CreateGym";

export default function Home() {
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

    return (
        <div>
            {isLoggedIn && <p className="text-white">Welcome, {sessionStorage.getItem('name')}</p>}
            {isLoggedIn && <CreateGym />}
        </div>
    );
}