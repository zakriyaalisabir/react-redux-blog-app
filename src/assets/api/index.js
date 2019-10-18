import axios from 'axios';

import {API_LINK} from './constants';

class API_CLASS {
  getPosts = () => {
    const resp = axios
      .get(API_LINK)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  getPostsFiltered = (params) => {
    const resp = axios
      .get(API_LINK+params)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  getPost = id => {
    const resp = axios
      .get(API_LINK + id)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  addPost = data => {
    const resp = axios
      .post(API_LINK, data)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  deletePost = id => {
    const resp = axios
      .delete(API_LINK + id)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  updatePost = (id, data) => {
    const resp = axios
      .put(API_LINK + id, data)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  //Likes Manager
  postLike = postId => {
    const resp = axios
      .post(API_LINK + postId + '/likes')
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  getLikes = postId => {
    const resp = axios
      .get(API_LINK + postId + '/likes')
      .then(res => {
        return { data: res.data.length, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  getlike = (postId, likeId) => {
    const resp = axios
      .get(API_LINK + postId + '/likes/' + likeId)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  deleteLike = (postId, likeId) => {
    const resp = axios
      .delete(API_LINK + postId + '/likes/' + likeId)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  //Comments Manager
  getComments = postId => {
    const resp = axios
      .get(API_LINK + postId + '/comments/')
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  getComment = (postId, commentId) => {
    const resp = axios
      .get(API_LINK + postId + '/comments/' + commentId)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  postComment = (postId, data) => {
    const resp = axios
      .post(API_LINK + postId + '/comments/', data)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  updateComment = (postId, commentId, data) => {
    const resp = axios
      .put(API_LINK + postId + '/comments/' + commentId, data)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  deleteComment = (postId, commentId) => {
    const resp = axios
      .delete(API_LINK + postId + '/comments/' + commentId)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };
}

export default API_CLASS;
