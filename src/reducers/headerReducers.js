import { SET_HEADER_TITLE } from '../constants';

export const headerTitleReducer = (
  state = {
    headerTitle: ['Manager Users', 'Create New User'],
  },
  action
) => {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return { ...state, headerTitle: action.payload.headerTitle };
    default:
      return state;
  }
};
