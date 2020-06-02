import React from 'react';
import s from './Post.module.css'
import userImage from '../../../../assets/Images/user.jpg'

const Post = (props) => {
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

export default Post;