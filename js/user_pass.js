    
    const generate_username = () =>{
        const all_usernames = [];
        const lowercaseLetters = "qwertyuioplkjhgfdsazxcvbnm"
        const uppercaseLetters = lowercaseLetters.toUpperCase();
        const letters = []
        letters.push(lowercaseLetters,uppercaseLetters);
        let username = "";
        while (username.length<4) {
    let randomNumberForLetters = Math.trunc(Math.random()*2)
    const randomNumber = Math.trunc(Math.random()*lowercaseLetters.length)
    username  += letters[randomNumberForLetters][randomNumber] 
}
if(!all_usernames.includes(username)) {
    all_usernames.push(username)
    document.getElementById("guest_username").innerHTML=username
}
}
    
    const generate_username_admin = () =>{
        const all_usernames = [];
        const lowercaseLetters = "qwertyuioplkjhgfdsazxcvbnm"
        const uppercaseLetters = lowercaseLetters.toUpperCase();
        const letters = []
        letters.push(lowercaseLetters,uppercaseLetters);
        let username = "";
        while (username.length<4) {
    let randomNumberForLetters = Math.trunc(Math.random()*2)
    const randomNumber = Math.trunc(Math.random()*lowercaseLetters.length)
    username  += letters[randomNumberForLetters][randomNumber] 
}
if(!all_usernames.includes(username)) {
    all_usernames.push(username)
    document.getElementById("admin_username").innerHTML=username
}
}
const generate_password = ()=> {
    
    const all_passwords = [];
    const lowercaseLetters = "qwertyuioplkjhgfdsazxcvbnm"
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const letters = []
    letters.push(lowercaseLetters,uppercaseLetters);
    let password = "";
    while (password.length<6) {
        let randomNumberForLetters = Math.trunc(Math.random()*2)
        const randomNumber = Math.trunc(Math.random()*lowercaseLetters.length)
        password  += letters[randomNumberForLetters][randomNumber] 
}
if(!all_passwords.includes(password)) {
    
    all_passwords.push(password)
document.getElementById("guest_password").innerHTML=password
}
}

const generate_password_admin = ()=> {
    
    const all_passwords = [];
    const lowercaseLetters = "qwertyuioplkjhgfdsazxcvbnm"
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const letters = []
    letters.push(lowercaseLetters,uppercaseLetters);
    let password = "";
    while (password.length<6) {
        let randomNumberForLetters = Math.trunc(Math.random()*2)
        const randomNumber = Math.trunc(Math.random()*lowercaseLetters.length)
        password  += letters[randomNumberForLetters][randomNumber] 
}
if(!all_passwords.includes(password)) {
    
    all_passwords.push(password)
document.getElementById("admin_password").innerHTML=password
}
}
