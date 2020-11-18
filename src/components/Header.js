import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import moment from 'moment';
import { FaBell } from 'react-icons/fa';


export const Header = ({ startLogout }) => (
  <header className='header'>
    <div className="header__content">
      <div className="header__title-notification">
        <FaBell className="header__iconbell" />
        <Link className="header__title" to="/home">

          <h1>מגע טל</h1>
        </Link>

      </div>
      <h1 className="header__date"> {moment().locale('he').format('DD לMMMM YYYY')}</h1>

      <button className="button button--link" onClick={startLogout}>התנתקות</button>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
