import React, { useState, useEffect } from 'react'
import { Tooltip, Icon } from 'antd'
import Axios from 'axios'

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)

    let variable = {}
    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    }else {
        variable = { commentId: props.commentId , userId: props.userId }
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success) {
                //좋아요, 싫어요 갯수
                setLikes(response.data.likes.length)

                //좋아요나 싫어요를 이미 눌렀는지에 대한 정보
                response.data.likes.map(like => {
                    //내 아이디와 비교하여 내가 눌렀는지를 나타냄
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })

            }else {
                alert('Likes 정보를 가져오지 못했습니다.');
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success) {
                //싫어요 갯수
                setDislikes(response.data.dislikes.length)

                //싫어요를 이미 눌렀는지에 대한 정보
                response.data.dislikes.map(dislike => {
                    //내 아이디와 비교하여 내가 눌렀는지를 나타냄
                    if(dislike.userId === props.userId) {
                        setDisLikeAction('disliked')
                    }
                })

            }else {
                alert('Dislikes 정보를 가져오지 못했습니다.');
            }
        })
    }, [])

    const onLike = () => {
        if(LikeAction === null) {
            //like가 클릭되어 있지 않을 때
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DisLikeAction !== null) {
                            setDislikes(Dislikes - 1)
                            setDisLikeAction(null)
                        }
                    }else {
                        alert('Like을 올리지 못했습니다.')
                    }
                })
        } else {
            //like가 클릭되어 있을 때
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    }else {
                        alert('Like을 내리지 못했습니다.')
                    }
                })
        }
    }

    const onDislike = () => {
        if(DisLikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDisLikeAction(null)
                    }else {
                        alert('dislike을 지우지 못했습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDisLikeAction('disliked')

                        if(LikeAction !== null) {
                            setLikes(Likes - 1)
                            setLikeAction(null)
                        }
                    }else {
                        alert('dislike을 올리지 못했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction==="liked"?"filled":"outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>

            <span key="comment-basic-like">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction==="disliked"?"filled":"outlined"}
                        onClick={onDislike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
