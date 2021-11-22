import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import { actions } from '../../static/appConstants';
import { Popover, Tooltip } from 'reactstrap';
import EmojiCount from '../resuable/EmojiCount';
import reaction from '../../icons/reaction.png';
import './TriggerReaction.scss';
import { actions } from '../../static/appConstants';

const TriggerReaction = (props) => {

    const { currentUser, content, userContentReactions, emojis } = props || {};
    const [showReactions, setShowReactions] = useState(false);
    const [showTooltip, setShowTooltip] = useState();
    const dispath = useDispatch();

    const clickListener = useCallback(() =>{
        setShowTooltip(false);
        setShowReactions(false);
    },[]);

    useEffect(() =>{
        document.addEventListener('click', clickListener);
        return() => document.removeEventListener('click', clickListener);
    },[clickListener]);

    const triggerHanlder = (emoji) =>{
        const isExist = userContentReactions?.find(ucr => (Number(ucr?.user_id) === Number(currentUser.id)) && (Number(emoji?.id) === Number(ucr?.reaction_id)));

        if(isExist){
            dispath({type: actions.DELETE_REACT_ON_CONTENT, id: isExist.id})
        }
        else{
            dispath({type: actions.POST_REACT_ON_CONTENT, payload:{
                user_id: currentUser?.id,
                reaction_id: emoji.id,
                content_id: content.id
            }})
        }
    }

    return (
        <div className='trigger-reaction-container'>
            <div className='reacted-container'>
                {
                    Array.isArray(emojis) && emojis.map((emoj, idx) =>{
                        let reacted = userContentReactions?.filter(u => Number(u?.reaction_id) === Number(emoj?.id));
                        if(reacted.length > 0){
                            const isCurrentUserReacted = reacted.find(r => Number(r.user_id === currentUser.id));
                            return <EmojiCount isCurrentUserReacted={isCurrentUserReacted} emoj={emoj} reacted={reacted}/>
                        } else return null;
                    }   
                    )
                }
            </div>
            <div className='reaction-container' id={`showReactions${content?.id}`} onClick={() => setShowReactions(!showReactions)}>
                <img src={reaction} alt='React to Post' />
            </div>
            <Popover placement="top" isOpen={showReactions} target={`showReactions${content?.id}`} toggle={() => setShowReactions(!showReactions)} hideArrow>
                <div className='emoji-list'>
                    {
                        Array.isArray(emojis) && emojis.map((emoj) =>
                            <>
                            <div className='emoji' id={`${emoj?.name}`} onClick={() => triggerHanlder(emoj)}>{emoj?.emoji}</div>
                            <Tooltip flip  autohide={true} isOpen={showTooltip === emoj?.id} target={`${emoj?.name}`} toggle={() => setShowTooltip(emoj?.id)}>{emoj?.name}</Tooltip>
                            </>)
                    }
                </div>
            </Popover>
        </div>
    )
}

export default TriggerReaction;