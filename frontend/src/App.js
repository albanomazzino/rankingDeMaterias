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
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import UserProfile from './components/Auth/UserProfile';
import UniversitySelect from './components/Rankings/UniversitySelect';
import CareerSelect from './components/Rankings/CareerSelect';
import DragDropList from './components/Rankings/DragDropList';
import { videoStyles, boxStyles } from './styles/styles';
import { UNS_MATTERS } from './constants';

const google = window.google;

function App() {
    const [user, setUser] = useState({});
    const [universities] = useState(["Universidad Nacional del Sur", "Universidad Nacional de La Plata"]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [selectedCareer, setSelectedCareer] = useState('');
    const [items, setItems] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();

    function handleCallBackResponse(response) {
        const token = response.credential;
        const userObject = jwtDecode(token);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        fetchUniversities(token);
    }

    function handleSignOut() {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    function fetchUniversities(token) {
        // Fetch universities if needed
    }

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

    const handleUniversityChange = (e) => {
        setSelectedUniversity(e.target.value);
        setSelectedCareer('');
        setItems([]); // Clear items when university changes
    };

    const handleCareerChange = (e) => {
        const career = e.target.value;
        setSelectedCareer(career);
        if (career && selectedUniversity === "Universidad Nacional del Sur") {
            setItems([...UNS_MATTERS[career]]);
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
        const reorderedItems = reorder(items, result.source.index, result.destination.index);
        setItems(reorderedItems);
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
                                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                onClick={toggleColorMode}
                                variant="outline"
                                ml={2}
                            />
                        </Flex>
                    </Flex>

                    <VStack spacing={5}>
                        <Text fontSize="lg">Por favor, selecciona tu universidad y carrera para ordenar las materias.</Text>

                        <UniversitySelect universities={universities} onChange={handleUniversityChange} />
                        
                        {selectedUniversity === "Universidad Nacional del Sur" && (
                            <CareerSelect 
                                careers={Object.keys(UNS_MATTERS)} 
                                onChange={handleCareerChange} 
                            />
                        )}

                        {Object.keys(user).length !== 0 && selectedCareer && (
                            <DragDropList items={items} onDragEnd={onDragEnd} />
                        )}
                    </VStack>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;