import styled from "styled-components";

const MainContainer = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const SignInForm = styled.form`
    height:500px;
    width:350px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color:white;
    border-radius:10px;
    background-color:white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    border-radius:10px;
    &:focus{
        outline:none;
    };
`

const Input = styled.input`
    padding:12px;
    margin-top:15px;
    width:250px;
    background-color:white;
    border:${props => props.active === true ? '0.5px solid red' : '0.5px solid #A0A0A0'};
    border-radius:6px;
    &:focus{
        outline:none;
    };
    font-size:15px
    `
    
    const Button = styled.button`
    padding:10px 20px;
    border:none;
    background:${props=>props.disabled ? 'lightgray':'black'};
    color:white;
    border-radius:6px;
    margin:10px;
    `
    
    const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    background-color:white
    `
    const ErrorContainer = styled.div`
    background-color:white;
    color:red;
    margin:5px;
    font-size:15px
`
const PopUpContainer = styled.div`
    width:auto;
    position:absolute;
    top:50px;
    right:100px;
    padding:15px;
    border-radius:10px;
    background-color:green;
    color:white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 18px 0 rgba(0, 0, 0, 0.1);
`

const Header = styled.h2`
    background-color:white
`

export {Header, PopUpContainer, MainContainer, SignInForm,Input, Button, InputContainer, ErrorContainer}