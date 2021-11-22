
import { actions } from '../static/appConstants';

const reducer = (state= {}, action) =>{

    switch(action.type){

        case actions.UPDATE_USERS:
            return { ...state, users: [...action.users], currentUser: (Array.isArray(action.users) && action.users.length > 0 && {...action.users[0]}), loading: false};
        case actions.SWITCH_USER:
            return {...state, currentUser: action.user && {...action.user}};
        case actions.LOADING:
            return {...state, loading: true}
        case actions.UPDATE_EMOJIS:
            return {...state, emojis: action.emojis, loading:false}
        case actions.UPDATE_USER_CONTENT_REACTION:
            return {...state, userContentReactions: action.userContentReactions, loading:false}
        default:
            return state;
    }
}

export default reducer;