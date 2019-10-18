import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
// import PropTypes from 'prop-types';

class MainNav extends Component {
  render() {
    return (
      <Link to='/'>
        <div>
          <img
            src={this.props.logo}
            align='left'
            className='imgMargin'
            height='60'
            alt='logo'
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <hr width=''></hr>
      </Link>
    );
  }
}

// MainNav.propTypes = {
//   logo: PropTypes.string
// };

// MainNav.defaultProps = {
//   logo: './assets/img/logo.png'
// };

export default MainNav;
