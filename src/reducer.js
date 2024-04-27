export default function reducer(data, action) {
    switch(action.type) {
        case 'data_initiated':
            return action.payload;
        case 'comment_added':
            return {
                ...data, 
                comments: {
                    commentsnextid:  data.comments.commentsnextid + 1,
                    content: [
                        ...data.comments.content, 
                        {
                            ...action.payload, 
                            id: data.comments.commentsnextid
                        }
                    ].slice(0,50)
                }
            }
        case 'reply_added':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return {
                                ...comment, 
                                repliesnextid: comment.repliesnextid + 1,
                                replies: [
                                    ...comment.replies,
                                    {
                                        ...action.payload, 
                                        id: comment.repliesnextid
                                    }
                                ].slice(0,20)
                            }
                        }
                        return comment;
                    })
                }
            }
        case 'comment_updated':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return {
                                ...comment, 
                                content: action.payload, 
                                edited: Date.now()
                            }
                        }
                        return comment;
                    })
                }
            }
        case 'reply_updated':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return {
                                ...comment, 
                                replies: comment.replies.map(reply => {
                                    if (reply.id === action.replyid) {
                                        return {
                                            ...reply,
                                            content: action.payload,
                                            edited: Date.now()
                                        }
                                    }
                                    return reply
                                })
                            }
                        }
                        return comment;
                    })
                }
            }
        case 'comment_deleted':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.filter(comment => {
                        return comment.id !== action.commentid
                    })
                }
            }
        case 'reply_deleted':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return {
                                ...comment, 
                                replies: comment.replies.filter(reply => {
                                    return reply.id !== action.replyid
                                })
                            }
                        }
                        return comment;
                    })
                }
            }
        case 'comment_score_up':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return { ...comment, score: comment.score + 1 }
                        }
                        return comment;
                    }).sort((prevComment, curComment) => {
                        if (prevComment.score > curComment.score) {
                            return -1;
                        } else if (prevComment.score < curComment.score) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                } 
            }
        case 'comment_score_down':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return { ...comment, score: comment.score - 1 }
                        }
                        return comment;
                    }).sort((prevComment, curComment) => {
                        if (prevComment.score > curComment.score) {
                            return -1;
                        } else if (prevComment.score < curComment.score) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                } 
            }
        case 'reply_score_up':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return {
                                ...comment, 
                                replies: comment.replies.map(reply => {
                                    if (reply.id === action.replyid) {
                                        return { ...reply, score: reply.score + 1 }
                                    }
                                    return reply
                                })
                            }
                        }
                        return comment;
                    })
                } 
            }
        case 'reply_score_down':
            return {
                ...data, 
                comments: {
                    ...data.comments,
                    content: data.comments.content.map(comment => {
                        if (comment.id === action.commentid) {
                            return {
                                ...comment, 
                                replies: comment.replies.map(reply => {
                                    if (reply.id === action.replyid) {
                                        return { ...reply, score: reply.score - 1 }
                                    }
                                    return reply
                                })
                            }
                        }
                        return comment;
                    })
                } 
            }
        default: throw Error(`Unknown action type: ${action.type}`)
    }
}