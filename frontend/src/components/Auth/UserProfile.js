import React from 'react';
import { Avatar, IconButton, Text, Flex, Box, useColorMode } from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js';
import { getStyles } from '../../styles/styles';

const UserProfile = ({ user, onSignOut, onClick }) => {
    const { colorMode } = useColorMode();
    const styles = getStyles(colorMode);

    return (
        <Box 
            onClick={onClick}
            cursor="pointer" 
            _hover={{
                opacity: 0.8,
            }}
            transition="opacity 0.3s ease, box-shadow 0.3s ease"
        >
            <Flex align="center">
                <Avatar src={user.picture} alt={user.name} size="sm" />
                <Text ml={2}>{user.name}</Text>
                <IconButton
                    aria-label="Cerrar sesión"
                    icon={<Icon path={mdiExitRun} size={1} color={styles.iconButtonStyles.color} />}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSignOut();
                    }}
                    variant="outline"
                    border={styles.iconButtonStyles.border} // Use border instead of borderColor
                    color={styles.iconButtonStyles.color}
                    ml={2}
                />
            </Flex>
        </Box>
    );
};

export default UserProfile;
