export const videoStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: '-1',
  top: 0,
  left: 0,
};

// Define styles for light and dark modes
const lightStyles = {
  bg: 'rgba(255, 255, 255, 0.6)',
  color: 'black',
  selectBackground: 'rgba(255, 255, 255, 1)',
  selectBorderColor: 'rgba(0, 0, 0, 0.4)',
  optionBackgroundColor: 'rgba(255, 255, 255, 1)',
  subjectBackground: 'linear-gradient(to right, rgba(128, 128, 128, 0.45), rgba(255, 255, 255, 0))',
  listBackground: 'transparent',
  selectHoverBackground: 'rgba(100, 100, 100, 0.1)', 
  optionHoverBackground: 'rgba(0, 128, 128, 0.5)',
  optionActiveBackground: 'rgba(0, 100, 100, 0.7)',
};

const darkStyles = {
  bg: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  selectBackground: 'rgba(0, 0, 0, 0.5)',
  selectBorderColor: 'rgba(255, 255, 255, 0.4)',
  optionBackgroundColor: 'rgba(0, 0, 0, 0.95)',
  subjectBackground: 'linear-gradient(to right, rgba(50, 50, 50, 0.45), rgba(0, 0, 0, 0))',
  listBackground: 'transparent',
  selectHoverBackground: 'rgba(100, 100, 100, 0.1)', 
  optionHoverBackground: 'rgba(0, 128, 128, 0.5)',
  optionActiveBackground: 'rgba(0, 100, 100, 0.7)',
};

export const selectStyles = (colorMode) => {
  const currentStyles = colorMode === 'light' ? lightStyles : darkStyles;

  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: currentStyles.selectBackground,
      borderColor: state.isFocused ? currentStyles.selectBorderColor : currentStyles.selectBorderColor,
      boxShadow: 'none',
      '&:hover': {
        borderColor: currentStyles.selectHoverBackground,
        backgroundColor: currentStyles.selectHoverBackground,
      },
      borderRadius: '6px',
      width: '300px',
      height: '40px',
      cursor: 'pointer',
      color: currentStyles.color,
    }),
    input: (base) => ({
      ...base,
      color: currentStyles.color,
      caretColor: currentStyles.color,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? currentStyles.optionHoverBackground
        : currentStyles.optionBackgroundColor,
      color: state.isFocused ? (colorMode === 'light' ? 'black' : 'white') : currentStyles.color,
      cursor: 'pointer',
      '&:active': {
        backgroundColor: currentStyles.optionActiveBackground,  // Use the active background color
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: currentStyles.color,
    }),
    placeholder: (base) => ({
      ...base,
      color: colorMode === 'light' ? 'black' : 'white',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
      backgroundColor: currentStyles.optionBackgroundColor,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: colorMode === 'light' ? 'grey' : 'white',
      '&:hover': {
        color: colorMode === 'light' ? 'black' : 'white',
      },
    }),
  };
};


export const getStyles = (colorMode) => {
  return {
    boxStyles: {
      ... (colorMode === 'light' ? lightStyles : darkStyles),
      minH: '100vh',
      display: 'flex',
      flexDirection: 'column',
      p: 5,
    },
    selectStyles: {
      background: colorMode === 'light' ? lightStyles.selectBackground : darkStyles.selectBackground,
      borderColor: colorMode === 'light' ? lightStyles.selectBorderColor : darkStyles.selectBorderColor,
      _hover: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: colorMode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      },
      _focus: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: colorMode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      },
    },
    selectOptionStyle: {
      backgroundColor: colorMode === 'light' ? lightStyles.optionBackgroundColor : darkStyles.optionBackgroundColor,
      color: colorMode === 'light' ? 'black' : 'white',
    },
    getSubjectStyle: (draggableStyle, isDragging) => ({
      userSelect: 'none',
      padding: 8 * 2,
      margin: `0 0 8px 0`,
      background: isDragging ? 'lightgreen' : (colorMode === 'light' ? lightStyles.subjectBackground : darkStyles.subjectBackground),
      ...draggableStyle,
    }),
    getListStyle: (isDraggingOver) => ({
      background: colorMode === 'light' ? lightStyles.listBackground : darkStyles.listBackground,
      padding: 8,
    }),
    signInStyles: {
      backgroundColor: colorMode === 'light' ? lightStyles.optionBackgroundColor : 'transparent',
      borderColor: colorMode === 'light' ? lightStyles.selectBorderColor : 'transparent',
      marginLeft: '50px',
      position: 'relative',
      zIndex: 1,
      _focus: {
        borderColor: 'transparent',
        boxShadow: 'none',
    },
    },
    iconButtonStyles: {
      color: colorMode === 'dark' ? 'white' : 'black',
      border: colorMode === 'light' ? '1px solid rgba(0, 0, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.4)',
      _hover: {
        bg: colorMode === 'light' ? 'rgba(100, 100, 100, 0.1)' : 'rgba(50, 50, 50, 0.8)',
      }
    },
    
  };
};
