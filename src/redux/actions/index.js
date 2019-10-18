export const handleActions = type => {
  return {
    request: payload => ({ type, payload }),
    success: payload => ({ type, payload }),
    failure: payload => ({ type, payload })
  };
};
