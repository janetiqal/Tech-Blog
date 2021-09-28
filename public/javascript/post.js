console.log("post js connected")

//edit post js
const editPostHandler= async (event)=>{
event.preventDefault();
console.log(event.target)

const postID= event.target.getAttribute('data-id')
const title= document.querySelector('.newTitle').value
const post_body= document.querySelector('.newBody').value
console.log("new post title:",title, "post id:",postID,"post body:",post_body)

if(title || post_body){
        const response = await fetch(`api/post/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({ id: postID, title:title, post_body:post_body}),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            console.log("Successful post update!")
            document.location.reload('/dashboard')
        }
    }
}
const btns = document.querySelectorAll('.update-post');
[...btns].forEach(btn => btn.addEventListener('click', editPostHandler))
//TO DO: create post js

//TO DO: Delete Post JS

const deletePostHandler= async (event)=>{
    event.preventDefault();
    
    const postID= event.target.getAttribute('data-id')

}
