import axios from "axios";

const communicationsApi = "http://localhost:3005/communications";
const authApi = "http://localhost:3001/auth";
const gymsApi = "http://localhost:3005/gyms";
const usersApi = "http://localhost:3005/users";
const suscriptionsApi = "http://localhost:3005/suscriptions";

const authInfo = () => {
    const token = sessionStorage.getItem('token');
    const gymId = sessionStorage.getItem('gymId');
    const slug = sessionStorage.getItem('slug');

    return { token, gymId, slug };
}


export const communicationsPost = async (data: any) => {
    const { token, gymId } = authInfo();
    const response = await axios.post(
        communicationsApi, 
        { ...data, gymId }, // Este es el payload del body
        { headers: { 'Authorization': `Bearer ${token}` } } // Los headers van en un objeto separado
    );
    
    return response;
};

export const communicationsGet = async (gymId: string) => {
    const { token } = authInfo();
    const response = await axios.get(
        `${communicationsApi}/${gymId}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aquí directamente
};

export const communicationsDelete = async (id: string) => {
    const { token, gymId } = authInfo();
    const response = await axios.delete(
        `${communicationsApi}/${id}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
            params: { gymId }
        }
    ).then(response => response.data);
    
    return response;
};

export const userRegister = async (data: any) => {
    const email = data.email;
    const name = `${data.name} ${data.surname}`;
    const password = data.password;

    const response = await axios.post(
        `${authApi}/register`,
        {
            email: email,
            name: name,
            password: password
        },
    );
    return response;
};

export const addUserToGym = async (gymId: string) => {
    const { token } = authInfo();
    try {
        const response = await axios.post(
            `${usersApi}`, 
            { gymId }, // Este es el payload del body
            { headers: { 'Authorization': `Bearer ${token}` } } // Los headers van en un objeto separado
        );
        
        if (response.status === 201) {
            console.log('User added to gym successfully');
            return true;
        }
    } catch (error) {
        console.error(error); // Manejo de errores aquí
    }
};

export const userLogin = async (data: any) => {
    const response = await axios.post(
        `${authApi}/login`,
        {
            email: data.email,
            password: data.password
        },
    );
    return response.data;
};

export const getGymInfo = async () => {
    const { token, slug } = authInfo();

    const response = await axios.get(
        `${gymsApi}/${slug}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aqui directamente
};

export const fetchGyms = async () => {
    const { token } = authInfo();
    const response = await axios.get(
        `${gymsApi}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;
}

export const createGym = async (data: any) => {
    const { token } = authInfo();
    const response = await axios.post(
        `${gymsApi}`, 
        { ...data }, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const usersGet = async () => {
    const { token, gymId } = authInfo();
    const response = await axios.get(
        `${gymsApi}/${gymId}/users`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aqui directamente
};

export const getUserById = async () => {
    const { token } = authInfo();
    const response = await axios.get(
        `${usersApi}/user`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;
}

export const logTraining = async () => {
    const { token } = authInfo();
    const response = await axios.post(
        `${usersApi}/log-training`, 
        {}, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const userPointsUpdate = async (points: number) => {
    const { token, } = authInfo();
    const response = await axios.patch(
        `${usersApi}/patch`, 
        { points }, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    console.log(response.data);
    return response.data;
}

export const createPlan = async (data: any) => {
    const { token, gymId } = authInfo();
    const response = await axios.post(
        `${suscriptionsApi}`, 
        { ...data, gymId }, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const getPlans = async () => {
    const { token, gymId } = authInfo();
    const response = await axios.get(
        `${suscriptionsApi}/${gymId}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aqui directamente
}

export const deletePlan = async (id: string) => {
    const { token, gymId } = authInfo();
    const response = await axios.delete(
        `${suscriptionsApi}/${id}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
            params: { gymId }
        }
    ).then(response => response.data);
    
    return response;
};