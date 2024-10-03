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
import { getStyles } from '../../styles/styles';

const MyRankingsView = ({ user, token, setShowMyRankings, colorMode }) => {
    const [userRankings, setUserRankings] = useState({});
    const [selectedCareerId, setSelectedCareerId] = useState('');
    const [selectedRanking, setSelectedRanking] = useState([]);
    
    const styles = getStyles(colorMode); 

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const rankingsData = await fetchAllUserRankings(user.sub, token);
                if (Object.keys(rankingsData).length === 0) {
                    setUserRankings({});
                    setSelectedCareerId('');
                    setSelectedRanking([]);
                } else {
                    setUserRankings(rankingsData);
                    const firstCareerId = Object.keys(rankingsData)[0];
                    setSelectedCareerId(firstCareerId);
                    setSelectedRanking(rankingsData[firstCareerId].rankedCourses);
                }
            } catch (error) {
                console.log("backend ensure JSON formats albano acordate dios santo");
            }
        };
        fetchRankings();
    }, [user.sub, token]);

    const handleCareerChange = (e) => {
        const careerId = e.target.value;
        setSelectedCareerId(careerId);
        setSelectedRanking(userRankings[careerId].rankedCourses);
    };

    return (
        <Box width="100%" p={5} style={styles.getListStyle(false)}>
            <VStack spacing={5}>
                <Heading as="h2" size="lg">
                    Mis Rankings
                </Heading>

                {Object.keys(userRankings).length === 0 ? (
                    <Text>No has emitido ningún ranking para ninguna carrera.</Text>
                ) : (
                    <>
                        <Text>Selecciona una carrera para ver tu ranking:</Text>
                        <Select value={selectedCareerId} onChange={handleCareerChange} {...styles.selectStyles}>
                            {Object.keys(userRankings).map((careerId) => (
                                <option key={careerId} value={careerId} style={styles.selectOptionStyle}>
                                    {careerId} {/* You might want to fetch career names to display here */}
                                </option>
                            ))}
                        </Select>

                        {selectedRanking && selectedRanking.length > 0 ? (
                            <Box width="100%" alignSelf="flex-start" mt={5} style={styles.getListStyle(false)}>
                                <VStack spacing={0} align="stretch">
                                    {selectedRanking.map((subject, index) => (
                                        <Box width="100%" key={index} style={styles.getSubjectStyle({}, false)}>
                                            <Text as="span" fontWeight="bold" mr={2}>
                                                {subject.position}.
                                            </Text>
                                            {subject.courseName}
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        ) : (
                            <Text>No hay ranking disponible para esta carrera.</Text>
                        )}
                    </>
                )}

                <Button colorScheme="teal" onClick={() => setShowMyRankings(false)}>
                    Volver a la vista general
                </Button>
            </VStack>
        </Box>
    );
};

export default MyRankingsView;
