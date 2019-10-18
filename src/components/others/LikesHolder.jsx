import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';

import API_CLASS from '../../assets/api';

class LikesHolder extends Component {
  constructor(props) {
    super(props);
    this.postId = props.match.params.postId;
    this.likeId = localStorage.getItem(`likeId${this.postId}`);
    this.API = new API_CLASS();
  }

  state = {
    likeId: this.likeId,
    liked: false,
    likes: 0
  };

  componentDidMount = () => {
    this.API.getLikes(this.postId).then(resp => {
      this.setState({ likes: resp.data });
    });
    this.setState({
      liked: Boolean(localStorage.getItem('liked' + this.postId)) || false
    });
  };

  handleDislike = () => {
    this.setState(
      {
        liked: false
      },
      () => {
        localStorage.setItem('liked' + this.postId, false);
        this.API.deleteLike(this.postId, this.likeId).then(resp => {
          localStorage.removeItem('liked' + this.postId);
          this.API.getLikes(this.postId).then(resp => {
            this.setState({ likes: resp.data });
          });
        });
      }
    );
  };

  handleLike = () => {
    this.setState(
      {
        liked: true
      },
      () => {
        localStorage.setItem('liked' + this.postId, true);
        this.API.postLike(this.postId).then(resp => {
          localStorage.setItem('likeId' + this.postId, resp.data.id);
          this.setState({ likeId: resp.data.id }, () => {
            this.API.getLikes(this.postId).then(resp => {
              this.setState({ likes: resp.data });
            });
          });
        });
      }
    );
  };

  render() {
    return (
      <div className='likeBtn'>
        {!this.state.liked ? (
          <button className='btn btn-outline-primary' onClick={this.handleLike}>
            <FaThumbsUp /> Like
          </button>
        ) : (
          <button className='btn btn-primary' onClick={this.handleDislike}>
            <FaThumbsUp /> Liked
          </button>
        )}
        <br />
        likes:{this.state.likes}
      </div>
    );
  }
}

export default withRouter(LikesHolder);
