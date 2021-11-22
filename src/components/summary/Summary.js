import { useState } from 'react';
import { Button, Collapse, Card, CardBody} from 'reactstrap';
import EmojiCount from '../resuable/EmojiCount';
import './Summary.scss';

const Summary = (props) => {

    const { users, emojis, userContentReactions } = props || {};
    const [showSummary, setShowSummary] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
   
    const filteredSummary = activeTab ? userContentReactions?.filter(u => Number(u.reaction_id) === Number(activeTab)) : [...userContentReactions];

    return (
        <div className='summary-container'>
            <Button color="primary" onClick={() => setTimeout(() => setShowSummary(!showSummary), 100)}>Show Summary</Button>
            <Collapse isOpen={showSummary}>
                <Card>
                    <CardBody>
                        <div className='emoji-tab'>
                            <div className={`tab${!activeTab ? ' active':''}`} onClick={() => {
                                if(activeTab !== 'all'){
                                    setActiveTab(null);
                                }
                                }
                                }>All</div>
                            {
                                 Array.isArray(emojis) && emojis.map((emoj, idx) =>{
                                    let reacted = userContentReactions?.filter(u => Number(u?.reaction_id) === Number(emoj?.id));
                                    if(reacted.length > 0){
                                        return <div key={idx} className={`tab${Number(activeTab) === Number(emoj?.id) ? ' active':''}`} onClick={() => {
                                            if(activeTab !== emoj?.name){
                                                setActiveTab(emoj?.id);
                                            } 
                                        }
                                    }><EmojiCount emoj={emoj} reacted={reacted}/></div>
                                    } else return null;
                                }   )
                            }
                        </div>
                        <div className='reaction-summary'>
                        {
                            filteredSummary && filteredSummary.map((ucr, index) =>{
                                const user = users?.find(u => Number(u?.id) === Number(ucr.user_id)), emoji = emojis?.find(e => Number(ucr.reaction_id) === Number(e.id));
                                if(user)
                                return(
                                    <div className='reaction' key={index}>
                                        <img src={user.avatar} alt='user pic'/>
                                        <span className='emoji'>{emoji.emoji}</span>
                                        <span>{`${user.first_name} ${user.last_name}`}</span>
                                    </div>
                                )
                                else return null;
                            })
                        }
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default Summary;