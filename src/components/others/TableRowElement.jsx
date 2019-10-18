import React, { Component } from 'react';
import { Link, withRouter } from '../../../node_modules/react-router-dom';
import PropTypes from 'prop-types';

import AddPost from '../posts/addPost/AddPost';
import API_CLASS from '../../assets/api';

class TableRowElement extends Component {
  constructor() {
    super();
    this.API = new API_CLASS();
  }

  handleDelete = id => {
    this.props.deletePost({postId:id});
  };

  render() {
    return (
      <tr>
        <td>{this.props.value.id}</td>
        <td>
          {this.props.value.title}
          <br />
          <span>
            <Link
              to={'/posts/' + this.props.value.id}
              key={this.props.value.id}
            >
              View
            </Link>
            <i> |</i>
            <AddPost
              updateTable={this.props.updateTable}
              data={this.props.value}
              lastComp='edit'
            />
            <i>| </i>
            <button
              onClick={() =>
                this.handleDelete(this.props.value.id)
              }
              className='btn btn-link'
            >
              Delete
            </button>
          </span>
        </td>
        <td>{this.props.value.tags}</td>
        <td>{this.props.value.createdAt}</td>
      </tr>
    );
  }
}

TableRowElement.propTypes = {
  value: PropTypes.object,
  updateTable: PropTypes.func,
  deletePost:PropTypes.func,
  page:PropTypes.number,
  limit:PropTypes.number
};

TableRowElement.defaultProps = {
  value: null,
  updateTable: () => {},
  deletePost:()=>{},
  page:1,
  limit:20
};

export default withRouter(TableRowElement);
