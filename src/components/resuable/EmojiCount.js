

const EmojiCount = ({isCurrentUserReacted,emoj,reacted}) => <div className={`emoji-count${isCurrentUserReacted ? ' user-reacted' : ''}`}><span>{emoj?.emoji}<span>.</span>{`  ${reacted.length}`}</span></div>

export default EmojiCount;