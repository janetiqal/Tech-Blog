

console.log("login js connected")

//login JS
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameLogin').value.trim();
    console.log("username", username)
    const password = document.querySelector('#loginPassword').value.trim();
    console.log("user password", password)

    if (!username || !password) {
        sendAlert("Must include email and password before signing in.", 'danger', '.login-button')
    }

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
   
    if (response.ok) {
        //if successfule login, sending user to their profile
        document.location.replace('/dashboard')
        console.log('user logged in')
    }
    if (response.status === 400) {
        sendAlert("Incorrect email or password, please try again.", 'danger', '.login-btn');
    }
    else {
        sendAlert("Server Error, unable to login", 'danger', '.login-btn');
    }
}
}

//alerts using bootstrap growl
function sendAlert(status, color, element) {
    $(".bootstrap-growl").remove();
    $.bootstrapGrowl(status, {
        ele: element,
        type: color,
        align: 'center',
        delay: 2000,
    });
}

//TO DO: CREATE THE SIGN UP FUNCTIONALITY 

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)