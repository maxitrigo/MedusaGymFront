import { CgCloseO } from "react-icons/cg";
import { GoVerified } from "react-icons/go";
import { IoIosInfinite } from "react-icons/io";
import { deleteUserGym, usersGet } from "../helpers/DataRequests";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [arrow, setArrow] = useState(<MdKeyboardArrowRight />);
  const navigate = useNavigate();
  const slug = sessionStorage.getItem("slug");

  const handleClick = async () => {
    usersGet().then((data) => {
      setUsers(data);
      console.log(data);
    });
    setArrow(isOpen ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />);
    setIsOpen(!isOpen);
  };

  const handleDelete = async (userId: string) => {
    const userInput = window.prompt(
      "Para eliminar este usuario, escriba 'eliminar' y confirme la acción:"
    );

    if (userInput && userInput.toLowerCase() === "eliminar") {
      const isConfirmed = window.confirm("¿Está seguro de que desea eliminar este usuario?");
      if (isConfirmed) {
        const response = await deleteUserGym(userId);
        if (response) {
          alert("Usuario eliminado con exito!");
          window.location.reload();
        }
      }
    }
  };

  const handleUserClick = (user: any) => {
    console.log("Usuario seleccionado:", user);
    // Realiza la acción deseada, como navegar a otra vista
    navigate(`/${slug}/user-profile`, { state: { user } });
  };

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
                <tr
                  key={user.id}
                  className="border-t border-zinc-800 font-normal text-center"
                >
                  <td
                    className="px-2 py-2 cursor-pointer text-blue-500"
                    onClick={() => handleUserClick(user)} // Pasamos el objeto user a la función
                  >
                    {user.name}
                  </td>
                  <td className="px-2 py-2">
                    {user.freePass ? (
                      <p className="text-green-500 horizontal-center text-2xl">
                        <IoIosInfinite />
                      </p>
                    ) : (
                      user.admissions
                    )}
                  </td>
                  <td className="px-2 py-2">
                    {user.status === "active" ? (
                      <p className="text-green-500 horizontal-center text-2xl">
                        <GoVerified />
                      </p>
                    ) : (
                      <p className="text-red-500 horizontal-center text-2xl">
                        <CgCloseO />
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 rounded-3xl clickable px-4 py-2"
                    >
                      Eliminar
                    </button>
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

