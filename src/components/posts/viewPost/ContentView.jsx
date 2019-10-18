import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import CommentViewHolder from '../../others/CommentViewHolder';
import LikesHolder from '../../others/LikesHolder';
import Error from '../../others/Error';
import API_CLASS from '../../../assets/api';

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.API = new API_CLASS();
    this.fetchPosts(props);
  }

  state = {
    error: null,
    isError: false,
    postObj: { title: '', body: '' }
  };

  fetchPosts=(props)=>{
    //API call
    this.API.getPost(props.match.params.postId).then(resp => {
      if (!resp.error)
        this.setState({
          postObj: { title: resp.data.title, body: resp.data.body }
        });
      else this.setState({ isError: true, error: resp.error });
    });

  }

  render() {
    return (
      <div>
        {this.state.isError ? (
          <Error error={this.state.error} />
        ) : (
          <>
            {this.getBannerImg()}
            {this.getDescription()}
            <LikesHolder />
            <br />
            <br />
            <br />
            <div className='container'>{this.getCommentsSection()}</div>
          </>
        )}
      </div>
    );
  }

  getCommentsSection = () => {
    return (
      <div className='container'>
        <CommentViewHolder />
      </div>
    );
  };

  getBannerImg = () => {
    return (
      <>
        <div className='bannerImg'>
          {this.getBackButton()}
          <h1 className='view-post-heading'>{this.state.postObj.title}</h1>
        </div>
      </>
    );
  };

  getBackButton = e => {
    return (
      <Link to='/' className='btn btn-light back-btn'>
        <FaArrowLeft className='back-icon' />
      </Link>
    );
  };

  getDescription = () => {
    return (
      <div className='viewDescription'>
        <p>{this.state.postObj.body}</p>
      </div>
    );
  };
}

export default withRouter(ContentView);
