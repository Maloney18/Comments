import './currentUser.css'
import { addReplies, toggleReplyBar } from "../dataBase/Features/generalData"
import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import { nanoid } from "nanoid"
import moment from "moment/moment"

const Replyreply = ( props ) => {
    const dispatch = useDispatch()
    const { data } = useSelector(store => store.generalData)
    const { user, id, replyingTo } = props?.currentUser?.replies

    // const [dTime, setDTime] = useState('')
    // const [timeOfPost, setTimeOfPost] = useState('')
    // const [started, setStarted] = useState(false)
    const [newRep, setNewRep] = useState({
        "id": nanoid(),
        "content": `@${user.username}`,
        "createdAt": 'now',
        "replyingTo": replyingTo,
        "score": 0,
        "open": false,
        "deleteTog": false,
        "edit": false,
        "user": {
            "image": { 
                "png": "images/avatars/image-juliusomo.png",
                "webp": "images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        },
        "timeOfPost": moment()
    })

    const write = (e) => {
        const { name, value } = e.target
        setNewRep(prevState => ({...prevState, [name]: value}))
    }

    const checkSend = () => {
        if (newRep?.content.length > user.username.length) {
            dispatch(toggleReplyBar(id))
            dispatch(addReplies(newRep))
            setNewRep(prevState => ({...prevState, content:`@${user.username} `}))
        }
    }

    // setTimeout(() => {
    //     if (started) {
    //         setTimeOfPost(dTime.fromNow())
    //         console.log(timeOfPost)
    //     }

    //     console.log(dTime, timeOfPost)
    //     console.log(started)
    // }, 1000)
            

    return (
        <div className="current-user">
            {/* <input 
                className="add-new" 
                type="text" 
                name="content"
                onChange={(e) => write(e)}
                value={newComm?.content}
                placeholder='Add a comment...'
            /> */}

            <textarea 
                name="content" 
                className="add-new" 
                cols="30" 
                rows="10"
                onChange={(e) => write(e)}
                value={newRep?.content}
                placeholder='Add a comment...'
            ></textarea>

            <div className="user-info">
                <div className="cur-user-img-cont">
                    <img src={data?.currentUser?.image?.webp} alt="current user" className="cur-user-img" />
                </div>

                <button onClick={checkSend} className="send">
                    SEND
                </button>
            </div>
        </div>
    )
}

export default Replyreply;