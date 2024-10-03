import React from 'react';
import Select from 'react-select';
import { selectStyles } from '../../styles/styles';

const UniversitySelect = ({ universities, onChange, colorMode }) => {
  const options = universities.map((university) => ({
    value: university.id,
    label: university.name,
  }));

  const handleChange = (selectedOption) => {
    onChange({ target: { value: selectedOption.value } });
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isSearchable
      placeholder="Selecciona tu universidad"
      styles={selectStyles(colorMode)}
    />
  );
};

export default UniversitySelect;
