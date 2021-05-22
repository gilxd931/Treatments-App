import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaUserFriends, FaNotesMedical, FaCalendarAlt, FaChartArea, FaStream } from 'react-icons/fa';

export const NavHeader = () => {
    const size = "3.2rem";
    return (
        <div className="page-header">
            <div className="nav-header">


                <NavLink className="nav-header__item" to="/clients" activeClassName="is-active" exact={true}>
                    <FaUserFriends size={size} />
                    <span className="nav-header__itemtext">מטופלים</span>
                </NavLink>

                <NavLink className="nav-header__item" to="/treatments" activeClassName="is-active" exact={true}>
                    <FaNotesMedical size={size} />
                    <span className="nav-header__itemtext">טיפולים</span>
                </NavLink>

                <NavLink className="nav-header__item" to="/treatmentsArrays" activeClassName="is-active" exact={true}>
                    <FaStream size={size} />
                    <span className="nav-header__itemtext">מערכי טיפול</span>
                </NavLink>

                <NavLink className="nav-header__item" to="/calendar" activeClassName="is-active" exact={true}>
                    <FaCalendarAlt size={size} />
                    <span className="nav-header__itemtext">לוח שנה</span>
                </NavLink>

                <NavLink className="nav-header__item" to="/reports" activeClassName="is-active" exact={true}>
                    <FaChartArea size={size} />
                    <span className="nav-header__itemtext">דוחות</span>
                </NavLink>

            </div>
        </div >
    )
}

export default connect()(NavHeader);
