const signupLoginLink = document.querySelectorAll(".form-content .bottom-link a");
const signupForm = document.getElementById('signup_form');
const emailInput = document.getElementById('email_ip');
const usernameInput = document.getElementById('username_ip');
const passwordInput = document.getElementById('password_ip');
const createPwdIpBox = document.getElementById('create_pwd_ip_box');
let passwordCorrect = false;
const signUpMsgDiv = document.getElementById('signup-msg-div');
const loginForm = document.getElementById('login_form');
const loginEmailIp = document.getElementById('login_email');
const loginPasswordIp = document.getElementById('login_password');
const loginMsgDiv = document.getElementById('login-msg-div');


// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.form-popup').classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});

// signup ka code below -->
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passwordCorrect === true) {
        signUpMsgDiv.innerHTML = "";
        (async () => {
            try {
                const dataToBeSent = {
                    email: emailInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value,
                    auth_provider: 'local'
                };

                const resp = await fetch('http://localhost:5050/signup', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToBeSent)
                });
                const jsonResp = await resp.json();

                // neeche check kring ki agar duplicate username ya email h toh kya krein -->
                if (jsonResp.err_no === 1062 && jsonResp.err_code === 'ER_DUP_ENTRY' && jsonResp.err_for === 'email') {
                    emailInput.parentElement.classList.add('wrong-ip');
                    emailInput.nextElementSibling.innerText = 'Email already exists';
                    emailInput.nextElementSibling.classList.add('wrong-ip-pe-label-ka-response');
                }
                else if (jsonResp.err_no === 1062 && jsonResp.err_code === 'ER_DUP_ENTRY' && jsonResp.err_for === 'username') {
                    usernameInput.parentElement.classList.add('wrong-ip');
                    usernameInput.nextElementSibling.innerText = 'Username already exists';
                    usernameInput.nextElementSibling.classList.add('wrong-ip-pe-label-ka-response');
                }
                else if (jsonResp.err_no === 1062 && jsonResp.err_code === 'ER_DUP_ENTRY' && (jsonResp.err_for[0] === 'email' && jsonResp.err_for[1] === 'username')) {
                    emailInput.parentElement.classList.add('wrong-ip');
                    emailInput.nextElementSibling.innerText = 'Email already exists';
                    emailInput.nextElementSibling.classList.add('wrong-ip-pe-label-ka-response');

                    usernameInput.parentElement.classList.add('wrong-ip');
                    usernameInput.nextElementSibling.innerText = 'Username already exists';
                    usernameInput.nextElementSibling.classList.add('wrong-ip-pe-label-ka-response');
                }

                // agar sab sahi toh hume JWT mil jaega and inserting the token into the localstorage
                localStorage.clear();
                localStorage.token = jsonResp.token;
                window.location.href = '../mainInterfaceANDnoteEditor/index.html';

            } catch (error) {
                console.error(error);
            }
        })();
    }
    else {
        signUpMsgDiv.innerText = "Password didn't match";
        signUpMsgDiv.style.color = 'red';
    }
});

//emailip ka code below-->
emailInput.addEventListener('focus', () => {
    emailInput.parentElement.classList.remove('wrong-ip');
    emailInput.nextElementSibling.innerText = 'Enter your email';
    emailInput.nextElementSibling.classList.remove('wrong-ip-pe-label-ka-response');
});
//usernameip ka code below-->
usernameInput.addEventListener('focus', () => {
    usernameInput.parentElement.classList.remove('wrong-ip');
    usernameInput.nextElementSibling.innerText = 'Enter your username';
    usernameInput.nextElementSibling.classList.remove('wrong-ip-pe-label-ka-response');
});
//confirm password ka code below -->
passwordInput.addEventListener('keyup', () => {
    if (passwordInput.value === createPwdIpBox.value) {
        passwordInput.parentElement.classList.remove('wrong-ip');
        passwordInput.nextElementSibling.classList.remove('wrong-ip-pe-label-ka-response');
        passwordCorrect = true;
    }
    else {
        if (passwordInput.value !== '') { //gar input box khaali nhi toh yeh sab kaam kro
            passwordCorrect = false;
            passwordInput.parentElement.classList.add('wrong-ip');
            passwordInput.nextElementSibling.classList.add('wrong-ip-pe-label-ka-response');
        }
    }
});



// login ka code below -->
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    (async () => {
        try {
            const dataToBeSent = {
                email: loginEmailIp.value,
                password: loginPasswordIp.value,
            };
            const resp = await fetch(`http://localhost:5050/login`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(dataToBeSent)
            });
            const respJson = await resp.json();
            
            if(respJson.message === "User not found") {
                loginMsgDiv.innerText = "User not found";
                loginMsgDiv.style.color = "red";
                loginMsgDiv.style.fontWeight = "700";
            }
            else {
                // inserting the token into the localstorage
                localStorage.clear();
                localStorage.token = respJson.token;
                window.location.href = '../mainInterfaceANDnoteEditor/index.html';
            }
            
            
        } catch (error) {
            console.error(error);
        }
    })();
});


// -------------------- Password Show/Hide Toggle Engine -------------------- //

const passwordEyes = document.querySelectorAll('.toggle-password-eye');

passwordEyes.forEach(eye => {
    eye.addEventListener('click', () => {
        const passwordInput = eye.parentElement.querySelector('input');
        
        if (passwordInput.type === 'password') {
            // State: MASKED -> VISIBLE
            passwordInput.type = 'text';
            
            // Swap to the crossed-out eye glyph icon cleanly
            eye.classList.remove('ri-eye-line');
            eye.classList.add('ri-eye-off-line');
        } else {
            // State: VISIBLE -> MASKED
            passwordInput.type = 'password';
            
            // Swap back to the regular eye glyph icon cleanly
            eye.classList.remove('ri-eye-off-line');
            eye.classList.add('ri-eye-line');
        }
    });
});