import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import AggregatedRankings from './AggregatedRankings';

const GeneralRankingView = ({ colorMode, aggregatedRankings, toggleRankingMode }) => {
    return (
        <Flex direction="column" align="center" width="100%">
            <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? 'black' : 'white'} mt={4}>
                Ranking por experiencia general
            </Text>

            {aggregatedRankings && aggregatedRankings.length > 0 ? (
                <AggregatedRankings colorMode={colorMode} rankings={aggregatedRankings} />
            ) : (
                <Text mt={4} color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
                    No hay un ranking para esta carrera aún. Puedes rankear para cambiar la situación!
                </Text>
            )}

            <Flex justifyContent="center" mt={4}>
                <Button colorScheme="teal" onClick={toggleRankingMode}>
                    Let me rank
                </Button>
            </Flex>
        </Flex>
    );
};

export default GeneralRankingView;
