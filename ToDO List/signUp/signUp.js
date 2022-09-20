
const button = document.getElementById('signUp');

button.addEventListener('click', signUp);



function signUp(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails === null) {
        localStorage.setItem("user", JSON.stringify([...JSON.parse(localStorage.getItem("user") || "[]"), { name: name, email: email, password: password }]));
    } else {
        let i = 0;
        while (i <= userDetails.length) {
            if (userDetails[i].email == email) {
                if (i > userDetails.length) {
                    console.log('line 30')
                    break;
                }
                console.log('line 33')
                alert('User Already Exist!');
                break;
            } else if (userDetails[i].email !== email) {
                if (i >= userDetails.length -1) {
                    console.log('line 37')
                    localStorage.setItem("user", JSON.stringify([...JSON.parse(localStorage.getItem("user") || "[]"), { name: name, email: email, password: password }]));
                    alert('SignUp successfull. Return to login page')
                    break;
                } else {
                    console.log('line 42')
                    i++;
                }
            }
            else {
                console.log('line 46')
                i++
            }
        }

    }
}
