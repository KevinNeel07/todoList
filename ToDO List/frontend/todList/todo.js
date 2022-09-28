const button = document.getElementById('button');
let list_Data = document.getElementById('list_ele');
let cmp_taskList = document.getElementById('cmp_taskList');
let content = document.getElementById('content');
let signOutbtn = document.getElementById('signOut');


const params = new URLSearchParams(window.location.search);
let email = params.get('email');

let session_Email = sessionStorage.getItem('session');
console.log(email, session_Email);

if (session_Email == email) {
    console.log('User is valid');

    window.onload = function () {
        getItem()
    };

    button.addEventListener('click', setData);

    function setData(e) {
        e.preventDefault()

        let list = document.getElementById('item');

        let user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            localStorage.setItem('user');
        } else {
            user[user.findIndex((user) => user.email === email)].pendingTask.push(list.value);

            localStorage.setItem('user', JSON.stringify(user));
        }

        showList(list.value, checkIcon = true)

       let taskAlert = document.getElementById('taskAlert');

        if(taskAlert !== null){
            taskAlert.parentNode.removeChild(taskAlert)
        }

        list.value = ''

    }

    function getItem() {
        let data = JSON.parse(localStorage.getItem('user'))
        let user = data.find((u) => u.email === email)

        let p = document.createElement('p');
        p.setAttribute('id', 'taskAlert')
        console.log(user);

        if (user.pendingTask == '') {
            let textNode = document.createTextNode('No tast available');
            p.appendChild(textNode);
            content.appendChild(p);
        } else {
            let pendingTask = user.pendingTask;
            let completedTask = user.completedTask;
            pendingTask.forEach((task) => {
                showList(task, checkIcon = true)
            })
            completedTask.forEach((task) => {
                showList(task, checkIcon = false)
            })

        }
    }

    function showList(task, checkIcon) {
        let div = document.createElement('div')
        let list_Ele = document.createElement('li');
        list_Ele.appendChild(document.createTextNode(task));
        div.appendChild(list_Ele)

        let delELem = true;

        if (checkIcon == true) {

            //displays the check button for pending task

            list_Data.appendChild(div);

            //Checked Button
            let checkedButton = document.createElement('button');
            checkedButton.setAttribute('id', 'checkedButton');
            checkedButton.innerHTML = 'check';
            div.appendChild(checkedButton);
            checkedButton.addEventListener('click', () => { delItem(task, cmpTaskDEl = false), checkItem(task, div.parentNode.removeChild(div)) })
            delELem = false;
            
        } else {
            //for completed task
            cmp_taskList.appendChild(div);
            delELem = true
        }

        // Delete Button
        let delBUtton = document.createElement('button');
        delBUtton.setAttribute('id', 'delButton')
        delBUtton.innerHTML = 'X'
        div.appendChild(delBUtton)

        delBUtton.addEventListener('click', () => {
            delItem(task, delELem)
            div.parentNode.removeChild(div)
        }
        )
    }

    function checkItem(task) {

        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

        user[user.findIndex((user) => user.email === email)].completedTask.push(task);

        localStorage.setItem('user', JSON.stringify(user));

        let cmpTaskDEl = true;
        showList(task, checkIcon = false)

    }

    function delItem(task, cmpTaskDEl) {

        let deleteEvent = document.getElementById('delButton')
        console.log(deleteEvent)

        let data = JSON.parse(localStorage.getItem('user'))

        let user = data.find((u) => u.email === email)
        let userData;
        if (cmpTaskDEl == true) {

            //Removes the element from completed task

            userData = user.completedTask
            let newItems = userData.filter((ele) => ele !== task)
            data[data.findIndex((d) => d.email === email)].completedTask = newItems;
            localStorage.setItem('user', JSON.stringify(data))
            cmpTaskDEl = false;
        } else {

            //Removes the element from pending task

            userData = user.pendingTask
            let newItems = userData.filter((ele) => ele !== task)
            data[data.findIndex((d) => d.email === email)].pendingTask = newItems;
            localStorage.setItem('user', JSON.stringify(data))
            cmpTaskDEl = true
        }

    }

    signOutbtn.addEventListener('click', () => {
        window.location.replace('../index.html')
    })
}
else {
    window.location.replace('../index.html')
}
