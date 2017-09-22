import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { usersFetchList, usersAddEdit, usersDelete } from './users';

export const USERS_FETCH_LIST = 'USERS_FETCH_LIST';
export const USERS_ADD_EDIT = 'USERS_ADD_EDIT';
export const USERS_DELETE = 'USERS_DELETE';
export const USERS_LIST_SAVE = 'USERS_LIST_SAVE';
export const USERS_ADD_SAVE = 'USERS_ADD_SAVE';
export const USERS_EDIT_SAVE = 'USERS_EDIT_SAVE';
export const USERS_DELETE_SAVE = 'USERS_DELETE_SAVE';


// main saga generators
export default function* sagas() {
  yield [
    fork(takeLatest, USERS_FETCH_LIST, usersFetchList),
    fork(takeLatest, USERS_ADD_EDIT, usersAddEdit),
    fork(takeLatest, USERS_DELETE, usersDelete),
  ];
}
