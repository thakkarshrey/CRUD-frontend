import styled from "styled-components"

const MainContainer = styled.div`
    padding-top:30px;
    width:100%;
    height:100%
`
const Table = styled.table`
    width:100%;
    border-radius:20px;
    border:1px solid #A0A0A0;
    overflow:hidden;
    border-collapse:collapse
    `
    
    const Td = styled.td`
    border:1px solid #A0A0A0;
    text-align:left;
    padding:8px;
    font-size:20px
    `
    const Th = styled.th`
    border:1px solid #A0A0A0;
    text-align:left;
    padding:8px;
    font-size:20px;
    background-color:#E8E8E8;
    cursor:pointer
    `
    const TableContainer = styled.div`
    border:1px solid #A0A0A0;
    border-radius:20px;
    margin:10px 30px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08), 0 4px 15px 0 rgba(0, 0, 0, 0.06);
`
    const Button = styled.button`
    `

    
    const PaginationContainer = styled.div`
    
    `
    const SearchInput = styled.input`
    margin-left:30px;
    border:none;
    padding:15px;
    width:70vw;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08), 0 4px 15px 0 rgba(0, 0, 0, 0.06);
    border-radius:10px;
    &:focus{
        outline:none;
    };
    background-color:white
    `

    const TotalRecordsContainer = styled.div`
    margin:10px 0px 0px 30px
    `

    const HeaderContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:10px 30px
    `
    const Header = styled.h1`
    `

    const LoadingContainer = styled.h2`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:464px
    `

    const Tbody = styled.tbody`
    `

export {LoadingContainer, MainContainer, Table, Td, Th, TableContainer, Button, PaginationContainer, SearchInput, TotalRecordsContainer, HeaderContainer, Header, Tbody}