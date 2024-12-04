import { useState } from "react";
import { deleteUserGym, usersGet } from "../helpers/DataRequests";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { GoVerified } from "react-icons/go";
import { IoIosInfinite } from "react-icons/io";

export const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [arrow, setArrow] = useState(<MdKeyboardArrowRight />);

  const handleClick = async () => {
    usersGet().then((data) => setUsers(data));
    setArrow(isOpen ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />);
    setIsOpen(!isOpen);
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await deleteUserGym(userId)
      if (response) {
        throw alert('Usuario eliminado con exito!')
      }
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="container-principal">
        <div
          onClick={handleClick}
          className="flex justify-between cursor-pointer items-center"
        >
          <h2>Usuarios Registrados</h2>
          <p className="text-2xl">{arrow}</p>
        </div>
        {isOpen && (
          <table className="w-full border-t border-zinc-800 mt-4">
            <thead>
              <tr>
                <th className="text-center px-2 py-2">Nombre</th>
                <th className="text-center px-2 py-2">Pases</th>
                <th className="text-center px-2 py-2">Estatus</th>
                <th className="text-center px-2 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-t border-zinc-800 font-normal text-center">
                  <td className="px-2 py-2">{ user.name }</td>
                  <td className="px-2 py-2">{ user.freePass ? <p className="text-green-500 horizontal-center text-2xl"><IoIosInfinite /></p> : user.admissions }</td>
                  <td className="px-2 py-2">
                    { user.status === "active" ?  <p className="text-green-500 horizontal-center text-2xl"><GoVerified /></p> : <p className="text-red-500 horizontal-center text-2xl"><CgCloseO /></p> }
                  </td>
                  <td className="px-2 py-2">
                    <button onClick={()=>handleDelete(user.id)} className="bg-red-500 rounded-3xl clickable px-4 py-2">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
