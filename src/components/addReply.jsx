import { useState } from "react"
import './currentUser.css'
import { addReplies, toggleCommRepBar } from "../dataBase/Features/generalData"
import { useDispatch } from "react-redux"
import { nanoid } from "nanoid"

const AddReplies = ( props ) => {
    const dispatch = useDispatch()
    const { image } = props?.currentUser?.currentUser
    const { user, id } = props?.currentUser.comments

    const [newRep, setNewRep] = useState({
        "id": nanoid(),
        "content": `@${user.username}`,
        "createdAt": new Date().getSeconds(),
        "replyingTo": user.username,
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
        }
    })

    const write = (e) => {
        const { name, value } = e.target
        setNewRep(prevState => ({...prevState, [name]: value}))
    }

    const checkSend = () => {
        if (newRep?.content !== `@${user.username}`) {
            dispatch(toggleCommRepBar(id))
            dispatch(addReplies(newRep))
            setNewRep(prevState => ({...prevState, content:`@${user.username} `}))
        }
    }

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
                    <img src={image.webp} alt="current user" className="cur-user-img" />
                </div>

                <button onClick={checkSend} className="send">
                    SEND
                </button>
            </div>
        </div>
    )
}

export default AddReplies;