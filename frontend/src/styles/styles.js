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
  bg: 'rgba(255, 255, 255, 0.8)',
  color: 'black',
  selectBackground: 'rgba(255, 255, 255, 0)',
  selectBorderColor: 'rgba(0, 0, 0, 0.4)',
  optionBackgroundColor: 'rgba(255, 255, 255, 1)',
  subjectBackground: 'linear-gradient(to right, rgba(128, 128, 128, 0.45), rgba(255, 255, 255, 0))',
  listBackground: 'transparent',
};

const darkStyles = {
  bg: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  selectBackground: 'rgba(0, 0, 0, 0.5)',
  selectBorderColor: 'rgba(255, 255, 255, 0.4)',
  optionBackgroundColor: 'rgba(0, 0, 0, 0.8)',
  subjectBackground: 'linear-gradient(to right, rgba(50, 50, 50, 0.45), rgba(0, 0, 0, 0))',
  listBackground: 'rgba(0, 0, 0, 0.3)',
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
    },
  };
};
