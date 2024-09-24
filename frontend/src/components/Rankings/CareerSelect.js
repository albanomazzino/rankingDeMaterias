import React from 'react';
import { Select } from '@chakra-ui/react';
import { selectStyles, selectOptionStyle } from '../../styles/styles';

const CareerSelect = ({ careers, onChange }) => (
    <Select
        width="300px"
        onChange={onChange}
        focusBorderColor="black"
        sx={selectStyles}
    >
        <option selected hidden disabled value="">
            Selecciona tu carrera
        </option>
        {careers.map((career, index) => (
            <option key={index} value={career} style={selectOptionStyle}>
                {career}
            </option>
        ))}
    </Select>
);

export default CareerSelect;
