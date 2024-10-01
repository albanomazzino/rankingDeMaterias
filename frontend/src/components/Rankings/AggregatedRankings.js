import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { getStyles } from '../../styles/styles';

const AggregatedRankings = ({ rankings, colorMode }) => {
    const styles = getStyles(colorMode); // Get all styles based on color mode

    const sortedRankings = [...rankings].sort((a, b) => {
        const avgScoreA = a[1] / a[2]; // totalScoreA / timesRankedA
        const avgScoreB = b[1] / b[2]; // totalScoreB / timesRankedB
        return avgScoreA - avgScoreB;
    });

    return (
        <Box width="100%" alignSelf="flex-start" mt={5} style={styles.getListStyle(false)}>
            <VStack spacing={4} align="stretch">
                {sortedRankings.map((ranking, index) => (
                    <Box width="100%" key={index} style={styles.getSubjectStyle({}, false)}>
                        <Text as="span" fontWeight="bold" mr={2}>
                            {index + 1}.
                        </Text>
                        {ranking[0]} - Score: {ranking[1]} (Avg: {(ranking[1] / ranking[2]).toFixed(2)})
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default AggregatedRankings;
