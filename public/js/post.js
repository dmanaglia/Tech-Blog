const commentPath = window.location.toString().split('/');

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


document.querySelector('.add-post-form').addEventListener('submit', editFormHandler);