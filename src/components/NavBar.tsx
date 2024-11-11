import { Link } from "react-router-dom"
import { BiSolidHome } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { RiAccountCircleFill } from "react-icons/ri";

export const NavBar = () => {
    const gymSlug = sessionStorage.getItem('slug')


    return (
        <nav className="flex justify-between items-center fixed bottom-0 w-full pl-12 p-6 pr-12 bg-white rounded-t-3xl ">
    <div className="text-4xl text-black">
        <Link to={`/${gymSlug}/home`}><BiSolidHome /></Link>
    </div>
    <div className="text-4xl text-black">
        <Link to={`/${gymSlug}/dashboard`}><GiWeightLiftingUp /></Link>
    </div>
    <div className="text-4xl text-black">
        <Link to={`/${gymSlug}/profile`}><RiAccountCircleFill /></Link>
    </div>
</nav>

    )
}