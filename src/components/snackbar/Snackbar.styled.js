import styled from "styled-components";

export const PopUpContainer = styled.div`
width:auto;
position:absolute;
top:50px;
right:100px;
padding:15px;
display:${({showToast})=>showToast===true?'block':'none'};
border-radius:10px;
background-color:${({backgroundColor})=>backgroundColor};
color:white;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 18px 0 rgba(0, 0, 0, 0.1);
`