//Imports
import React from 'react'
import s from './MyPosts.module.css'
import Post from './Posts/Post'
import { ReduxPostForm, PostFormValuesType } from './PostForm'
import { PostsType } from '../../../types/types'


//MyPosts Component
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let post = props.posts.map(p => <Post message={p.message} upvote={p.upvotes} downvote={p.downvotes} key={p.id} />)
    let addNewPost = (values: PostFormValuesType) => {
        props.addPost(values.newPostText)
        values.newPostText = ''
    }

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <ReduxPostForm onSubmit={addNewPost} />
            </div>
            <div className={s.posts}>
                {post}
            </div>
        </div>

    )
}
export type MapPropsType = {
    posts:Array<PostsType>
}
export type DispatchPropsType = {
    addPost : (newPostText:string) => void
}


//Adding React.Memo
const MyPostsMemo = React.memo(MyPosts);

export default MyPostsMemo