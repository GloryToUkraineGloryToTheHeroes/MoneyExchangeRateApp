import React from 'react'
import { NavLink } from 'react-router-dom'


export const Navbar = () => {
    return (
        <nav>
            <div style={{paddingRight: '10vw'}} className="nav-wrapper #2e7d32 green darken-3 navbar">
                <a href="/" style={{marginLeft: '10vw'}} className="brand-logo"><b className='nav-b'>Money exchange rate</b></a>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/privat'><b className='nav-b'>Privat</b></NavLink></li>
                </ul>
            </div>
        </nav>
    )
}