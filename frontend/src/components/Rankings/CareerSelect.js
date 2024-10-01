import React from 'react';
import { Select } from '@chakra-ui/react';
import { getStyles } from '../../styles/styles';

const CareerSelect = ({ careers, onChange, value, colorMode }) => {
    const styles = getStyles(colorMode);

    return (
        <Select
            width="300px"
            onChange={onChange}
            value={value}
            focusBorderColor="black"
            sx={styles.selectStyles}
        >
            <option selected hidden disabled value="">
                Selecciona tu carrera
            </option>
            {careers.map((career) => (
                <option key={career.id} value={career.id} style={styles.selectOptionStyle}>
                    {career.name}
                </option>
            ))}
        </Select>
    );
};

export default CareerSelect;
