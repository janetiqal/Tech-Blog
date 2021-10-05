console.log("post js connected")

//edit post js
const editPostHandler = async (event) => {
    event.preventDefault();
    console.log(event.target)

    const postID = event.target.getAttribute('data-id')
    const title = document.querySelector(`#title${postID}`).value
    const post_body = document.querySelector(`#body${postID}`).value

    console.log("new post title:", title, "post id:", postID, "post body:", post_body)


    const response = await fetch(`api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title, post_body: post_body }),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        document.location.reload('/dashboard')
    }
}

const updateBtns = document.querySelectorAll('.update-post');
[...updateBtns].forEach(updateBtn => updateBtn.addEventListener('click', editPostHandler))

// create post js
const createPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('.newPostTitle').value.trim()
    const post_body = document.querySelector('.postBody').value.trim()

    console.log(title, post_body)
    if (title && post_body) {
        const response = await fetch('api/post', {
            method: 'POST',
            body: JSON.stringify({ title: title, post_body: post_body }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.reload('/dashboard')
        }
        else {
            alert(response.statusText)
            console.log(response.statusText)
        }
    }
}
const newPostBtn = document.querySelector('.new-post').addEventListener('click', createPostHandler)

//Delete Post JS
const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log(event.target)
    const postId = event.target.getAttribute('data-id')
    console.log(postId)

    const response = await fetch(`api/post/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({ id: postId }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.reload('/dashboard')
    }
    else {
        // change this after testing
        alert(response.statusText)
    }
}
const deleteBtns = document.querySelectorAll('.delete-post');
[...deleteBtns].forEach(deleteBtn => deleteBtn.addEventListener('click', deletePostHandler))