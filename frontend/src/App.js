import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    ChakraProvider,
    Box,
    Button,
    Select,
    Heading,
    Text,
    Flex,
    useColorMode,
    IconButton,
    VStack,
    Avatar,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { videoStyles, boxStyles, selectStyles, getItemStyle, getListStyle, selectOptionStyle } from './styles/styles';
import { UNS_MATTERS } from './constants';
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js';


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
        // Aquí puedes hacer el fetch a tu backend si deseas obtener las universidades desde allí
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
                                <>
                                    <Avatar src={user.picture} alt={user.name} size="sm" />
                                    <Text ml={2}>{user.name}</Text>
                                    <IconButton
                                        aria-label="Cerrar sesión"
                                        icon={<Icon path={mdiExitRun} size={1} />}
                                        onClick={handleSignOut}
                                        variant="outline"
                                        ml={2}
                                    />
                                </>
                            )}
                            <div id="signInDiv" style={{ marginLeft: '10px' }}></div>
                            <IconButton
                                aria-label="Toggle dark mode"
                                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                onClick={toggleColorMode}
                                variant="outline"
                                ml={2} // Espacio lateral
                            />
                        </Flex>
                    </Flex>

                    <VStack spacing={5}>
                        <Text fontSize="lg">Por favor, selecciona tu universidad y carrera para ordenar las materias.</Text>

                        <Select
                            width="300px"
                            onChange={handleUniversityChange}
                            focusBorderColor="black"
                            sx={selectStyles}
                        >
                            {universities.map((university, index) => (
                                <option 
                                    key={index} 
                                    value={university}
                                    style={selectOptionStyle}
                                >
                                    {university}
                                </option>
                            ))}
                            <option selected hidden disabled value="">Selecciona tu universidad</option>
                        </Select>

                        {selectedUniversity === "Universidad Nacional del Sur" && (
                            <Select
                                width="300px"
                                onChange={handleCareerChange}
                                focusBorderColor="white"
                                sx={selectStyles}
                            >
                                {Object.keys(UNS_MATTERS).map((career, index) => (
                                    <option 
                                        key={index} 
                                        value={career}
                                        style={selectOptionStyle}
                                    >
                                        {career}
                                    </option>
                                ))}
                                <option selected hidden disabled value="">Selecciona tu carrera</option>
                            </Select>
                        )}

                        {Object.keys(user).length !== 0 && selectedCareer && (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={{
                                                ...getListStyle(snapshot.isDraggingOver),
                                                width: '50%', // Set the width to 50%
                                                marginLeft: '0', // Align to the left
                                            }}
                                            {...provided.droppableProps}
                                        >
                                            {items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div>
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}
                                                            >
                                                                <Text as="span" fontWeight="bold" mr={2}>{index + 1}.</Text> {/* Fixed position number */}
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    </VStack>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
