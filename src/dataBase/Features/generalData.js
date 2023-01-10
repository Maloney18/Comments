import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";

const initialState = {
    data: JSON.parse(localStorage.getItem("dataBase")) || 
    { 
        "currentUser": {
          "image": { 
            "png": "images/avatars/image-juliusomo.png",
            "webp": "images/avatars/image-juliusomo.webp"
          },
          "username": "juliusomo"
        },
        "comments": [
          {
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1 month ago",
            "score": 12,
            "open": false,
            "user": {
              "image": { 
                "png": "images/avatars/image-amyrobson.png",
                "webp": "images/avatars/image-amyrobson.webp"
              },
              "username": "amyrobson"
            },
            "replies": [],
            "timeOfPost": moment().subtract(1, 'month')
          },
          {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "open": false,
            "user": {
              "image": { 
                "png": "images/avatars/image-maxblagun.png",
                "webp": "images/avatars/image-maxblagun.webp"
              },
              "username": "maxblagun"
            },
            "replies": [
              {
                "id": 3,
                "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                "createdAt": "1 week ago",
                "score": 4,
                "open": false,
                "replyingTo": "maxblagun",
                "user": {
                  "image": { 
                    "png": "images/avatars/image-ramsesmiron.png",
                    "webp": "images/avatars/image-ramsesmiron.webp"
                  },
                  "username": "ramsesmiron"
                },
                "timeOfPost": moment().subtract(1, 'week')
              },
              {
                "id": 4,
                "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                "createdAt": "2 days ago",
                "score": 2,
                "open": false,
                "deleteTog": false,
                "edit": false,
                "replyingTo": "ramsesmiron",
                "user": {
                  "image": { 
                    "png": "images/avatars/image-juliusomo.png",
                    "webp": "images/avatars/image-juliusomo.webp"
                  },
                  "username": "juliusomo"
                },
                "timeOfPost": moment().subtract(2, 'days')
              }
            ],
            "timeOfPost": moment().subtract(2, 'weeks')
          }
        ]
    }
}

const general = createSlice({
  name: 'general',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.data.comments.push(action.payload)
    },

    addReplies: (state, action) => {
      state.data.comments.map(com => com.user.username === action.payload.replyingTo ? {...com, replies: com.replies.push(action.payload)} : {...com})
    },

    deleteComment: (state, action) => {
      state.data.comments = state.data.comments.filter(comment => comment.id !== action.payload)
    },

    deleteReply: (state, action) => { 
      state.data.comments.map(comment => comment.replies = comment.replies.filter(rep => rep.id !== action.payload))
      // return nested.map(function (element) {
      // return element * 2;
    },

    incCommScore: (state, action) => {
      state.data.comments = state.data.comments.map(comm => comm.id === action.payload ? {...comm, score: comm.score + 1} : {...comm})
    },

    incReplyScore: (state, action) => {
      state.data.comments.map(comment => comment.replies = comment.replies.map( rep => rep.id === action.payload ? {...rep, score: rep.score + 1 } : {...rep}))
    },

    decCommScore: (state, action) => {
      state.data.comments = state.data.comments.map(comm => comm.id === action.payload ? {...comm, score: comm.score - 1} : {...comm})
    },

    decReplyScore: (state, action) => {
      state.data.comments.map(comment => comment.replies = comment.replies.map( rep => rep.id === action.payload ? {...rep, score: rep.score - 1 } : {...rep}))
    },

    toggleCommRepBar: (state, action) => {
      state.data.comments = state.data.comments.map(comment => comment.id === action.payload ? {...comment, open: !comment.open} : {...comment})
    },

    toggleReplyBar: (state, action) => {
      state.data.comments.map(comment => comment.replies = comment.replies.map(rep => rep.id === action.payload ? {...rep, open: !rep.open} : {...rep}))
    },

    toggleDeleteBar: (state, action) => {
      state.data.comments.map(comment => comment.replies = comment.replies.map(rep => rep.id === action.payload ? {...rep, deleteTog: !rep.deleteTog} : {...rep}))
    },

    toggleComDelBar: (state, action) => {
      state.data.comments = state.data.comments.map(comment => comment.id === action.payload ? {...comment, deleteTog: !comment.deleteTog} : {...comment})
    },

    toggleEditBar: (state, action) => {
      state.data.comments =  state.data.comments.map(comment => comment.id === action.payload ? {...comment, edit: !comment.edit} : {...comment})
      state.data.comments.map(comment => comment.replies = comment.replies.map(rep => rep.id === action.payload ? {...rep, edit: !rep.edit} : {...rep}))
    },

    updateCommentAndReply: (state, action) => {
      state.data.comments = state.data.comments.map(comment => comment.id === action.payload.id ? {...comment, content: action.payload.content} : {...comment})
      state.data.comments.map(comment => comment.replies = comment.replies.map(rep => rep.id === action.payload.id ? {...rep, content: action.payload.content} : {...rep}))
    },

    updateAllTime: (state) => {
      state.data.comments = state.data.comments.map(comment => ({...comment, createdAt: moment(comment.timeOfPost).fromNow()}))
      state.data.comments.map(comment => comment.replies = comment.replies?.map(rep => ({...rep, createdAt: moment(rep.timeOfPost).fromNow()})))
    }
  }
})


export default general.reducer;
export const { addComment, addReplies, deleteComment, deleteReply, incCommScore, incReplyScore, decCommScore, decReplyScore, toggleCommRepBar, toggleReplyBar, toggleDeleteBar, toggleComDelBar, toggleEditBar, updateCommentAndReply, updateAllTime } = general.actions



