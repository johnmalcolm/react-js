import React from 'react';
import styled from 'styled-components'

import './Person.css'

const StyledDiv = styled.div`
    width: 60%;
    margin: auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px){
        width: 450px
    }
`;

const person = (props) => {
    return (
        <StyledDiv>
            <p onClick={props.click}>Im {props.name} and I am {props.age}!</p>
            <pre>{props.children}</pre>
            <input type="text" onChange={props.changed} value={props.name}/>
        </StyledDiv>
    )
}

export default person