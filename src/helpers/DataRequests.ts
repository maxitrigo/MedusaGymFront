import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const microAuth = 'http://backend:3001'
const microTrans = 'http://localhost:3000'
const microGym = 'http://localhost:3005'

const authApi = `${microAuth}/auth`;
const paymentsApi = `${microTrans}/payments`
const transactionsApi = `${microTrans}/transactions`
const gymsApi = `${microGym}/gyms`;
const usersApi = `${microGym}/users`;
const subscriptionsApi = `${microGym}/subscriptions`;
const gymMembershipApi = `${microGym}/gym-membership`;
const workoutsApi = `${microGym}/workouts`
const communicationsApi = `${microGym}/communications`;

export const authInfo = () => {
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

export const changePassword = async (data: any) => {
    const { token } = authInfo()
    const currentPassword = data.currentPassword
    const newPassword = data.newPassword
    try {
        const response = await axios.post(
            `${authApi}/change-password`,
            {
                currentPassword,
                newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Añadir el token si es necesario
                },
            }
        );
        if (response.status === 201) {
            return true;
        }
    } catch (error) {
        console.log(error);
        throw new Error ('No se pudo cambiar la contraseña')
    }
}

export const requestPasswordReset = async (data: any) => {
    try {
        const response = await axios.post(`${authApi}/request-password-reset`, 
            {
                email: data.email
            })
        if( response.status === 201 ) {
            return true
        }
    } catch (error) {
        console.log(error);
        throw new Error ('Email Invalido')
    }
}

export const resetPassword = async (token: string, password: string) => {
    try {
        const response = await axios.post(`${authApi}/reset-password`, 
            {
                resetToken: token,
                newPassword:password
            })
        if( response.status === 201 ) {
            return true
        }
    } catch (error) {
        console.log(error);
        throw new Error ('Token Invalido')
    }
}

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

export const deleteGym = async () => {
    const { token, gymToken } = authInfo();
    const response = await axios.delete(
        `${gymsApi}/${gymToken}`, 
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

export const deleteUser = async () => {
    const { token } = authInfo()
    try {
        const response = await axios.delete(`${usersApi}/deleteUser`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export const logTraining = async ( token: any) => {
    // const { token } = authInfo();
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
export const getGlobalPlans = async () => {
    const { token } = authInfo();
    const response = await axios.get(
        `${gymMembershipApi}`, 
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
    const slug = `${authInfo().slug}`
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
        clientId: 'cajero',
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

export const getGymMetrics = async () => {
    const { token, gymToken } = authInfo(); // Suponiendo que authInfo() te da el token de autenticación
    try {
        const response = await axios.get(`${gymsApi}/${gymToken}/metrics`, {
            headers: { 'Authorization': `Bearer ${token}` }, // El token de autenticación en el header
        });

        return response.data;
    } catch (error) {
        console.error('Error al obtener las métricas del gimnasio:', error);
        throw new Error('No se pudieron obtener las métricas del gimnasio.');
    }
};

export const getFunctionalWorkout = async (level: string) => {
    const { token } = authInfo()
    const frequency = 1
    try {
        const response = await axios.post(`${workoutsApi}/functionalWorkout`,
            {
                level,
                frequency
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener la rutina');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const getBodyWeightWorkout = async (level: string) => {
    const { token } = authInfo()
    const frequency = 1
    try {
        const response = await axios.post(`${workoutsApi}/bodyweightWorkout`,
            {
                level,
                frequency
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener la rutina');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const getCrossfitWorkout = async (level: string) => {
    const { token } = authInfo()
    const frequency = 1
    try {
        const response = await axios.post(`${workoutsApi}/crossfitWorkout`,
            {
                level,
                frequency
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener la rutina');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const getGymWorkout = async (level: string, goal: string, frequency: number) => {
    const { token } = authInfo()
    try {
        const response = await axios.post(`${workoutsApi}/gymWorkout`,
            {
                goal,
                level,
                frequency
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener la rutina');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const saveGymWorkout = async (data: any) => {
    const { token } = authInfo()
    try {
        const response = await axios.post(`${workoutsApi}/saveGymWorkout`,
            {
                ...data
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener la rutina');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const getUserWorkouts = async () => {
    const { token } = authInfo()
    try {
        const response = await axios.get(`${workoutsApi}/userWorkouts`,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener las rutinas');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const deleteWorkout = async (workoutId: string) => {
    const { token } = authInfo()
    try {
        const response = await axios.delete(`${workoutsApi}/${workoutId}`,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log('Error al obtener las rutinas');
        throw new Error('No se pudieron obtener las rutinas')
    }
}

export const checkOwnership = async () => {
    const { token, gymToken} = authInfo()
    try {
        const response = await axios.post(`${gymsApi}/checkOwnership`,
            {
                gymToken
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const checkLogin = async () => {
    const { token, gymToken} = authInfo()
    try {
        const response = await axios.post(`${usersApi}/checkLogin`,
            {
                gymToken
            } ,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const deleteUserGym = async (userId: string) => {
    const { token, gymToken } = authInfo()
    try {
        const response = await axios.patch(`${usersApi}/deleteUserGym`, {
            userId,
            gymToken
        }, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}
