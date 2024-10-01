import React from 'react';
import { Select } from '@chakra-ui/react';
import { getStyles } from '../../styles/styles';

const UniversitySelect = ({ universities, onChange, colorMode }) => {
    const styles = getStyles(colorMode);

    return (
        <Select
            width="300px"
            onChange={onChange}
            focusBorderColor="black"
            sx={styles.selectStyles}
        >
            <option selected hidden disabled value="">
                Selecciona tu universidad
            </option>
            {universities.map((university) => (
                <option key={university.id} value={university.id} style={styles.selectOptionStyle}>
                    {university.name}
                </option>
            ))}
        </Select>
    );
};

export default UniversitySelect;
