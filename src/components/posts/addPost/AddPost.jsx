import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import API_CLASS from '../../../assets/api';
import './AddPost.css';

class AddPost extends Component {
  constructor() {
    super();
    this.API = new API_CLASS();
  }

  state = {
    title: '',
    body: '',
    tags: '',
    trigger: <button className='btn btn-primary'> Add New </button>
  };

  componentDidMount = () => {
    if (this.props.lastComp === 'edit') {
      this.setState({
        trigger: <button className='btn btn-link'> Edit </button>,
        title: this.props.data.title,
        body: this.props.data.body,
        tags: this.props.data.tags
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    if (
      this.state.title === '' ||
      this.state.body === '' ||
      this.state.tags === ''
    ) {
      alert('Incomplete Info .....');
      return;
    }

    //API call
    if (this.props.lastComp === 'edit') {
      this.API.updatePost(this.props.data.id, {
        title: this.state.title,
        body: this.state.body,
        tags: this.state.tags,
        createdAt: new Date().toISOString()
      }).then(resp => {
        this.setState({ payload: resp.data });
        this.props.updateTable();
      });
    } else {
      this.API.addPost({
        title: this.state.title,
        body: this.state.body,
        tags: this.state.tags,
        createdAt: new Date().toISOString()
      }).then(resp => {
        this.setState({ payload: resp.data });
        this.props.updateTable();
      });
    }
  };

  render() {
    return (
      <Popup trigger={this.state.trigger} modal>
        <div className='popup-class'>
          <div
            className='tab-pane fade show active text-align form-new'
            role='tabpanel'
            aria-labelledby='home-tab'
          >
            <h2 className='h3-post-details'>Post Details</h2>
            <hr className='add-new-hr' />
            <form onSubmit={this.handleSubmit} className='row register-form'>
              <div className='col-md-12'>
                <div>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='title'
                      value={this.state.title}
                      className='form-control'
                      placeholder='Post Title'
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='body'
                      value={this.state.body}
                      className='form-control'
                      placeholder='Post Body'
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      onChange={this.handleChange}
                      type='text'
                      name='tags'
                      className='form-control'
                      placeholder='Post Tags'
                      value={this.state.tags}
                    />
                  </div>
                  <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-full'>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Popup>
    );
  }
}

AddPost.propTypes = {
  lastComp: PropTypes.string,
  data: PropTypes.object,
  updateTable: PropTypes.func
};

AddPost.defaultProps = {
  lastComp: '',
  data: null,
  updateTable: () => {}
};

export default withRouter(AddPost);
