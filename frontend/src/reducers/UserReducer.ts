// @ts-ignore
export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        fullName: payload.fullName,
        userId: payload.userId,
        username: payload.username,
      };
    case 'REMOVE_AUTH': {
      return {
        isAuthenticated: payload.isAuthenticated,
      };
    }
  }
};
