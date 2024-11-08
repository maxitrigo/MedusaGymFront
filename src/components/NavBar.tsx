import { Link } from "react-router-dom"
import { BiSolidHome } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { RiAccountCircleFill } from "react-icons/ri";

export const NavBar = () => {
    const gymSlug = localStorage.getItem('slug')


    return (
        <nav className="flex justify-between items-center bottom-0 absolute w-full pl-12 p-6 pr-12">
    <div className="text-4xl text-white">
        <Link to={`/${gymSlug}`}><BiSolidHome /></Link> {/* Esto ya está bien */}
    </div>
    <div className="text-4xl text-white">
        <Link to={`/${gymSlug}/dashboard`}><GiWeightLiftingUp /></Link>
    </div>
    <div className="text-4xl text-white">
        <Link to={`/${gymSlug}/profile`}><RiAccountCircleFill /></Link> {/* Este también está bien */}
    </div>
</nav>
    )
}