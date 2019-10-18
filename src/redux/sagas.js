import { call, put, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from './actions/actionTypes';
import API_CLASS from '../assets/api';

const API = new API_CLASS();

// worker sagas
function* getComments(action) {
  try {
    const { data, error } = yield call(API.getComments, action.payload.postId);
    yield put({
      type: ACTIONS.GET_COMMENTS_SUCCESS,
      payload: { comments: data, error: error }
    });
  } catch (e) {
    yield put({ type: ACTIONS.GET_COMMENTS_FAILURE, error: e.message });
  }
}

function* getComment(action) {
  try {
    const { data, error } = yield call(
      API.getComment,
      action.payload.postId,
      action.payload.commentId
    );
    yield put({
      type: ACTIONS.GET_COMMENT_SUCCESS,
      comments: data,
      error: error
    });
  } catch (e) {
    yield put({ type: ACTIONS.GET_COMMENT_FAILURE, error: e.message });
  }
}

function* postComment(action) {
  try {
    const { data, error } = yield call(
      API.postComment,
      action.payload.postId,
      action.payload.comment
    );
    yield put({
      type: ACTIONS.POST_COMMENT_SUCCESS,
      payload: { comment: data, error: error }
    });
  } catch (e) {
    yield put({
      type: ACTIONS.POST_COMMENT_FAILURE,
      payload: { comment: null, error: e.message }
    });
  }
}

function* updateComment(action) {
  try {
    const { data, error } = yield call(
      API.updateComment,
      action.payload.postId,
      action.payload.commentId,
      action.payload.comment
    );
    yield put({
      type: ACTIONS.UPDATE_COMMENT_SUCCESS,
      payload: { comment: data, error: error }
    });
  } catch (e) {
    yield put({ type: ACTIONS.UPDATE_COMMENT_FAILURE, message: e.message });
  }
}

function* deleteComment(action) {
  try {
    const { data, error } = yield call(
      API.deleteComment,
      action.payload.postId,
      action.payload.commentId
    );
    yield put({
      type: ACTIONS.DELETE_COMMENT_SUCCESS,
      payload: { comment: data, error: error }
    });
  } catch (e) {
    yield put({ type: ACTIONS.DELETE_COMMENT_FAILURE, message: e.message });
  }
}

function* getPosts(action) {
  try {
    const { data, error } = yield call(
      API.getPostsFiltered,
      action.payload.params
    );
    yield put({
      type: ACTIONS.GET_POSTS_SUCCESS,
      payload: { posts: data, error: error, page: action.payload.page }
    });
  } catch (e) {
    yield put({
      type: ACTIONS.GET_POSTS_FAILURE,
      payload: { posts: null, error: e.message }
    });
  }
}

function* searchPosts(action) {
  try {
    const { data, error } = yield call(
      API.getPostsFiltered,
      action.payload.params
    );
    yield put({
      type: ACTIONS.SEARCH_POSTS_SUCCESS,
      payload: { posts: data, error: error }
    });
  } catch (e) {
    yield put({
      type: ACTIONS.SEARCH_POSTS_FAILURE,
      payload: { posts: null, error: e.message }
    });
  }
}

function* sortPosts(action) {
  try {
    const { data, error } = yield call(
      API.getPostsFiltered,
      action.payload.params
    );
    yield put({
      type: ACTIONS.SORT_POSTS_SUCCESS,
      payload: { posts: data, error: error }
    });
  } catch (e) {
    yield put({
      type: ACTIONS.SORT_POSTS_FAILURE,
      payload: { posts: null, error: e.message }
    });
  }
}

function* deletePost(action) {
  try {
    const { data, error } = yield call(API.deletePost, action.payload.postId);
    yield put({
      type: ACTIONS.DELETE_POST_SUCCESS,
      payload: { post: data, error: error }
    });
  } catch (e) {
    yield put({
      type: ACTIONS.DELETE_POST_FAILURE,
      payload: { posts: null, error: e.message }
    });
  }
}

//watcher saga
function* rootSaga() {
  yield takeEvery(ACTIONS.GET_COMMENTS_REQUEST, getComments);
  yield takeEvery(ACTIONS.GET_COMMENT_REQUEST, getComment);
  yield takeEvery(ACTIONS.UPDATE_COMMENT_REQUEST, updateComment);
  yield takeEvery(ACTIONS.POST_COMMENT_REQUEST, postComment);
  yield takeEvery(ACTIONS.DELETE_COMMENT_REQUEST, deleteComment);
  yield takeEvery(ACTIONS.GET_POSTS_REQUEST, getPosts);
  yield takeEvery(ACTIONS.SEARCH_POSTS_REQUEST, searchPosts);
  yield takeEvery(ACTIONS.SORT_POSTS_REQUEST, sortPosts);
  yield takeEvery(ACTIONS.DELETE_POST_REQUEST, deletePost);
}

export default rootSaga;
