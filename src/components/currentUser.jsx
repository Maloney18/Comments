import { useState } from "react"
import { nanoid } from "nanoid"
import data from "../data"
import './currentUser.css'
import { addComment } from "../dataBase/Features/generalData"
import { useDispatch } from "react-redux"

const CurrentUser = ( props ) => {
    const dispatch = useDispatch()
    const { image } = props?.currentUser
    const [newComm, setNewComm] = useState({
        "id": nanoid(),
        "content": "",
        "createdAt": new Date().getSeconds(),
        "score": 0,
        "open": false,
        "deleteTog": false,
        "user": {
            "image": { 
                "png": "images/avatars/image-juliusomo.png",
                "webp": "images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        },
        "replies": []
    })

    const write = (e) => {
        const { name, value } = e.target
        setNewComm(prevState => ({...prevState, [name]: value}))
    }

    const checkSend = () => {
        if (newComm?.content !== '') {
            dispatch(addComment(newComm))
            setNewComm(prevState => ({...prevState, content:''}))
            console.log(data.comments)
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
                value={newComm?.content}
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

export default CurrentUser;