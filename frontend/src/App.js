import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    ChakraProvider,
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
import saveRanking from './components/Rankings/RankingService';
import { videoStyles, boxStyles } from './styles/styles';
import { fetchUniversities, fetchCareersByUniversity, fetchSubjectsByCareer } from './components/Schools/SchoolService';

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
    const { colorMode, toggleColorMode } = useColorMode();

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
        
        try {
            const subjectsData = await fetchSubjectsByCareer(careerId, userToken);
            setSubjects(subjectsData);
        } catch (error) {
            alert('Error loading subjects');
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

    const handleRankingSubmit = async () => {
        if (!user || !selectedCareerId || subjects.length === 0) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const rankedCourses = subjects.map((subject, index) => ({
            id: subject.id,
            name: subject.content,
            rank: index + 1,
        }));

        const userRanking = {
            id: { userId: user.id, careerId: selectedCareerId },
            rankedCourses: rankedCourses,
        };

        console.log('Ranking a enviar:', JSON.stringify(userRanking, null, 2));

        alert('Tu ranking ha sido enviado.');

        try {
            const savedRanking = await saveRanking(userRanking);
            console.log('Ranking guardado:', savedRanking);
            setRankingSubmitted(true);
        } catch (error) {
            alert('Error al guardar el ranking.');
        }
    };

    return (
        <ChakraProvider>
            <Box position="relative" minH="100vh">
                <video autoPlay muted loop style={videoStyles}>
                    <source src="/landing_bg.mp4" type="video/mp4" />
                </video>

                <Box sx={boxStyles(colorMode)}>
                    <Flex justify="space-between" align="center" mb={5}>
                        <Heading as="h1" size="xl" textAlign="center">Ranking de materias</Heading>
                        <Flex align="center">
                            {Object.keys(user).length !== 0 && (
                                <UserProfile user={user} onSignOut={handleSignOut} />
                            )}
                            <div id="signInDiv" style={{ marginLeft: '10px' }}></div>
                            <IconButton
                                aria-label="Toggle Dark Mode"
                                icon={colorMode === 'light' ? <MoonIcon color="white" /> : <SunIcon color="white" />}
                                onClick={toggleColorMode}
                                variant="outline"
                                ml={2}
                            />
                        </Flex>
                    </Flex>

                    <VStack spacing={5}>
                        <Text fontSize="lg">Por favor, selecciona tu universidad y carrera para ordenar las materias.</Text>

                        <UniversitySelect universities={universities} onChange={handleUniversityChange} />
                        
                        {selectedUniversity && (
                            <CareerSelect 
                                careers={careers}
                                onChange={handleCareerChange} 
                                value={selectedCareerId}
                            />
                        )}
                    </VStack>
                    {Object.keys(user).length !== 0 && selectedCareerId && (
                        <Box width="100%" alignSelf="flex-start" mt={5}>
                            <Subjects subjects={subjects} onDragEnd={onDragEnd} />
                            <Flex justifyContent="center" mt={4}>
                                <Button colorScheme="teal" onClick={handleRankingSubmit}>
                                    Rankear
                                </Button>
                            </Flex>
                            {rankingSubmitted && (
                                <Alert status="info" mt={4}>
                                    <AlertIcon />
                                    Tu ranking ha sido enviado!
                                </Alert>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
