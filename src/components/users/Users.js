import { useEffect} from 'react';
import { useSelector, useDispatch} from  'react-redux';
import { actions } from '../../static/appConstants';
import Loader from '../loader/Loader';
import './Users.scss'

const Users = () =>{

    const users = useSelector(state => state.users), currentUser = useSelector(state => state.currentUser), loading = useSelector(state => state.loading);
    const dispatch = useDispatch();

    useEffect(() =>{
        if(!users) dispatch({type: actions.GET_USERS});
    },[users, dispatch]);

    const swicthUser = (e) =>{
        if(e?.target?.value !== currentUser?.id){
            dispatch({type: actions.SWITCH_USER, user: users?.find(user => Number(user.id) === Number(e.target.value))})
        }
    }

    return(
        <div className='user-container'>
            <h5>You can switch the user to login  </h5><br/>
            {
                loading && !users &&<Loader/>
            }
            {   
                Array.isArray(users) && 
                    <select value={currentUser?.id} onChange={swicthUser}>
                        {
                            users.map((user, index )=> <option key={index} value={user?.id}>{`${user?.first_name} ${user?.last_name}`}</option>)
                        }
                    </select>
            }
        </div>
    )
}

export default Users;