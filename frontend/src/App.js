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
    useToast,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import UserProfile from './components/Auth/UserProfile';
import UniversitySelect from './components/Rankings/UniversitySelect';
import CareerSelect from './components/Rankings/CareerSelect';
import saveRanking, { fetchUserRankingsByCareer } from './components/Rankings/RankingService';
import { getStyles, videoStyles } from './styles/styles';
import { fetchUniversities, fetchCareersByUniversity, fetchSubjectsByCareer } from './components/Schools/SchoolService';
import GeneralRankingView from './components/Rankings/GeneralRankingView';
import RankingView from './components/Rankings/RankingView';
import MyRankingsView from './components/Rankings/MyRankingsView';


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
    const [showMyRankings, setShowMyRankings] = useState(false);
    const [aggregatedRankings, setAggregatedRankings] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();
    const styles = getStyles(colorMode);

    const toast = useToast();

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
        renderUniversities();
    }, []);

    const renderUniversities = async() => {
        try {
            const universitiesData = await fetchUniversities();
            setUniversities(universitiesData);
        } catch (error) {
            console.log('Error loading universities');
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

    const handleUniversityChange = async (e) => {
        const universityId = e.target.value;  // no change here
        setSelectedUniversity(universityId);
        setCareers([]);
        setSelectedCareerId('');
        setSubjects([]);
        setAggregatedRankings([]);
    
        try {
            const careersData = await fetchCareersByUniversity(universityId);
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
                const rankingsData = await fetchUserRankingsByCareer(careerId);
                setAggregatedRankings(rankingsData);
            } else {
                const subjectsData = await fetchSubjectsByCareer(careerId);
                setSubjects(subjectsData);
            }
        } catch (error) {
            console.log("backend ensure JSON formats albano acordate dios santo");
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

            const updatedRankings = await fetchUserRankingsByCareer(selectedCareerId);
            setAggregatedRankings(updatedRankings);

            setRankingMode(false);
            setShowMyRankings(false);
        } catch (error) {
            alert('Error al guardar el ranking.');
        }   
    };

    const toggleRankingMode = async () => {
        if (Object.keys(user).length === 0) { 
            toast({
                title: "Please login first.",
                description: "You must be logged in to create or view rankings.",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setRankingMode(!rankingMode);
        
        if (!rankingMode) {
            if (!selectedCareerId) {
                alert('Please select a career first.');
                return;
            }
    
            try {
                const subjectsData = await fetchSubjectsByCareer(selectedCareerId);
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
                <Box
                    onClick={() => {
                        setShowMyRankings(false); 
                        setRankingMode(false)}
                    }
                    cursor="pointer"
                    _hover={{
                        opacity: 0.8,
                    }}
                    transition="opacity 0.3s ease, box-shadow 0.3s ease"
                >
                        <Heading as="h1" size="xl" textAlign="center" color={styles.boxStyles.color}>
                            Ranking de materias
                        </Heading>
                    </Box>
                    <Flex align="center">
                        {Object.keys(user).length !== 0 && (    
                            <UserProfile colormode={colorMode} user={user} onSignOut={handleSignOut} onClick={() => setShowMyRankings(true)}/>
                        )}
                        <div id="signInDiv" style={styles.signInStyles}></div>
                        <IconButton
                            aria-label="Toggle Dark Mode"
                            icon={colorMode === 'light' ? <MoonIcon color="black" /> : <SunIcon color="white" />}
                            onClick={toggleColorMode}
                            variant="outline"
                            ml={4}
                            color={styles.iconButtonStyles.color}
                            border={styles.iconButtonStyles.border}
                        />
                    </Flex>
                </Flex>

                {showMyRankings ? ( // Conditionally render MyRankingsView or the general view
                    <MyRankingsView user={user} token={userToken} setShowMyRankings={setShowMyRankings} colorMode={colorMode}/>
                ) : (
                <VStack spacing={5}>
                    <Text fontSize="lg" color={styles.boxStyles.color}>
                        Por favor, selecciona tu universidad y carrera para ordenar las materias.
                    </Text>

                    <UniversitySelect colorMode={colorMode} universities={universities} onChange={handleUniversityChange} />

                    {selectedUniversity && (
                        <CareerSelect
                            careers={careers}
                            onChange={handleCareerChange}
                            value={selectedCareerId}
                            colorMode={colorMode}
                        />
                    )}
                

                {selectedCareerId && (
                    <Box width="100%" alignSelf="flex-start" mt={5}>
                        {rankingMode ? (
                            <RankingView
                                subjects={subjects}
                                onDragEnd={onDragEnd}
                                handleRankingSubmit={handleRankingSubmit}
                                rankingSubmitted={rankingSubmitted}
                                setRankingMode={setRankingMode}
                                colorMode={colorMode}
                            />
                        ) : (
                            <GeneralRankingView
                                colorMode={colorMode}
                                aggregatedRankings={aggregatedRankings}
                                toggleRankingMode={toggleRankingMode}
                            />
                        )}
                    </Box>
                )}
                </VStack>
                )}
                
            </Box>
        </Box>
    );
}

export default App;
