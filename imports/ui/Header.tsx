import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export const Header: React.FC = () => {

    return (
        <div className = "header-outer">
            <div className = "header container">
                <div className = "header__title">
                    <p>Auditory</p>
                    <p>Schedule</p>
                </div>
                <div className = "header__line" />
                <div className = "header__links">
                    <Link className = "header__link" to = "/auditories">Auditories</Link>
                </div>
            </div>
        </div>
    )
}