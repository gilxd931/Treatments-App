import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { getUnoticedTreatments } from '../firebase/operations';
import moment from 'moment';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import NotificationBadge, { Effect } from 'react-notification-badge';
import ReactTooltip from 'react-tooltip';


export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unoticedTreatments: undefined
    }
  }

  componentDidMount() {
    getUnoticedTreatments(this.props.auth.uid).then((unoticedTreatments) => {
      this.setState(() => ({ unoticedTreatments }));
    })

  }
  render() {

    const { startLogout } = this.props;
    return (
      <header className='header'>
        <div className="header__content">

          <Link className="header__title" to="/clients">
            <h1>מגע טל</h1>
          </Link>

          <h1 className="header__date"> {moment().locale('he').format('DD לMMMM YYYY')}</h1>

          <div className="header__title-notification">
            <i>
              <NotificationBadge count={this.state.unoticedTreatments && this.state.unoticedTreatments.length} effect={Effect.SCALE} style={{ backgroundColor: ' #F84F31', color: ' #f7f7f7', marginTop: 3, marginRight: -5 }} />
            </i>
            <div className="header__title-notification">
              <FaBell data-tip="נוטיפיקציות" className="header__iconbell" />
            </div>
            <i onClick={startLogout} className="header__logout-icon">
              <FaSignOutAlt data-tip="התנתק" />
            </i>
          </div>

        </div>
        <ReactTooltip effect="solid" />

      </header>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
