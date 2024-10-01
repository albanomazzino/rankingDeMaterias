import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Text } from '@chakra-ui/react';
import { getStyles } from '../../styles/styles'; // Import the getStyles function

const Subjects = ({ subjects, onDragEnd, colorMode }) => {
    const styles = getStyles(colorMode); // Get all styles based on color mode

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={styles.getListStyle(snapshot.isDraggingOver)} // Use styles from the getStyles function
                        {...provided.droppableProps}
                    >
                        {subjects.map((subject, index) => (
                            <Draggable key={subject.id} draggableId={subject.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={styles.getSubjectStyle(provided.draggableProps.style, snapshot.isDragging)} // Use styles from the getStyles function
                                    >
                                        <Text as="span" fontWeight="bold" mr={2}>
                                            {index + 1}.
                                        </Text>
                                        {subject.name}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Subjects;