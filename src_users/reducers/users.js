import {
  USERS_LIST_SAVE,
  USERS_ADD_SAVE,
  USERS_EDIT_SAVE,
  USERS_DELETE_SAVE,
} from '../sagas/index';

// users reducer
export default function users(state = {}, action) {
  switch (action.type) {
    case USERS_LIST_SAVE:
      return action.users;

    case USERS_ADD_SAVE:
      return [...state, {
        ...action.user,
        id: (action.user.id || Math.floor(Math.random() * ((9999 - 1000) + 1)) + 1000),
      }];

    case USERS_EDIT_SAVE:
      return state.map(user =>
        (Number(user.id) === Number(action.user.id) ? { ...action.user } : user),
      );

    case USERS_DELETE_SAVE:
      return state.filter(user =>
        Number(user.id) !== Number(action.user_id),
      );

    // initial state
    default:
      return state;
  }
}
