import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { DragDropContext} from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './components/Column'

const Container = styled.div`
  display: flex;
  `

class App extends React.Component {
  state = initialData

  onDragStart = startingColumn => {
    const homeIndex = this.state.columnOrder.indexOf(startingColumn.source.droppableId)


    document.body.style.color = 'orange'
    document.body.style.transition = 'background-color 0.2 ease'

    this.setState({
      homeIndex,
    })

  }


  onDragEnd = result => {
    this.setState({
      homeIndex: null
    })

    document.body.style.color = 'inherit'

    const {destination, source, draggableId } = result

    if(!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
        

    const startColumn = this.state.columns[source.droppableId]
    const finishColumn = this.state.columns[destination.droppableId]
    
    if(startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
  
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      this.setState(newState)
      return
    }

    //moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finishColumn.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,

      }
    }
    this.setState(newState)

  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId,index) => {
          const column = this.state.columns[columnId]
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

          const isDropDisabled = index < this.state.homeIndex

          return (
            <Column 
              key={column.id} 
              column={column} 
              tasks={tasks}
              isDropDisabled={isDropDisabled} 
            />
          ) 
        
          })}
        </Container>
      </DragDropContext>
    )
  }
}

// const App = () => 'Hello world';

ReactDOM.render(<App />, document.getElementById('root'))


  // this on DragUpdate changed the background color based on how low you put an item into a list (how high the index was)
  // onDragUpdate = update => {
  //   const {destination} = update
  //   const opacity = destination 
  //   ? destination.index / Object.keys(this.state.tasks).length 
  //   : 0
  //   document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})
  //   // `
  // }
