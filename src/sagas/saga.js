import { put, takeLatest, all } from 'redux-saga/effects';
import { actions, apis } from '../static/appConstants';
import { callApi } from '../api';

function* getUsers(){
    yield put({type : actions.LOADING});
    const users = yield callApi(apis.getUsers, 'GET');
    yield put({type : actions.UPDATE_USERS, users});
}

function* getEmojis(){
    yield put({type : actions.LOADING});
    const emojis = yield callApi(apis.getEmojis, 'GET');
    yield put({type : actions.UPDATE_EMOJIS, emojis});
}

function* getUserContentReactions(action){
    yield put({type : actions.LOADING});
    let api = `${apis.getUserContentReactions}${action.contentId ? `?content_id=${action.contentId}`:''}`;
    const userContentReactions = yield callApi(api, 'GET');
    yield put({type : actions.UPDATE_USER_CONTENT_REACTION, userContentReactions});
}

function* postReactOnContent(action){
    const userContentReactions = yield all([
        yield callApi(apis.getUserContentReactions, 'POST', action.payload),
        yield callApi(apis.getUserContentReactions, 'GET')
    ])
    yield put({type : actions.UPDATE_USER_CONTENT_REACTION, userContentReactions :userContentReactions[1]});
}

function* deleteReactOnContent(action){
    const userContentReactions = yield all([
        yield callApi(`${apis.getUserContentReactions}/${action.id}`, 'DELETE'),
        yield callApi(apis.getUserContentReactions, 'GET')
    ])
    yield put({type : actions.UPDATE_USER_CONTENT_REACTION, userContentReactions :userContentReactions[1]});
}

export default function* rootSaga() {
    yield all([
        yield takeLatest(actions.GET_USERS, getUsers),
        yield takeLatest(actions.GET_USERS, getEmojis),
        yield takeLatest(actions.USER_CONTENT_REACTION, getUserContentReactions),
        yield takeLatest(actions.POST_REACT_ON_CONTENT, postReactOnContent),
        yield takeLatest(actions.DELETE_REACT_ON_CONTENT, deleteReactOnContent)
    ]);
}