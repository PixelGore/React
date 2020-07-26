//Imports
import React from 'react';
import s from '../../Css/Post.module.css'
import userImage from '../../../../assets/Images/user.jpg'

//Post Component
const Post:React.FC<PropsType> = (props) => {
    return (
        <div className={s.posts}>
            <div className={s.item}><img src={userImage} alt="PostImage" />{props.message}</div>
            <div className ={s.rate} >
                <span> &#8679; {props.upvote}</span>
                <span> &#8681; {props.downvote}</span>
            </div>
        </div>
    )
}
type PropsType = {
    message:string
    upvote:number
    downvote:number
}


//Export
export default Post;