
const button = document.getElementById('login');

button.addEventListener('click', login);
const path = './todList/todolist.html';

function login(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails == null) {
        alert('No data available. Please sign up')
    } else {
        let i = 0;
        while (i <= userDetails.length) {
            if (i >= userDetails.length) {
                alert('User does not ezist');
                break
            }
            else if (userDetails[i].email !== email) {
                if (i > userDetails.length) {
                    alert('User Does not exist!');
                    break;
                }
                console.log('line 28')
                i++
            } else if (userDetails[i].email == email && userDetails[i].password == password) {
                    console.log('line 32')
                    window.location.href = `./todList/todolist.html?email=${email}`;
                    alert('login Successfull!')
                    break;
            }
            else {
                alert('invald credentials')
                console.log('line 38')
                i++
            }
        }
    }

}
