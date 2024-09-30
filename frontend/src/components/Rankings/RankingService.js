const saveRanking = async (userRanking) => {
    try {
        const response = await fetch('http://localhost:8222/rankings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRanking),
        });
        if (!response.ok) {
            throw new Error('Error en la creación del ranking');
        }
        return await response.json(); // Devuelve el ranking creado
    } catch (error) {
        console.error('Error al enviar el ranking:', error);
        throw error; // Propaga el error
    }
};

export default saveRanking;
