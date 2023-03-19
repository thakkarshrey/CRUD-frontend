
import React from 'react'

export default function Sidebar (props) {
    return (
        <div>
        <div style={{background:'blue',width:'250px',height:'100%',position:'fixed',zIndex:3}}>
        Sidebar
        </div>
        <main>{props.children}</main>
        </div>
    )
}