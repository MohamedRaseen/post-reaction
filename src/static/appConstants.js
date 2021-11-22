
export const actions = {
    GET_USERS : 'GET_USERS',
    UPDATE_USERS: 'UPDATE_USERS',
    SWITCH_USER: 'SWITCH_USER',
    LOADING:'LOADING',
    UPDATE_EMOJIS:'UPDATE_EMOJIS',
    USER_CONTENT_REACTION:'USER_CONTENT_REACTION',
    UPDATE_USER_CONTENT_REACTION:'UPDATE_USER_CONTENT_REACTION',
    POST_REACT_ON_CONTENT: 'POST_REACT_ON_CONTENT',
    DELETE_REACT_ON_CONTENT: 'DELETE_REACT_ON_CONTENT'
}

//apis
const base = 'https://artful-iudex.herokuapp.com/';
export const apis = {
    getUsers: `${base}users`,
    getEmojis: `${base}reactions`,
    getUserContentReactions: `${base}user_content_reactions`
}

//static data
export const contents = [
    {
        "id": 1,
        "user_id": 7,
        "content":"Loyalty is an expensive thing so don't expect it from the cheap people",
        "date":"2011-10-10T14:48:00"
    },
    {
        "id": 2,
        "user_id": 3,
        "content":"1) The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela<br/>2)The way to get started is to quit talking and begin doing. -Walt Disney",
        "date":"2021-10-20T03:52:30"
    }
]