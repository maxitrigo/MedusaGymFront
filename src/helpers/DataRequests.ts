import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const communicationsApi = "http://localhost:3005/communications";
const authApi = "http://localhost:3001/auth";
const gymsApi = "http://localhost:3005/gyms";
const usersApi = "http://localhost:3005/users";
const subscriptionsApi = "http://localhost:3005/subscriptions";
const paymentsApi = "http://localhost:3000/payments"
const transactionsApi = "http://localhost:3000/transactions"

const authInfo = () => {
    const token = sessionStorage.getItem('token');
    const gymToken = sessionStorage.getItem('gymToken');
    const slug = sessionStorage.getItem('slug');

    return { token, gymToken, slug };
}


export const communicationsPost = async (data: any) => {
    const { token, gymToken } = authInfo();
    const response = await axios.post(
        communicationsApi, 
        { ...data, gymToken }, // Este es el payload del body
        { headers: { 'Authorization': `Bearer ${token} ${gymToken}` } } // Los headers van en un objeto separado
    );
    console.log(response);
    
    
    return response;
};

export const communicationsGet = async (gymToken: string) => {
    const { token } = authInfo();
    const response = await axios.get(
        `${communicationsApi}/${gymToken}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aquí directamente
};

export const communicationsDelete = async (id: string) => {
    const { token, gymToken } = authInfo();
    const response = await axios.delete(
        `${communicationsApi}/${id}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
            params: { gymToken }
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

export const addUserToGym = async (gymToken: string) => {
    const { token } = authInfo();
    try {
        const response = await axios.post(
            `${usersApi}`, 
            { gymToken }, // Este es el payload del body
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

export const updateGym = async (data: any) => {
    const { token, gymToken } = authInfo();
    const response = await axios.patch(
        `${gymsApi}/${gymToken}`, 
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
    const { token, gymToken } = authInfo();
    const response = await axios.get(
        `${gymsApi}/${gymToken}/users`, 
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
    const { token, gymToken } = authInfo();
    const response = await axios.post(
        `${subscriptionsApi}`, 
        { ...data, gymToken }, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const getPlans = async () => {
    const { token, gymToken } = authInfo();
    const response = await axios.get(
        `${subscriptionsApi}/${gymToken}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aqui directamente
}

export const deletePlan = async (id: string) => {
    const { token, gymToken } = authInfo();
    const response = await axios.delete(
        `${subscriptionsApi}/${id}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
            params: { gymToken }
        }
    ).then(response => response.data);
    
    return response;
};

export const createPayment = async (data: any) => {
    const { token, gymToken } = authInfo();
    const payment = {
        title: data.title,
        description: data.description,
        quantity: 1,
        unit_price: data.price,
        productId: data.id
    }
    const slug = `${authInfo().slug}/subscriptions`
    const response = await axios.post(`${paymentsApi}/subscriptions`,
        {
            payment,
            slug,
            gymToken
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    )
    return response.data
}

export const getTransactions = async () => {
    const { token, gymToken } = authInfo();
    const response = await axios.get(
        `${transactionsApi}/${gymToken}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            }
        }
    );
    
    return response.data;  // Ya estamos extrayendo la data aqui directamente
};

export const createTransaction = async (data: any) => {
    const { token, gymToken } = authInfo();
    const request = {
        clientId: data.userId,
        productId: data.productId,
        paymentType: data.paymentType,
        paymentId: uuidv4(),
        amount: data.amount,
        netAmount: data.amount,
    }
    const response = await axios.post(
        `${transactionsApi}`, 
        { ...request, gymToken }, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const deleteTransaction = async (id: string) => {
    const { token, gymToken } = authInfo();
    const response = await axios.delete(
        `${transactionsApi}/${id}`, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
            },
            params: { gymToken }
        }
    ).then(response => response.data);
    
    return response;
}

export const updateSubscription = async (data: any) => {
    const { token } = authInfo();
    const response = await axios.post(
        `${usersApi}/manual-update-subscription`, 
        { ...data }, // Aquí irían los datos en el cuerpo de la solicitud, si es necesario
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
}

