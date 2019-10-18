import React, { Component } from "react";
import PropTypes from 'prop-types';

class Pagination extends Component {

  render() {
    return (
      <li className="page-item">
        <a className="page-link" href="/">
          {this.props.id}
        </a>
      </li>
    );
  }
}

Pagination.propTypes = {
  id:PropTypes.number
};

Pagination.defaultProps = {
  id:1
};

export default Pagination;
