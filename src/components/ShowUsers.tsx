import { useState } from "react"
import { usersGet } from "../helpers/DataRequests"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"

export const ShowUsers = () => {
    const [users, setUsers] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [arrow, setArrow] = useState(<MdKeyboardArrowRight />)

    const handleClick = async () => {
        usersGet().then(data => setUsers(data))
        setArrow(isOpen ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />)
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className="bg-white rounded-4xl p-4 mt-4 w-full space-y-2">
                <div onClick={handleClick} className="flex justify-between cursor-pointer items-center">
                <h2>Usuarios Registrados</h2>
                <p className="text-2xl">{arrow}</p>
                </div>
                {isOpen && users.map((user: any) => (
                    <div key={user.id} className="border-t py-2">
                        <div className="flex justify-between">
                            <p>Nombre:</p>
                            <p>{user.name}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Pases:</p>
                            <p>{user.admisions}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Estatus:</p>
                            <p>{user.status === 'active' ? 'Activo' : 'Inactivo'}</p>
                        </div>
                        <div className="flex justify-center">
                        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-4xl">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}