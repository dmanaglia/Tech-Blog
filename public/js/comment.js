const commentPath = window.location.toString().split('/');
const user_id = commentPath[commentPath.length - 1] * 1;
const post_id = commentPath[commentPath.length - 2] * 1;

async function editFormHandler(event){
    event.preventDefault();
    let userComment = document.getElementById('comment-text').value;
    const text = userComment.trim();

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            text,
            user_id,
            post_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(response.status === 200){
        document.location.replace(`/post/${post_id}/${user_id}`);
    }else{
        console.log('Ooops something went wrong');
    }
}


document.querySelector('.add-comment-form').addEventListener('submit', editFormHandler);
