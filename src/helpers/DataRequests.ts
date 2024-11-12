import axios from "axios";

const communicationsApi = "http://localhost:3005/communications";
const authApi = "http://localhost:3001/auth";
const gymsApi = "http://localhost:3005/gyms";
const usersApi = "http://localhost:3005/users";

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
