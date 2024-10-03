import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Select,
    VStack,
    Text,
    Button,
} from '@chakra-ui/react';
import { fetchAllUserRankings } from './RankingService';

const MyRankingsView = ({ user, token, setShowMyRankings }) => {
    const [userRankings, setUserRankings] = useState({});
    const [selectedCareerId, setSelectedCareerId] = useState('');
    const [selectedRanking, setSelectedRanking] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const rankingsData = await fetchAllUserRankings(user.sub, token);
                setUserRankings(rankingsData);
                // Automatically select the first career when the data is fetched
                const firstCareerId = Object.keys(rankingsData)[0];
                setSelectedCareerId(firstCareerId);
                setSelectedRanking(rankingsData[firstCareerId]);
            } catch (error) {
                alert('Error loading user rankings');
            }
        };
        fetchRankings();
    }, [user.sub, token]);

    const handleCareerChange = (e) => {
        const careerId = e.target.value;
        setSelectedCareerId(careerId);
        setSelectedRanking(userRankings[careerId]);
    };

    return (
        <Box width="100%" p={5}>
            <VStack spacing={5}>
                <Heading as="h2" size="lg">
                    Mis Rankings
                </Heading>
                <Text>Selecciona una carrera para ver tu ranking:</Text>
                <Select value={selectedCareerId} onChange={handleCareerChange}>
                    {Object.keys(userRankings).map((careerId) => (
                        <option key={careerId} value={careerId}>
                            {careerId} {/* You might want to fetch career names to display here */}
                        </option>
                    ))}
                </Select>

                {selectedRanking && selectedRanking.length > 0 ? (
                    <VStack spacing={0} align="left" width="100%">
                        {selectedRanking.map((subject) => (
                            <Text key={subject.courseName}>
                                {subject.position}. {subject.courseName}
                            </Text>
                        ))}
                    </VStack>
                ) : (
                    <Text>No hay ranking disponible para esta carrera.</Text>
                )}

                <Button colorScheme="blue" onClick={() => setShowMyRankings(false)}>
                    Volver a la vista general
                </Button>
            </VStack>
        </Box>
    );
};

export default MyRankingsView;
