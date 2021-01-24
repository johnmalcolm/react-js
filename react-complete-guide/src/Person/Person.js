import React from 'react';
import './Person.css'

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>Im {props.name} and I am {props.age}!</p>
            <pre>{props.children}</pre>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person