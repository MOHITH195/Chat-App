import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
function Welcome({currUser}) {
  return (
   <Container>
    <img src={Robot} alt="" />
    <h1>Welcome <span>{currUser.username}</span></h1>
    <h3>Select a chat to start </h3>
   </Container> 
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;


export default Welcome