const loginPath = window.location.toString().split('/');
const login = loginPath[loginPath.length - 1] * 1;

async function editFormHandler(event){
    event.preventDefault();
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    
    if(login){
        const response = await fetch(`/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        if(response.status === 200){
            document.location.replace(`/home/${responseData.user.id}`);
        } else {
            document.getElementById('login-header').innerHTML = responseData.message;
            document.getElementById('login-header').style.color = 'red';
        }
    }
    
    if(!login){
        const email = document.getElementById('email-input').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        if(passwordConfirm === password && password.length > 7){
            const response = await fetch(`/api/users/`, {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    email
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if(response.status === 200){
                document.location.replace(`/home/${responseData.id}`);
            } else{
                document.getElementById('login-header').innerHTML = "Ooops something went wrong";
                document.getElementById('login-header').style.color = 'red';            
            }
        } else{
            if(password.length < 8){
                document.getElementById('login-header').innerHTML = "Your passwords MUST be at least 8 characters long";
                document.getElementById('login-header').style.color = 'red';
            }
            else{
                document.getElementById('login-header').innerHTML = "Your passwords do not match";
                document.getElementById('login-header').style.color = 'red';
            }
        }
    }
}
    
    
document.querySelector('.login-form').addEventListener('submit', editFormHandler);
