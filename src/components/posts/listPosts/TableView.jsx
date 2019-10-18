import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TableRowElement from '../../others/TableRowElement';
import NavBar from '../../others/NavBar';
import API_CLASS from '../../../assets/api';
import * as actionTypes from '../../../redux/actions/actionTypes';
import * as actions from '../../../redux/actions/index';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.API = new API_CLASS();
    window.addEventListener('scroll', this.onScrollListner);
    this.props.getPosts(this.getParams());
  }

  state = {
    page: 1,
    limit: 20,
    sortBy: '',
    order: '',
    search: '',
    isBack: true,
    postsCount: 100000
  };

  updateTable = () => {
    return this.props.posts.map((e, i) => {
      return (
        <TableRowElement
          key={e.id}
          value={e}
          updateTable={this.props.getPosts}
          deletePost={this.props.deletePost}
          page={this.state.page}
          limit={this.state.limit}
        />
      );
    });
  };

  getParams = () => {
    if (this.state.sortBy !== '') {
      return {
        params: `?page=${this.state.page}&limit=${this.state.limit}&sortBy=${this.state.sortBy}&order=${this.state.order}`,
        page: this.state.page
      };
    }
    return {
      params: `?page=${this.state.page}&limit=${this.state.limit}`,
      page: this.state.page
    };
  };

  onScrollListner = e => {
    const scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop > this.state.page * 400) {
      this.setState(
        {
          page:
            this.state.postsCount < this.state.limit
              ? this.state.page
              : this.state.page + 1
        },
        () => {
          this.props.getPosts(this.getParams());
          this.setState({ postsCount: this.props.posts.length });
        }
      );
    }
  };

  handleSort = (sortBy, order) => {
    this.setState({ sortBy, order }, () => {
      if (this.props.posts.length <= this.state.limit * this.state.page) {
        this.props.sortPosts(this.getParams());
      }
    });
  };

  render() {
    return (
      <>
        <NavBar
          page={this.state.page}
          limit={this.state.limit}
          searchPosts={this.props.searchPosts}
        />
        <div className='rowTable'>
          <table>
            <thead>
              <tr className='tableHeader'>
                <th>
                  Id{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountUp
                      onClick={() => this.handleSort('id', 'asc')}
                    />
                  </button>{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountDown
                      onClick={() => this.handleSort('id', 'desc')}
                    />
                  </button>
                </th>
                <th>
                  Title{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountUp
                      onClick={() => this.handleSort('title', 'asc')}
                    />
                  </button>{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountDown
                      onClick={() => this.handleSort('title', 'desc')}
                    />
                  </button>
                </th>
                <th>
                  Tags{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountUp
                      onClick={() => this.handleSort('tags', 'asc')}
                    />
                  </button>{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountDown
                      onClick={() => this.handleSort('tags', 'desc')}
                    />
                  </button>
                </th>
                <th>
                  Date{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountUp
                      onClick={() => this.handleSort('createdAt', 'asc')}
                    />
                  </button>{' '}
                  <button className='btn btn-outline-primary'>
                    <FaSortAmountDown
                      onClick={() => this.handleSort('createdAt', 'desc')}
                    />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>{this.updateTable()}</tbody>
          </table>
          <br />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: payload =>
      dispatch(
        actions.handleActions(actionTypes.GET_POSTS_REQUEST).request(payload)
      ),
    searchPosts: payload =>
      dispatch(
        actions.handleActions(actionTypes.SEARCH_POSTS_REQUEST).request(payload)
      ),
    sortPosts: payload =>
      dispatch(
        actions.handleActions(actionTypes.SORT_POSTS_REQUEST).request(payload)
      ),
    deletePost: payload =>
      dispatch(
        actions.handleActions(actionTypes.DELETE_POST_REQUEST).request(payload)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TableView));
