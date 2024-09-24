export const videoStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '-1',
    top: 0,
    left: 0,
  };
  
  export const boxStyles = (colorMode) => ({
    bg: colorMode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.8)',
    color: colorMode === 'light' ? 'black' : 'white',
    minH: '100vh',
    display: 'flex',
    flexDirection: 'column',
    p: 5,
  });
  
  export const selectStyles = {
    background: 'rgba(255, 255, 255, 0)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    _hover: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    _focus: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.6)',
    },
  };

  export const selectOptionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
  };
  
  export const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 8px 0`,
    background: isDragging
      ? 'lightgreen'
      : 'linear-gradient(to right, rgba(128, 128, 128, 0.45), rgba(255, 255, 255, 0))',
    ...draggableStyle,
  });
  
  export const getListStyle = (isDraggingOver) => ({
    background: 'transparent',
    padding: 8,
  });  