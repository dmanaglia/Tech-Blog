const commentPath = window.location.toString().split('/');
const user_id = commentPath[commentPath.length - 1] * 1;

async function editFormHandler(event){
    event.preventDefault();
    let postTitle = document.getElementById('title-text').value;
    const title = postTitle.trim();
    let postText = document.getElementById('post-text').value;
    const text = postText.trim();

    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({
            text,
            title,
            user_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(response.status === 200){
        document.location.replace(`/user/${user_id}`);
    }else{
        console.log('Ooops something went wrong');
    }
}


document.querySelector('.add-post-form').addEventListener('submit', editFormHandler);