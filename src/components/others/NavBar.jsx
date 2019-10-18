import React, { Component } from 'react';
import { FaSearch, FaEdit } from 'react-icons/fa';

import AddPost from '../posts/addPost/AddPost.jsx';

class NavBar extends Component {
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.searchPosts({
        params: `?search=${this.state.search}`
      });
    });
  };

  render() {
    return (
      <div className='navDiv'>
        <div className='row '>
          <div className='col-sm-2'>
            <FaEdit className='iconEdit' />
            &nbsp;&nbsp;&nbsp;&nbsp;<strong className='postsText'>Posts</strong>
          </div>
          <div className='col-sm-6'>
            <AddPost />
          </div>

          <div className='col-sm-4' align='right'>
            <input
              onChange={this.handleChange}
              type='text'
              placeholder='Search Post'
              name='search'
            ></input>

            <button className='btn btn-primary '>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
