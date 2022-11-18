const usernameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const messagesEl = document.querySelector('#message');


const form = document.querySelector('#submit-form');


const checkUsername = () => {
    console.log("check name")

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    const element =document.getElementById('name');

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
        element.classList.add('error');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
        element.classList.add('error');
    } else {
        showSuccess(usernameEl);
        valid = true;
        
        element.classList.add('success')
    }
    
    return valid;
};


const checkEmail = () => {
    console.log("check email");
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkMessage = () => {
    console.log("check message")
    let valid = false;
    const min = 3,
        max = 25;

    const message = messagesEl.value.trim();

    if (!isRequired(message)) {
        showError(messagesEl, 'Message cannot be blank.');
    }  else if (!isBetween(message.length, min, max)) {
        console.log("message between min and max")
        showError(messagesEl, `Message must be between ${min} and ${max} characters.`)
    
        showSuccess(messagesEl);
        valid = true;
    }

    return valid;
};



const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// const isMessageSecure = (messages) => {
//     const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
//     return re.test(messages);
// };

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;



    // const element =document.getElementById('name');
    // element.classList.remove('success')

    // element.classList.add('error');



    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;


    const element =document.getElementById('name');
    element.classList.remove('error')
    element.classList.add('success');

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail();
        isMessageValid = checkMessage();
       

    let isFormValid = isUsernameValid &&
        isEmailValid && isMessageValid;
    

    // submit to the server if the form is valid
    if (isFormValid) {

        $("#submit-form").submit((e)=>{
            e.preventDefault()
            $.ajax({
                url:"https://script.google.com/macros/s/AKfycbzD3yjor40ULGzVeZEbflPsf2l9scBSkUVyiq1cXSt5GA-_PIblYvhiPe6onXXHCvG_7A/exec",
                data:$("#submit-form").serialize(),
                method:"post",
                success:function (response){
                    alert("Form submitted successfully")
                    window.location.reload()
                    //window.location.href="https://google.com"
                },
                error:function (err){
                    alert("Something Error")
                }
            })
        })

    }
    else
    {
        alert("Something Error")

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'message':
            checkMessage();
            break;
    }
}));