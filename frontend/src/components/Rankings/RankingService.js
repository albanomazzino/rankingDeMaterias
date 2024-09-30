const saveRanking = async (userRanking, token) => {
    try {
        const response = await fetch('http://localhost:8222/api/v1/rankings', {
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