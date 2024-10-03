import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { getStyles } from '../../styles/styles';
import { Icon } from '@chakra-ui/icons'; 
import { FaCrown } from 'react-icons/fa';

const AggregatedRankings = ({ rankings, colorMode }) => {
    const styles = getStyles(colorMode);

    const sortedRankings = [...rankings].sort((a, b) => {
        const avgScoreA = a[1] / a[2]; // totalScoreA / timesRankedA
        const avgScoreB = b[1] / b[2]; // totalScoreB / timesRankedB
        return avgScoreA - avgScoreB;
    });

    const getGradientColor = (score, maxScore) => {
        const baseColor = '#ff5e62'; // Base color (for example, fire color)
    
        // Invert the opacity based on the score: lower score means higher opacity
        const opacity = 1 - (score / maxScore); // Value between 0 (fully opaque) and 1 (fully transparent)
    
        // Create the gradient: the left side is fully opaque, the right side is transparent
        const gradient = `linear-gradient(to right, ${baseColor} ${opacity * 100}%, rgba(255, 255, 255, 0) ${opacity * 100}%)`;
    
        return gradient;
    };

    // Determine max score for percentage calculation
    const maxScore = Math.max(...rankings.map(ranking => ranking[1]));

    return (
        <Box width="100%" alignSelf="flex-start" mt={5} style={styles.getListStyle(false)}>
            <VStack spacing={0} align="stretch">
                {sortedRankings.map((ranking, index) => {
                    const backgroundGradient = getGradientColor(ranking[1], maxScore);
                    
                    return (
                        <Box
                            width="100%"
                            key={index}
                            position="relative" 
                            style={{
                                ...styles.getSubjectStyle({}, false),
                                background: backgroundGradient,
                                transition: 'background 0.5s ease',
                                animation: 'pulse 2s infinite', 
                            }}
                        >
                            <Text as="span" fontWeight="bold" mr={2}>
                                {index + 1}.
                            </Text>
                            {ranking[0]} - Score: {ranking[1]} (Avg: {(ranking[1] / ranking[2]).toFixed(2)})

                            {index === 0 && (
                                <Icon
                                    as={FaCrown} 
                                    color="gold" 
                                    position="absolute"
                                    right="10px" 
                                    top="50%" 
                                    transform="translateY(-50%)" 
                                    boxSize={6} 
                                />
                            )}
                        </Box>
                    );
                })}
            </VStack>
        </Box>
    );
};

export default AggregatedRankings;
