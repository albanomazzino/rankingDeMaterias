import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Text } from '@chakra-ui/react';
import { getSubjectStyle, getListStyle } from '../../styles/styles';

const Subjects = ({ subjects, onDragEnd }) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    {subjects.map((subject, index) => (
                        <Draggable key={subject.id} draggableId={subject.id.toString()} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getSubjectStyle(provided.draggableProps.style, snapshot.isDragging)}
                                >
                                    <Text as="span" fontWeight="bold" mr={2}>{index + 1}.</Text>
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

export default Subjects;
