import './comment.css'
import Reply from "./replies"
import AddReplies from "./addReply"
import { useDispatch, useSelector } from "react-redux"
import { decCommScore, deleteComment, incCommScore, toggleCommRepBar, toggleComDelBar, toggleEditBar, updateCommentAndReply, toggleUpvote } from "../dataBase/Features/generalData"
import { useState } from 'react'

const Comment = (props) => {
    const dispatch = useDispatch()
    const { data } = useSelector(store => store.generalData)
    const { user, createdAt, content, score, id, open, deleteTog, edit, upvoted } = props?.comments

    // const toggle = () => {
    //     setBool(!bool)
    // }

    const [updateComment, setUpdateComment] = useState({
        id,
        content
    })

    const write = (e) => {
        const { name, value} = e.target
        setUpdateComment(prevRep => ({...prevRep, [name]: value}))
    }

    const rep =  (
        props?.comments?.replies?.map(
            reply => (
            <Reply
            key={reply.id}
                replies = {reply}
                currentUser = {props}
            />
        )) 
    )

    return (
        <>
        
            <>
                <div className="both">

                    <div className="anyone">
                        <div className="upper-word">
                            <div className="upper">
                                <div className="img-cont">
                                    <img src={user.image.png} alt="user" className="user-image" />
                                </div>

                                <div className="verif-user flex">
                                    <p className="username">{user.username}</p>

                                    {data.currentUser.username === user.username &&
                                        <div className="you flex"> you </div>
                                    }
                                </div>

                                <p className="time">{createdAt}</p>
                            </div>

                            {data.currentUser.username === user.username && edit ? 
                                <div className="update">
                                    <textarea 
                                        name="content" 
                                        className="update-cont" 
                                        cols="30" 
                                        rows="10"
                                        onChange={(e) => write(e)}
                                        value={updateComment?.content}
                                        placeholder='Add a comment...'
                                    ></textarea>

                                    <button 
                                        onClick={() => {
                                            dispatch(updateCommentAndReply(updateComment))
                                            dispatch(toggleEditBar(id))
                                        }} 
                                        className="update-btn"
                                    >
                                        UPDATE
                                    </button>
                                </div>:
                                <div className="word">{content}</div>
                            }
                        </div>

                        <div className="lower">
                            <div className="score">
                                <span 
                                    className="inc"
                                    onClick={() => {
                                    if(!upvoted){
                                        dispatch(toggleUpvote(id))
                                        dispatch(incCommScore(id))
                                    }
                                }}
                                >
                                    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                                    </svg>
                                </span>
                                <span className="number">{score}</span>
                                <span 
                                    className="dec"
                                    onClick={() => {
                                        if (score > 0 && upvoted) {
                                            dispatch(decCommScore(id))
                                            dispatch(toggleUpvote(id))
                                        }
                                        return
                                    }}
                                >
                                    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/>
                                    </svg>
                                </span>
                            </div>
                            
                            {
                                data.currentUser.username === user.username ?
                                <div className="icon-cont flex">
                                    <div className="del-icon flex" onClick={() => dispatch(toggleComDelBar(id))}>
                                        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/>
                                        </svg>
                                        <p>Delete</p>
                                    </div>

                                    <div className="edit-icon flex" onClick={() => dispatch(toggleEditBar(id))}>
                                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/>
                                        </svg>
                                        <p>Edit</p>
                                    </div>
                                </div> :
                                <div onClick={() => dispatch(toggleCommRepBar(id))} className="reply">
                                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/>
                                    </svg>
                                    <span className="rep">Reply</span>
                                </div>
                            }
                        </div>
                    </div>
                    
                    { open && 
                        <div className="add-comment">
                            <AddReplies currentUser={props} />
                        </div>
                    }
                </div>

                { (props?.comments?.replies.length !== 0) &&
                    <div className="reply-cont">
                        { (props?.comments?.replies.length !== 0) && 
                            rep
                        }
                    </div>
                }
            </>

            {deleteTog &&   
                <div className="delete-bar-cont flex">
                    <div className="delete-bar">
                        <p className="username del">Delete reply</p>

                        <p className="word">
                            Are you sure you want do delete this reply? This will remove the reply and can't be undone.
                        </p>

                        <div className="btn-cont flex">
                            <button className="canc-btn second-btn" onClick={() => dispatch(toggleComDelBar(id))}>NO, CANCEL</button>
                            <button className="del-btn second-btn" onClick={() => dispatch(deleteComment(id))}>YES, DELETE </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Comment;