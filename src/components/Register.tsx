import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../Redux/userSlice";
import { setGymInfo } from "../Redux/gymSlice";
import { addUserToGym, checkLogin, getGymInfo, userRegister } from "../helpers/DataRequests";
import { GoEye, GoEyeClosed } from "react-icons/go";

export const Register: React.FC = () => {
    const { gymSlug }: any = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controlar la visibilidad del modal

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(event.target.checked);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const allFieldsFilled = Object.values(userData).every((value) => value.trim() !== "");
        if (!allFieldsFilled) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!termsAccepted) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        sessionStorage.setItem('slug', gymSlug);
        try {
            const response = await userRegister(userData);
            const responseData = response.data;
            const user = {
                token: responseData.token,
                role: 'user',
                name: userData.name,
                email: userData.email,
            };
            dispatch(login(user));

            const currentSlug = sessionStorage.getItem('slug');
            if (currentSlug === 'auth' || currentSlug === 'undefined') {
                navigate('/');
                return;
            }

            let gymInfo = await getGymInfo();
            if (!gymInfo) {
                sessionStorage.setItem('slug', 'default');
                gymInfo = await getGymInfo();
            }

            if (gymInfo) {
                const addUser = await addUserToGym(gymInfo.gymToken);
                if (addUser) {
                    dispatch(setGymInfo(gymInfo));
                    const response = await checkLogin();
                    if (response) {
                        return navigate(`/${gymSlug === 'default' ? 'default' : gymSlug}/home`);
                    }
                }
            }

            alert('Error al agregar el usuario al gimnasio.');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <input 
                    onChange={handleInput} 
                    name="email" 
                    className="rounded-2xl outline-none border-none py-1 px-4" 
                    type="text" 
                    placeholder="Email" 
                />
                <input 
                    onChange={handleInput} 
                    name="name" 
                    className="rounded-2xl outline-none border-none py-1 px-4" 
                    type="text" 
                    placeholder="Nombre" 
                />
                <input 
                    onChange={handleInput} 
                    name="surname" 
                    className="rounded-2xl outline-none border-none py-1 px-4" 
                    type="text" 
                    placeholder="Apellido" 
                />
                <div className="relative w-full">
                    <input 
                        onChange={handleInput} 
                        name="password" 
                        className="rounded-2xl outline-none border-none py-1 px-4 w-full" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Contraseña" 
                    />
                    <span 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <GoEyeClosed className="text-zinc-400" /> : <GoEye className="text-zinc-400" />}
                    </span>
                </div>
                <div className="relative w-full">
                    <input 
                        onChange={handleInput} 
                        name="confirmPassword" 
                        className="rounded-2xl outline-none border-none py-1 px-4 w-full" 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirmar contraseña" 
                    />
                    <span 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showConfirmPassword ? <GoEyeClosed className="text-zinc-400" /> : <GoEye className="text-zinc-400" />}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        checked={termsAccepted} 
                        onChange={handleTermsChange} 
                    />
                    <label htmlFor="terms" className="text-sm text-white ">
                        <p>Acepto los</p>
                        <button 
                            type="button" 
                            onClick={openModal} 
                            className="text-blue-500"
                        >
                            términos y condiciones
                        </button>
                    </label>
                </div>
                <button className="button-primary">Registrarse</button>
            </form>

            {/* Modal de términos y condiciones */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                        <h2 className="text-xl font-bold">Términos y Condiciones</h2>
                        <div className="mt-4 h-96 overflow-y-scroll">
                            <p>1. ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES
La aceptación de estos Términos y Condiciones es un requisito indispensable para el acceso y uso del software de administración de gimnasios (en adelante, "el Software"). El acceso, uso o interacción con el Software implica que el Usuario ha leído, entendido y aceptado en su totalidad todas las disposiciones contenidas en este documento. La aceptación será igualmente válida en caso de modificaciones posteriores a los Términos y Condiciones, los cuales podrán ser actualizados o modificados sin previo aviso, siendo responsabilidad del Usuario revisar periódicamente este documento.

El uso continuado del Software, aun tras la modificación de estos Términos, implica la aceptación de las modificaciones realizadas. En caso de que el Usuario no esté de acuerdo con las condiciones modificadas, deberá cesar de inmediato el uso del Software y eliminar cualquier acceso a él.

2. DESCRIPCIÓN GENERAL DEL SOFTWARE
El Software es una solución tecnológica avanzada diseñada para la gestión integral de gimnasios, proporcionando herramientas completas y eficientes para facilitar la administración de diversas áreas operativas. Las funcionalidades principales incluyen:

Gestión de Reservas: Permite a los usuarios gestionar y reservar clases, equipos y espacios dentro de las instalaciones del gimnasio, optimizando el uso de los recursos disponibles.
Control de Acceso: Facilita el registro y control de accesos a las instalaciones mediante sistemas electrónicos, garantizando la seguridad y el cumplimiento de las normativas.
Administración de Membresías: Ofrece herramientas para gestionar las suscripciones de los usuarios, desde la creación de membresías hasta la renovación, cancelación y modificaciones de los planes.
Generación de Reportes: Proporciona reportes detallados sobre el desempeño del gimnasio, incluyendo estadísticas de ingresos, asistencia, ocupación de clases, etc.
Facturación y Finanzas: Gestión de cobros, pagos, facturación automática, y emisión de recibos a los usuarios, integrando pagos electrónicos y gestionando los flujos de caja.
Estas características pueden estar sujetas a cambios, mejoras o supresiones en cualquier momento, sin necesidad de notificación previa, a discreción exclusiva del Proveedor. El Usuario acepta que el Proveedor no está obligado a proporcionar ninguna compensación por las modificaciones, eliminación de funciones, o cambios en los servicios proporcionados.

3. MODIFICACIONES Y ACTUALIZACIONES
El Proveedor se reserva el derecho de modificar, suspender, actualizar o descontinuar cualquier funcionalidad, característica o acceso del Software, total o parcialmente, en cualquier momento y sin previo aviso. Asimismo, podrá modificar los Términos y Condiciones de este contrato a su discreción. Estas modificaciones serán efectivas inmediatamente después de su publicación en la plataforma, y es responsabilidad del Usuario revisar periódicamente estos Términos para estar al tanto de cualquier cambio.

La utilización continuada del Software, posterior a la publicación de las modificaciones, constituye la aceptación irrevocable y plena de dichas modificaciones. El Usuario reconoce y acepta que el Proveedor no será responsable por interrupciones del servicio o problemas derivados de la modificación o descontinuación de cualquier función del Software.

4. LICENCIA Y USO PERMITIDO
4.1 Licencia Limitada: El Proveedor otorga al Usuario una licencia no exclusiva, intransferible, revocable y no sublicenciable para utilizar el Software exclusivamente con los fines establecidos en este Contrato y en la forma descrita en los Términos y Condiciones. Esta licencia está limitada al uso personal y/o profesional dentro del marco de la gestión del gimnasio, conforme a las funcionalidades permitidas por el Software.

4.2 Prohibiciones: El Usuario se compromete a no realizar ninguna de las siguientes actividades:

Descompilar, modificar, adaptar, traducir, desensamblar, o realizar ingeniería inversa del Software.
Reproducir, distribuir, vender, sublicenciar o ceder de cualquier otra forma los derechos de uso del Software sin la autorización escrita del Proveedor.
Utilizar el Software para fines ilícitos, fraudulentos, o para cometer cualquier tipo de actividad que infrinja derechos de propiedad intelectual, privacidad o seguridad de terceros.
4.3 Revocación de Licencia: El Proveedor se reserva el derecho de revocar la licencia otorgada al Usuario en caso de violación de los Términos y Condiciones, sin derecho a reembolso o compensación alguna. En dicho caso, el Usuario deberá cesar inmediatamente el uso del Software.

5. LIMITACIONES Y EXONERACIÓN DE RESPONSABILIDAD
5.1 Uso Bajo Propio Riesgo: El Usuario reconoce que el uso del Software se realiza bajo su propio riesgo y responsabilidad. El Proveedor no será responsable por daños directos, indirectos, incidentales, especiales, consecuenciales o punitivos derivados del uso o la imposibilidad de uso del Software, incluyendo, pero no limitado a, pérdida de datos, interrupción del negocio, lucro cesante, acceso no autorizado, y cualquier otro daño económico, operativo o de reputación.

5.2 Condiciones del Software: El Software se proporciona "tal cual" y "según disponibilidad", sin ninguna garantía, ya sea explícita o implícita, de idoneidad para un propósito particular, comercialización, calidad, o compatibilidad con las necesidades del Usuario. El Proveedor no garantiza que el Software estará libre de errores, interrupciones o fallos, ni que funcionará ininterrumpidamente.

5.3 Exoneración de Responsabilidad por Datos: El Proveedor no será responsable por la pérdida, corrupción, o acceso no autorizado a los datos ingresados en el Software. El Usuario es el único responsable de mantener copias de seguridad de toda la información almacenada en el Software.

6. OBLIGACIONES Y RESPONSABILIDADES DEL USUARIO
6.1 Uso Ético y Legal: El Usuario se compromete a utilizar el Software de manera ética, responsable y conforme a las leyes vigentes. Esto incluye la responsabilidad de garantizar la veracidad, precisión y legalidad de los datos que ingrese al Software, y que no infrinja derechos de propiedad intelectual, privacidad u otros derechos de terceros.

6.2 Seguridad de la Cuenta: El Usuario es responsable de mantener la confidencialidad de sus credenciales de acceso, así como de las medidas de seguridad necesarias para proteger sus datos y dispositivos utilizados en la plataforma.

6.3 Uso Fraudulento o Ilegal: El uso indebido, no autorizado, fraudulento o ilegal del Software resultará en la suspensión inmediata de los servicios, sin perjuicio de otras acciones legales que el Proveedor considere pertinentes.

7. PROPIEDAD INTELECTUAL
El Software, incluyendo su diseño, estructura, código fuente, gráficos, logos, y cualquier otro contenido asociado, es propiedad exclusiva del Proveedor o de sus licenciantes. Todos los derechos de propiedad intelectual relacionados con el Software están protegidos por leyes nacionales e internacionales de derechos de autor, marcas registradas y otros derechos de propiedad intelectual.

El Usuario no adquiere ningún derecho sobre el Software o sus componentes, excepto los derechos expresamente concedidos en este Contrato. Cualquier reproducción no autorizada del Software será considerada una violación de los derechos de propiedad intelectual y podrá ser perseguida legalmente.

8. SERVICIOS DE TERCEROS
El Software puede integrar servicios de terceros, tales como procesadores de pagos, plataformas de almacenamiento en la nube o sistemas de comunicación. El Proveedor no asume ninguna responsabilidad por la disponibilidad, funcionamiento, seguridad o legalidad de dichos servicios de terceros. El uso de estos servicios estará sujeto a sus propios Términos y Condiciones.

9. PRIVACIDAD Y PROTECCIÓN DE DATOS
9.1 Protección de Datos Personales: El tratamiento de datos personales en el Software se regirá por la Política de Privacidad del Proveedor. El Usuario será responsable de obtener cualquier consentimiento necesario para el procesamiento de datos personales de terceros, garantizando el cumplimiento con las leyes de protección de datos aplicables.

9.2 Seguridad de los Datos: El Proveedor implementará medidas razonables de seguridad para proteger los datos almacenados en el Software. Sin embargo, el Proveedor no será responsable por daños o pérdidas derivados de violaciones de seguridad, ataques maliciosos o errores humanos en la gestión de los datos.

10. CANCELACIÓN Y TERMINACIÓN DE SERVICIOS
El Proveedor podrá suspender o cancelar el acceso del Usuario al Software, temporal o permanentemente, por cualquier motivo, incluyendo incumplimiento de estos Términos, razones comerciales o técnicas, o cuando lo considere oportuno. En cualquier caso, el Usuario no tendrá derecho a recibir reembolsos por pagos efectuados antes de la cancelación.

11. INTERPRETACIÓN Y RESOLUCIÓN DE DISPUTAS
11.1 Interpretación: En caso de que exista ambigüedad o contradicción en la interpretación de los Términos y Condiciones, se considerará la interpretación más favorable al Proveedor.

11.2 Jurisdicción: Cualquier disputa derivada del presente Contrato será sometida exclusivamente a los tribunales competentes de Canelones, Uruguay, renunciando el Usuario a cualquier otro fuero o jurisdicción que le pudiera corresponder.

12. FUERZA MAYOR
El Proveedor no será responsable por el incumplimiento de sus obligaciones derivadas de circunstancias fuera de su control, tales como desastres naturales, conflictos laborales, interrupciones de servicios públicos o ataques cibernéticos.

13. DISPOSICIONES GENERALES
Este Contrato constituye el acuerdo completo entre las partes y reemplaza cualquier entendimiento previo. Si alguna disposición es considerada inválida o inaplicable, las demás disposiciones seguirán siendo válidas y aplicables.

14. DECLARACIÓN FINAL
El Usuario declara haber leído, comprendido y aceptado en su totalidad los Términos y Condiciones. Además, entiende que cualquier interpretación favorable al Proveedor será priorizada para la resolución de disputas y situaciones ambiguas.</p>
                            {/* Puedes reemplazar el contenido de los términos con el contenido real */}
                        </div>
                        <button 
                            onClick={closeModal} 
                            className="mt-4 button-primary"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
