import { Link } from "react-router-dom"
import { BiSolidHome } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

export const NavBar = () => {
    const gymSlug = useSelector((state: any) => state.gym.slug);
    const role = useSelector((state: any) => state.user.role);


    return (
        <nav className="flex justify-between items-center fixed bottom-0 pl-12 p-4 max-w-3xl pr-12 bg-zinc-900 rounded-3xl z-50 m-2 w-3/4">
    <div className="text-4xl text-white">
        <Link to={`/${gymSlug}/home`}><BiSolidHome /></Link>
    </div>
    <div className="text-4xl text-white">
        <Link to={`/${gymSlug}/dashboard`}>{role === 'admin' ? <MdAdminPanelSettings /> : <GiWeightLiftingUp />}</Link>
    </div>
    <div className="text-4xl text-white">
        <Link to={`/${gymSlug}/profile`}><RiAccountCircleFill /></Link>
    </div>
</nav>

    )
}