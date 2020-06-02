import React from 'react';
import s from './MyPosts.module.css'
import Post from './Posts/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/Validators/Validators';
import { Textarea } from '../../Common/FormsControls/FormsControl';

const maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo(props => {
    let post = props.posts.map(p => <Post message={p.message} upvote={p.upvotes} downvote={p.downvotes} key={p.id} />)
    let addNewPost = (values) => {
        props.addPost(values.newPostText);
        values.newPostText = '';
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
});

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component={Textarea} name='newPostText' placeholder="What's new ?"
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Click</button>
            </div>
        </form>
    )
}

const ReduxPostForm = reduxForm({ form: 'AddPostForm' })(PostForm)

export default MyPosts;