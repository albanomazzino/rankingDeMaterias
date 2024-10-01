import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    Box,
    Heading,
    IconButton,
    Text,
    Flex,
    useColorMode,
    VStack,
    Button,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import UserProfile from './components/Auth/UserProfile';
import UniversitySelect from './components/Rankings/UniversitySelect';
import CareerSelect from './components/Rankings/CareerSelect';
import Subjects from './components/Rankings/Subjects';
import saveRanking, { fetchUserRankingsByCareer } from './components/Rankings/RankingService';
import { getStyles, videoStyles } from './styles/styles';
import { fetchUniversities, fetchCareersByUniversity, fetchSubjectsByCareer } from './components/Schools/SchoolService';
import AggregatedRankings from './components/Rankings/AggregatedRankings';

const google = window.google;

function App() {
    const [user, setUser] = useState({});
    const [userToken, setUserToken] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [careers, setCareers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [selectedCareerId, setSelectedCareerId] = useState('');
    const [rankingSubmitted, setRankingSubmitted] = useState(false);
    const [rankingMode, setRankingMode] = useState(false);
    const [aggregatedRankings, setAggregatedRankings] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();
    const styles = getStyles(colorMode);

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    useEffect(() => {
        if (userToken && userToken.length > 0) {
            renderUniversities(userToken);
        }
    }, [userToken]);

    const renderUniversities = async() => {
        try {
            const universitiesData = await fetchUniversities(userToken);
            setUniversities(universitiesData);
        } catch (error) {
            alert('Error loading universities');
        }
    }
    
    function handleCallBackResponse(response) {
        const token = response.credential;
        const userObject = jwtDecode(token);
        setUser(userObject);
        setUserToken(token);
        console.log(token);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut() {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    const handleUniversityChange = async(e) => {
        const universityId = e.target.value;
        setSelectedUniversity(universityId);
        setCareers([]);
        setSelectedCareerId('');
        setSubjects([]);
        setAggregatedRankings([]);

        try {
            const careersData = await fetchCareersByUniversity(universityId, userToken);
            setCareers(careersData);

        } catch (error) {
            alert('Error loading careers');
        }
    };

    const handleCareerChange = async(e) => {
        const careerId = e.target.value;
        setSubjects([]);
        setSelectedCareerId(careerId);
        setRankingSubmitted(false);
        
        try {
            if (!rankingMode) {
                const rankingsData = await fetchUserRankingsByCareer(careerId, userToken);
                setAggregatedRankings(rankingsData);
            } else {
                const subjectsData = await fetchSubjectsByCareer(careerId, userToken);
                setSubjects(subjectsData);
            }
        } catch (error) {
            alert('Error loading data');
        }
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedSubjects = reorder(subjects, result.source.index, result.destination.index);
        setSubjects(reorderedSubjects);
    };

    const printAss = () => {
        console.log("AAAAAAAAAAAAA");
    };

    const handleRankingSubmit = async () => {
        if (Object.keys(user).length === 0|| !selectedCareerId || subjects.length === 0) {
            alert('Por favor asegurate de estar logueado y haber establecido un orden para todas las materias.');
            return;
        }

        const rankedCourses = subjects.map((subject, index) => ({
            position: index + 1,
            courseName: subject.name,
        }));
        

        const userRanking = {
            id: { userId: user.sub, careerId: selectedCareerId },
            rankedCourses: rankedCourses,
        };


        try {
            const savedRanking = await saveRanking(userRanking, userToken);
            setRankingSubmitted(true);
            setRankingMode(false);
        } catch (error) {
            alert('Error al guardar el ranking.');
        }
    };

    const toggleRankingMode = async () => {
        setRankingMode(!rankingMode);
        
        if (!rankingMode) {
            if (!selectedCareerId) {
                alert('Please select a career first.');
                return;
            }
    
            try {
                const subjectsData = await fetchSubjectsByCareer(selectedCareerId, userToken);
                setSubjects(subjectsData);
            } catch (error) {
                alert('Error fetching subjects.');
            }
        }
    };
      

    return (
        <Box position="relative" minH="100vh">
            <video autoPlay muted loop style={videoStyles}>
                <source src="/landing_bg.mp4" type="video/mp4" />
            </video>

            <Box sx={styles.boxStyles}>
                <Flex justify="space-between" align="center" mb={5}>
                    <Heading as="h1" size="xl" textAlign="center" color={styles.boxStyles.color}>
                        Ranking de materias
                    </Heading>
                    <Flex align="center">
                        {Object.keys(user).length !== 0 && (    
                            <UserProfile colormode={colorMode} user={user} onSignOut={handleSignOut} />
                        )}
                        <div id="signInDiv" style={styles.signInStyles}></div>
                        <IconButton
                            aria-label="Toggle Dark Mode"
                            icon={colorMode === 'light' ? <MoonIcon color="black" /> : <SunIcon color="white" />}
                            onClick={toggleColorMode}
                            variant="outline"
                            ml={4}
                        />
                    </Flex>
                </Flex>

                <VStack spacing={5}>
                    <Text fontSize="lg" color={styles.boxStyles.color}>
                        Por favor, selecciona tu universidad y carrera para ordenar las materias.
                    </Text>

                    {/* Pass colorMode to the select component */}
                    <UniversitySelect colorMode={colorMode} universities={universities} onChange={handleUniversityChange} />

                    {selectedUniversity && (
                        <CareerSelect
                            careers={careers}
                            onChange={handleCareerChange}
                            value={selectedCareerId}
                            colorMode={colorMode}
                        />
                    )}
                </VStack>

                {Object.keys(user).length !== 0 && selectedCareerId && (
                    <Box width="100%" alignSelf="flex-start" mt={5}>
                        {rankingMode ? (
                            <>
                                <Subjects subjects={subjects} onDragEnd={onDragEnd} colorMode={colorMode} />
                                <Flex justifyContent="center" mt={4}>
                                    <Button colorScheme="teal" onClick={handleRankingSubmit}>
                                        Rankear
                                    </Button>
                                </Flex>
                                {rankingSubmitted && (
                                    <Alert status="info" mt={4}>
                                        <AlertIcon />
                                        Your ranking has been submitted!
                                    </Alert>
                                )}
                                <Flex justifyContent="center" mt={4}>
                                    <Button colorScheme="gray" onClick={() => setRankingMode(false)}>
                                        View Current Ranking
                                    </Button>
                                </Flex>
                            </>
                        ) : (
                            <>
                                <Flex direction="column" align="center" width="100%">
                                    <Text fontSize="xl" fontWeight="bold" color={styles.boxStyles.color} mt={4}>
                                        Ranking por experiencia general
                                    </Text>
                                    <AggregatedRankings colorMode={colorMode} rankings={aggregatedRankings} />
                                    <Flex justifyContent="center" mt={4}>
                                        <Button colorScheme="teal" onClick={toggleRankingMode}>
                                            Let me rank
                                        </Button>
                                    </Flex>
                                </Flex>
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default App;
