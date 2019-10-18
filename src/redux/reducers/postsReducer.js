import * as ACTIONS from '../actions/actionTypes';

const initialState = {
  posts: []
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET_POSTS
    case ACTIONS.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts:
          Number(action.payload.page) === 1
            ? [...action.payload.posts]
            : [...state.posts, ...action.payload.posts]
      };

    case ACTIONS.GET_POSTS_FAILURE:
      return { ...state, error: action.payload.error };

    //SEARCH_POSTS
    case ACTIONS.SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.posts]
      };

    case ACTIONS.SEARCH_POSTS_FAILURE:
      return { ...state, error: action.payload.error };

    //SORT_POSTS
    case ACTIONS.SORT_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.posts]
      };

    //DELETE_POST
    case ACTIONS.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts.filter(e => {
            return e.id !== action.payload.post.id;
          })
        ]
      };

    case ACTIONS.SORT_POSTS_FAILURE:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};

export default postsReducer;
