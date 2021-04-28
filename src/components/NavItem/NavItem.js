import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './NavItem.module.scss'

const NavItem = props => {
    const cls = [classes.NavLink, props.className]

    return (
        <NavLink to={props.path} className={cls.join(' ')}>
            {props.title}
        </NavLink>
    )
}

export default NavItem