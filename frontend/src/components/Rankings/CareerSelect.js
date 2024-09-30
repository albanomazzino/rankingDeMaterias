import React from 'react';
import { Select } from '@chakra-ui/react';
import { selectStyles, selectOptionStyle } from '../../styles/styles';

const CareerSelect = ({ careers, onChange, value }) => (
    <Select
        width="300px"
        onChange={onChange}
        value={value}
        focusBorderColor="black"
        sx={selectStyles}
    >
        <option selected hidden disabled value="">
            Selecciona tu carrera
        </option>
        {careers.map((career) => (
            <option key={career.id} value={career.id} style={selectOptionStyle}>
                {career.name}
            </option>
        ))}
    </Select>
);

export default CareerSelect;
