import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { getSubjectStyle, getListStyle } from '../../styles/styles';

const AggregatedRankings = ({ rankings }) => {
    const sortedRankings = [...rankings].sort((a, b) => {
        const avgScoreA = a[1] / a[2]; // totalScoreA / timesRankedA
        const avgScoreB = b[1] / b[2]; // totalScoreB / timesRankedB
        return avgScoreA - avgScoreB;
    });

    return (
        <Box width="100%" alignSelf="flex-start" mt={5} style={getListStyle(false)}>
            <VStack spacing={4} align="stretch">
                {sortedRankings.map((ranking, index) => (
                    <Box width="100%" key={index} style={getSubjectStyle({}, false)}>
                    <Text as="span" fontWeight="bold" mr={2}>
                        {index + 1}.
                    </Text>
                    {console.log(ranking)}
                    {ranking[0]} - Score: {ranking[1]} (Avg: {(ranking[1] / ranking[2]).toFixed(2)})
                </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default AggregatedRankings;
