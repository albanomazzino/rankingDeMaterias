// src/components/Rankings/RankingView.js
import React from 'react';
import { Box, Button, Flex, Alert, AlertIcon } from '@chakra-ui/react';
import Subjects from './Subjects';

const RankingView = ({ subjects, onDragEnd, handleRankingSubmit, rankingSubmitted, setRankingMode, colorMode }) => {
    return (
        <Box width="100%" alignSelf="flex-start" mt={5}>
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
        </Box>
    );
};

export default RankingView;
