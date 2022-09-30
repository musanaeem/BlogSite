
const form = document.getElementById("form");
const username = document.getElementById("username");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    clear_errors();
    check_inputs();

});

function clear_errors(){
    small_elements = document.getElementsByTagName("small");

    for(let index =0; index < small_elements.length; index++){
        small_elements[index].remove();
    }
}


function check_inputs(){
    // trim() used to remove whitespaces from start and end
    const username_value = username.value.trim();
    const first_name_value = first_name.value.trim();
    const last_name_value = last_name.value.trim();
    const email_value = email.value.trim();
    const password1_value = password1.value.trim();
    const password2_value = password2.value.trim();

    let results = [];

    results.push(is_valid_username(username_value));
    results.push(is_valid_email(email_value));
    results.push(is_valid_name(first_name_value, first_name));
    results.push(is_valid_name(last_name_value, last_name));
    results.push(are_valid_passwords(password1_value, password2_value));


    if (results.every((result)=> result))
        show_success();
        set_empty();
}

function is_valid_username(username_value){
    const username_regex = /^[\w-]+$/
    const message = "Invalid username entered. Please only use a combination of alphanumeric, _ and -"
    return validate_username_or_name(username_value, username, username_regex, message)
}

function validate_username_or_name(value, input, regex, message){
    if (value != ""){
        if (value.length >= 3 && value.length <= 15){
            //case insensitive check of only alphabets
            if(regex.test(value))
                return true
            else
                set_error_for(input, message)
        }
        else
            set_error_for(input, "The length should be 3-15 characters. please try again.")
    }
    else
        set_error_for(input, "Field can not be empty. Please enter a valid value")

    return false
}


function set_error_for(input, message){

    const form_control = input.parentElement;

    old_small = form_control.querySelector("small");
    if (old_small)
        old_small.remove();

    const small = document.createElement("small");
    small.innerText = message;

    form_control.appendChild(small);
}

function is_valid_name(name_value, name_input){
    const name_regex = /^[a-z]+$/i
    const message = "Invalid name entered. Please only use alphabets"
    return validate_username_or_name(name_value, name_input, name_regex, message)

}


function is_valid_email(email_value){
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email_value != "")
        if(email_regex.test(email_value))
            return true;
        else
            set_error_for(email, "Invalid Email. The email format entered is not valid.");
    else
        set_error_for(email, "Field can not be empty. Please enter a valid value");
    
    return false;
}


function are_valid_passwords(password1_value, password2_value){
    password_regex = /(.*[0-9].*[!@#$%^&*()<>?/.,`~].*)|(.*[!@#$%^&*()<>?/.,`~].*[0-9].*)/

    if(password1_value != "")
        if(password1_value == password2_value)
            if(password1_value.length > 5 && password1_value.length < 16)
                if(password_regex.test(password1_value))
                    return true;
                else
                    set_error_for(password1, "Invalid password. Password should contain numbers and symbols.");
            else
                set_error_for(password1, "Password length should be between 6 and 15 characters.");
        else
            set_error_for(password1, "Password fields do not match. Please try again.");
   else
        set_error_for(password1, "Field can not be empty. Please enter a valid value");


    return false
}


function show_success(){
    
    const small = document.createElement("small");
    small.innerText = "Successfully Registered";
    small.id = "success_message"
    form.appendChild(small);

}

function set_empty(){
    username.value = "";
    first_name.value = "";
    last_name.value = "";
    email.value = "";
    password1.value = "";
    password2.value = "";

}