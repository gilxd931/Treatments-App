import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import moment from 'moment';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import NotificationBadge, { Effect } from 'react-notification-badge';

export const Header = ({ startLogout }) => (
  <header className='header'>
    <div className="header__content">

      <Link className="header__title" to="/home">
        <h1>מגע טל</h1>
      </Link>

      <h1 className="header__date"> {moment().locale('he').format('DD לMMMM YYYY')}</h1>

      <div className="header__title-notification">
        <i>
          <NotificationBadge count={2} effect={Effect.SCALE} style={{ backgroundColor: ' #F84F31', color: ' #f7f7f7', marginTop: 3, marginRight: -5 }} />
        </i>
        <div className="header__title-notification">
          <FaBell className="header__iconbell" />
        </div>
        <i onClick={startLogout} className="header__logout-icon">
          <FaSignOutAlt />
        </i>
      </div>

    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
