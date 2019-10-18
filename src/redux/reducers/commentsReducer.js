import * as ACTIONS from '../actions/actionTypes';

const initialState = {
  comments: []
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET_COMMENTS
    case ACTIONS.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...action.payload.comments]
      };
    case ACTIONS.GET_COMMENTS_FAILURE:
      return { ...state, error: action.payload.error };

    //GET_COMMENT
    case ACTIONS.GET_COMMENT_SUCCESS:
      return { ...state, comments: action.payload };
    case ACTIONS.GET_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    //UPDATE_COMMENT
    case ACTIONS.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(e => {
            return e.id !== action.payload.comment.id;
          }),
          action.payload.comment
        ].sort((p, n) => p.id - n.id)
      };
    case ACTIONS.UPDATE_COMMENT_FAILURE:
      return { ...state, error: action.payload.error };

    //POST_COMMENT
    case ACTIONS.POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment]
      };
    case ACTIONS.POST_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    //DELETE_COMMENT
    case ACTIONS.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(e => {
            return e.id !== action.payload.comment.id;
          })
        ]
      };

    default:
      return state;
  }
};

export default commentsReducer;
