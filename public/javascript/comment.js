
console.log("comment js connected")

function sendAlert(status, color, element) {
    $(".bootstrap-growl").remove();
    $.bootstrapGrowl(status, {
        ele: element,
        type: color,
        align: 'left',
        delay: 2000,
    });
}

//Add A Comment JS
const commentEventHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('.commentBody').value.trim()

    //grabbing the postID by the url
    console.log(window.location.toString().split('/'))
    //turning the url into a subset of strings in an array
    const urlSplit = window.location.toString().split('/')
    //i want the last elemnt of this array bc thats where the post id is
    const post_id = urlSplit[urlSplit.length - 1];
    // console.log("postid:", post_id)


    if (!comment) {
        sendAlert("Can not post an empty comment", "danger", "#new-comment")
    }
    if (comment.length < 5) {
        sendAlert("Comment needs to be greater than 5 characters long.", "danger", "#new-comment")
    }

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_body: comment, post_id: post_id }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            document.location.reload(`/post/${post_id}`)
            console.log("comment posted")
        }
        if (response.status > 400) {
            sendAlert("Error posting comment", ".danger", "#new-comment")
        }
    }
}

const commentBtn = document.querySelector('.newComment').addEventListener('click', commentEventHandler)



//Delete Comment JS
const deleteCommentHandler = async (event) => {
    event.preventDefault();
    // console.log(event.target)
    const commentId = event.target.getAttribute('data-id')
    console.log(commentId)

    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({ id: commentId }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.reload('/')
    }
    if (response >= 400) {
        sendAlert("Error Deleting this Comment", ".danger", ".nav")
    }
}


const deleteBtns = document.querySelectorAll('.delete-comment');
[...deleteBtns].forEach(deleteBtn => deleteBtn.addEventListener('click', deleteCommentHandler))

//Edit Comment JS
const editCommentHandler = async (event) => {
    event.preventDefault();
    console.log(event.target)
    const commentId = event.target.getAttribute('data-id')
    const editedComment = document.querySelector(`#updatedComment${commentId}`).value.trim()

    console.log(commentId, editedComment)

    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ id: commentId, comment_body: editedComment}),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.reload('/')
    }
    if (response >= 400) {
        sendAlert("Error Editing this Comment", ".danger", ".nav")
    }
}

const editBtns = document.querySelectorAll('.edit-comment');
[...editBtns].forEach(deleteBtn => deleteBtn.addEventListener('click', editCommentHandler))