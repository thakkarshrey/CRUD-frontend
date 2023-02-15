import styled from "styled-components";

export const Button = styled.button`
    width:30px;
    height:30px;
    border:0.5px solid #A0A0A0;
    background-color:white;
    margin:10px 10px;
    border-radius:4px;
    cursor:pointer;
   &:focus{
    border:1.5px solid black
   }
`
export const ButtonContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center
`