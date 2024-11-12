import { useEffect, useState } from "react"
import { usersGet } from "../helpers/DataRequests"

export const ShowUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = usersGet()
        getUsers.then(data => setUsers(data))
    }, [])
    return (
        <>
            <div className="bg-white rounded-4xl p-4 mt-4 font-nunito w-full space-y-2">
                <h2>Usuarios Registrados</h2>
                {users.map((user: any) => (
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