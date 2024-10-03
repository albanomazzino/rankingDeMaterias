import { RANKINGS_API_ENDPOINT_URL } from "../../constants";

const saveRanking = async (userRanking, token) => {
    try {
        const response = await fetch(`${RANKINGS_API_ENDPOINT_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userRanking),
        });
        if (!response.ok) {
            throw new Error('Error en la creación del ranking');
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error al enviar el ranking:', error);
        throw error; 
    }
};

export default saveRanking;

export const fetchUserRankingsByCareer = async (careerId) => {
    const response = await fetch(`${RANKINGS_API_ENDPOINT_URL}/career/${careerId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        if (response.status === 204) {
            return {};
        } 
        throw new Error(`Error fetching rankings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export const fetchAllUserRankings = async (userId, token) => {
    const response = await fetch(`${RANKINGS_API_ENDPOINT_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 204) {
            return {};
        } 
        throw new Error(`Error fetching rankings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};
