console.log("login/signup js connected")

//login JS
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (!username || !password) {
        sendAlert("Must include email and password before signing in.", 'danger', '.login-btn')
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
        }
        if (response.status === 400) {
            sendAlert("Incorrect email or password, please try again.", 'danger', '.login-btn');

        }
        else if (response.status >= 500) {
            sendAlert("Server Error, unable to login", 'danger', '.login-btn');
        }
    }
}

// alerts using bootstrap growl
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
const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#signupEmail').value.trim();
    const username = document.querySelector('#signupUsername').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    //alerts user if fields left empty
    if (!username || !password || !email) {
        sendAlert("Must fill in all fields before signing up.", 'danger', '.signup-btn')
    }

    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, email }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            //if successfule signup, sending user to their profile
            document.location.replace('/dashboard')
        }
        //adding error handling for user sign up to meet validation parameters
        if (response.status === 408) {
            sendAlert("Email or Username is already in use.", 'danger', '.signup-btn');
        }
        if (response.status === 409) {
            sendAlert("Password Length must be 8 characters or longer.", 'danger', '.signup-btn');
        }
        if (response.status === 410) {
            sendAlert("Username must be 4 characters or longer.", 'danger', '.signup-btn');
        }
        if (response.status === 400) {
            sendAlert("Error signing up.", 'danger', '.signup-btn');
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)