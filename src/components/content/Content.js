import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TriggerReaction from '../triggerReaction/TriggerReaction';
import Summary from '../summary/Summary';
import { actions } from '../../static/appConstants';
import Loader from '../loader/Loader';
import './Content.scss';

const Content = ({ contents }) => {

    const currentUser = useSelector(state => state.currentUser), users = useSelector(state => state.users), emojis = useSelector(state => state.emojis), userContentReactions = useSelector(state => state.userContentReactions), loading = useSelector(state => state.loading);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch({type: actions.UPDATE_EMOJIS});
        dispatch({type: actions.USER_CONTENT_REACTION})
    }, [dispatch]);

    if (!currentUser || !users || !emojis || !userContentReactions) return null;

    return (
        <div className='contents'>
            {
                (loading && (!currentUser || !users || !emojis || !userContentReactions)) ? <Loader/> :
                Array.isArray(contents) && contents.map((content, idx) => {
                    const postedUser = users?.find(u => Number(u.id) === Number(content.user_id));
                    const postedDate = new Date(content?.date);
                    const filteredUserContentReactions = userContentReactions?.filter(reaction => Number(reaction?.content_id) === Number(content.id));
                    return (
                        <div className='content-container' key={idx}>
                            <div className='content'>
                                <div className='user-pic'>
                                    <img src={postedUser?.avatar} alt='User Pic' />
                                </div>
                                <div className='content-data'>
                                    <div className='content-info'>
                                        <div>{`${postedUser?.first_name} ${postedUser?.last_name}`}</div>
                                        <span>{`${postedDate?.toLocaleDateString()}  ${postedDate?.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}`}</span>
                                    </div>
                                    <div className='message' dangerouslySetInnerHTML={{ __html: content?.content }} />
                                </div>
                            </div>
                            <TriggerReaction idx={idx} users={users} currentUser={currentUser} content={content} emojis={emojis} userContentReactions={filteredUserContentReactions}/>
                            {filteredUserContentReactions.length > 0 && <Summary idx={idx} users={users} content={content} emojis={emojis} userContentReactions={filteredUserContentReactions}/>}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Content;