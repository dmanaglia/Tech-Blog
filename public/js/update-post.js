const commentPath = window.location.toString().split('/');
const post_id = commentPath[commentPath.length - 1] * 1;

async function editFormHandler(event){
    event.preventDefault();
    let postTitle = document.getElementById('title-text').value;
    const title = postTitle.trim();
    let postText = document.getElementById('post-text').value;
    const text = postText.trim();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            text,
            title
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(response.status === 200){
        document.location.replace(`/user`);
    }else{
        console.log('Ooops something went wrong');
    }
}

async function deletePost(){

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });
    if(response.status === 200){
        document.location.replace(`/user`);
    }else{
        console.log('Ooops something went wrong');
    }
}

document.querySelector('.update-post-form').addEventListener('submit', editFormHandler);
document.querySelector('.delete-btn').addEventListener('click', deletePost);