import React, { useState } from 'react'
import { Input, Button } from 'antd'
import Axios from 'axios';
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

const { TextArea } = Input;

function Comment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")
    
    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        //아무것도 안 한 상태에서의 클릭 이벤트 = 페이지 전체 refresh 방지
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId
        }
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                setcommentValue("")
                props.refreshFunction(response.data.result)
            }else {
                alert('코멘트를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p>댓글</p>
            <hr />
            {/* Comment Lists  */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={props.postId} commentLists={props.commentLists} />
                    </React.Fragment>
                )
            ))}
            


            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>


        </div>
    )
}

export default Comment
