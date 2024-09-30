import React from 'react';
import { Select } from '@chakra-ui/react';
import { selectStyles, selectOptionStyle } from '../../styles/styles';

const UniversitySelect = ({ universities, onChange }) => (
    <Select
        width="300px"
        onChange={onChange}
        focusBorderColor="black"
        sx={selectStyles}
    >
        <option selected hidden disabled value="">
            Selecciona tu universidad
        </option>
        {universities.map((university) => (
            <option key={university.id} value={university.id} style={selectOptionStyle}>
                {university.name}
            </option>
        ))}
    </Select>
);

export default UniversitySelect;
