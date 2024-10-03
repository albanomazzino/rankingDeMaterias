import { SCHOOLS_API_ENDPOINT_URL } from "../../constants";

export const fetchUniversities = async () => {
    try {
        const response = await fetch(`${SCHOOLS_API_ENDPOINT_URL}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};

export const fetchCareersByUniversity = async (universityId) => {
    try {
        const response = await fetch(`${SCHOOLS_API_ENDPOINT_URL}/${universityId}/careers`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching careers:', error);
        throw error;
    }
};


export const fetchSubjectsByCareer = async (careerId) => {
    try {
        const response = await fetch(`${SCHOOLS_API_ENDPOINT_URL}/careers/${careerId}/courses`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

