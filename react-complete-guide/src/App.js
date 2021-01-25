import React, { Component } from "react";
import Person from "./Person/Person";
import styled from 'styled-components'

import "./App.css";

const StyledButton = styled.button`      
    background-color: ${props => props.colorBool ? 'red': 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: lightgreen;
      color: black;
    }
`

class App extends Component {
  state = {
    persons: [
      { id: '62dfs34', name: "Max", age: 29 },
      { id: '423aaf4', name: "John", age: 27 },
      { id: '123cha4', name: "Stephanie", age: 21 },
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1); 
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {
    let persons = null;

    if (this.state.showPersons ){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)} 
              changed={(event) => this.nameChangedHandler(event, person.id)}
              key={person.id} />
          })}
        </div>
      )
      // style.backgroundColor = 'red';
    }

    let classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red');
    }
    if (this.state.persons.length <= 1){
      classes.push('bold');
    }
    
    return (
        <div className="App">
          <h1>Hi, Im a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <StyledButton colorBool={this.state.showPersons} onClick={this.togglePersonsHandler}>
            Toggle Persons
            </StyledButton>
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, Im a React App'))
  }
}

// Radium is a higher order component
export default App;
