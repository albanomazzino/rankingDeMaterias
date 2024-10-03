import React from 'react';
import Select from 'react-select';
import { selectStyles } from '../../styles/styles';

const CareerSelect = ({ careers, onChange, colorMode }) => {
  const options = careers.map((career) => ({
    value: career.id,
    label: career.name,
  }));

  const handleChange = (selectedOption) => {
    onChange({ target: { value: selectedOption.value } });
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isSearchable
      placeholder="Selecciona tu carrera"
      styles={selectStyles(colorMode)}
    />
  );
};

export default CareerSelect;
