import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 29 },
      { name: "John", age: 27 },
      { name: "Stephanie", age: 21 },
    ],
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 29 },
        { name: event.target.value, age: 27 },
        { name: event.target.value, age: 21 },    
      ]
    })
  }

  switchNameHandler = (newName) =>{
    // console.log('Was clicked!')
    // DONT DO THIS - this.state.persons[0].name = 'Maximillion'
    // Change state and props through the react library thats why we use these methods
    // and values defined by the parent
    this.setState({persons:[{ name: newName, age: Math.floor(Math.random() * 30) },
    { name: newName, age: Math.floor(Math.random() * 30) },
    { name: newName, age: Math.floor(Math.random() * 30) }]})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    
    return (
      <div className="App">
        <h1>Hi, Im a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={() => this.switchNameHandler('Maximilian!!')}>New Age!</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={() => this.switchNameHandler('Maximilian!!')}
        >
          My hobbies include cycling and coding!
        </Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          changed={this.nameChangedHandler}
        />
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, Im a React App'))
  }
}

export default App;
