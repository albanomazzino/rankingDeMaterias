import React from 'react';
import { Select } from '@chakra-ui/react';
import { selectStyles, selectOptionStyle } from '../../styles/styles';

const UniversitySelect = ({ universities, onChange }) => (
    <Select
        width="300px"
        onChange={onChange}
        sx={selectStyles}
    >
        <option selected hidden disabled value="">
            Selecciona tu universidad
        </option>
        {universities.map((university, index) => (
            <option key={index} value={university} style={selectOptionStyle}>
                {university}
            </option>
        ))}
    </Select>
);

export default UniversitySelect;
