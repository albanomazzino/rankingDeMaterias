import React from 'react';
import { Avatar, IconButton, Text, Flex, useColorMode } from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js';
import { getStyles } from '../../styles/styles';

const UserProfile = ({ user, onSignOut }) => {
    const { colorMode } = useColorMode(); // Get current color mode
    const styles = getStyles(colorMode); // Get styles based on the current color mode

    return (
        <Flex align="center">
            <Avatar src={user.picture} alt={user.name} size="sm" />
            <Text ml={2}>{user.name}</Text>
            <IconButton
                aria-label="Cerrar sesión"
                icon={<Icon path={mdiExitRun} size={1} color={styles.iconButtonStyles.color} />} // Set icon color
                onClick={onSignOut}
                variant="outline" // Using outline variant for the button
                borderColor={styles.iconButtonStyles.borderColor} // Set border color based on color mode
                bg={styles.iconButtonStyles.bg} // Set background color based on color mode
                color={styles.iconButtonStyles.color} // Set text color based on color mode
                _hover={styles.iconButtonStyles._hover} // Set hover styles
                ml={2}
            />
        </Flex>
    );
};

export default UserProfile;
