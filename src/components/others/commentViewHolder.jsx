import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';

import personImage from '../../../src/assets/img/circle-zakii.png';
import personImage2 from '../../../src/assets/img/personRound.png';
import * as actions from '../../redux/actions/index';
import * as actionTypes from '../../redux/actions/actionTypes';

class CommentViewHolder extends Component {
  constructor(props) {
    super(props);
    this.postId = props.match.params.postId;
    this.loadData();
  }

  state = {
    isOpen: false
  };

  loadData = () => {
    this.props.getComments({ postId: this.postId });
  };

  componentDidMount = () => {
    this.loadData();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    this.props.addComment({
      postId: this.postId,
      comment: {
        createdAt: new Date().toString(),
        name: 'Zakriya Ali Sabir',
        message: this.state.message
      }
    });
  };

  handleEdit = (id, close) => {
    this.props.updateComment({
      postId: this.postId,
      commentId: id,
      comment: {
        createdAt: new Date().toString(),
        message: this.state.newMessage
      }
    });
    this.setState({ isOpen: false }, () => close());
  };

  handleDelete = id => {
    this.props.deleteComment({
      postId: this.postId,
      commentId: id
    });
  };

  render() {
    return (
      <div>
        <strong>Comments</strong>
        <br />
        <textarea
          name='message'
          onChange={this.handleChange}
          placeholder='Write your comment ...'
          rows='5'
          className='commentTextArea'
        ></textarea>
        <br />
        <button onClick={this.handleSubmit} className='btn btn-primary'>
          Submit Your Comment
        </button>
        <br />
        {this.props.comments.map(e => {
          return (
            <div key={Number(e.id)} className='container'>
              <br />
              <div width='80' className='row'>
                <div className='col-sm-1'>
                  <img
                    src={
                      e.name === 'Zakriya Ali Sabir'
                        ? personImage
                        : personImage2
                    }
                    width='100'
                    height='100'
                    alt='commentLogo'
                  />
                </div>
                <div className='col-sm-6 offset-sm-1'>
                  <strong>{e.name}</strong>
                  <br />"{e.message}"
                  <br />
                  <p className='comment-view-holder'>
                    @ {new Date(e.createdAt).toLocaleTimeString()} on{' '}
                    {new Date(e.createdAt).toDateString()}
                  </p>
                  <Popup
                    trigger={
                      <button className='btn btn-outline-success'>Edit</button>
                    }
                    position='right center'
                  >
                    {close => (
                      <div>
                        <label>New Comment</label>
                        <input
                          width='100%'
                          type='text'
                          name='newMessage'
                          onChange={this.handleChange}
                        />
                        <br />
                        <br />
                        <button
                          onClick={() => this.handleEdit(e.id, close)}
                          className='btn btn-primary'
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </Popup>{' '}
                  <button
                    onClick={() => this.handleDelete(e.id)}
                    className='btn btn-outline-danger'
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.commentsReducer.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: payload =>
      dispatch(
        actions.handleActions(actionTypes.POST_COMMENT_REQUEST).request(payload)
      ),
    getComments: payload =>
      dispatch(
        actions.handleActions(actionTypes.GET_COMMENTS_REQUEST).request(payload)
      ),
    deleteComment: payload =>
      dispatch(
        actions
          .handleActions(actionTypes.DELETE_COMMENT_REQUEST)
          .request(payload)
      ),
    updateComment: payload =>
      dispatch(
        actions
          .handleActions(actionTypes.UPDATE_COMMENT_REQUEST)
          .request(payload)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentViewHolder));
