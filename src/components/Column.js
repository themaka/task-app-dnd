import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

const Container = styled.div`
    margin: 8px;
    border: 1px solid black;
    border-radius: 2px;
    flex: 1;
    display: flex;
    flex-direction: column;
    `
const Title = styled.h3`
    padding: 8px;
    text-align: center;
    `
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.3s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;    
    `

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable 
                    droppableId={this.props.column.id} 
                    type={this.props.column.id === 'column3' ? 'done' : 'active' }
                    isDropDisabled={this.props.isDropDisabled}
                >
                    {(provided,snapshot) => (
                        <TaskList 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                            {provided.placeholder}
                    </TaskList>
                    )}
                </Droppable>
            </Container>
        )

    }
}