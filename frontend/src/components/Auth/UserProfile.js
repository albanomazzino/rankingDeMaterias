import React from 'react';
import { Avatar, IconButton, Text, Flex } from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js';

const UserProfile = ({ user, onSignOut }) => {
    return (
        <Flex align="center">
            <Avatar src={user.picture} alt={user.name} size="sm" />
            <Text ml={2}>{user.name}</Text>
            <IconButton
                aria-label="Cerrar sesión"
                icon={<Icon path={mdiExitRun} size={1} />}
                onClick={onSignOut}
                variant="outline"
                ml={2}
            />
        </Flex>
    );
};

export default UserProfile;
