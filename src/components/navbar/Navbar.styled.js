import styled from "styled-components";

const NavbarContainer = styled.header`
    width:100%;
    height:60px;
    top:0;
    left:0;
    position:${props=>props.isAuthenticated ? 'fixed' : 'static'};
    display:${props=>props.isAuthenticated ? 'flex' : 'block'};
    justify-content:flex-end;
    background-color:white;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 15px 0 rgba(0, 0, 0, 0.08);
    `

const UserDetails = styled.div`
    display:flex;
    align-items:center;
    margin-right:10px;
    justify-content:center;
    background-color:white
    `
    const User = styled.div`
    background-color:white
    `

const Main = styled.main`
    padding-top:${props=>props.isAuthenticated ? '60px' : '0px'};   
`
const Button = styled.button`
    padding:10px 20px;
    margin:0px 5px;
    border:none;
    border-radius:8px;
    cursor:pointer
`

export {NavbarContainer, UserDetails, User, Main, Button}