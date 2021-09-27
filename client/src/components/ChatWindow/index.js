import  React from 'react';
import './style.css';

function ChatWindow({ messages, sendMessage, username, closeChat }) {

    const renderMsg = (username) => messages.map((msg, idx) =>
        <div className={ username === msg.username ? "message own-message" : "message foreign-message" } key={ idx }>
            <span className="msg-body">{ msg.msg }</span>
            <span className="msg-author">{ msg.username }</span>
        </div>);

    return (
        <aside>
            <div id="title-bar"><span>Room Chat</span><span id="close-chat" onClick={e => closeChat(e)}><i class="bi bi-x"></i></span></div>
            <div role="messages">
                { messages.length !== 0 ? renderMsg(username) : null }
            </div>

            <form role="send-message" onSubmit={e => sendMessage(e)}>
                <input type="textarea" name="msg" placeholder="New Message..."/>
                <input type="submit" value="Send"/>
            </form>
        </aside>)
}

export default ChatWindow;
