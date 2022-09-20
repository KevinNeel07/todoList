const button = document.getElementById('button');
let list_Data = document.getElementById('list_ele');
let content = document.getElementById('content');

button.addEventListener('click', () => { getData(); getItem() });

let storeData = [];

const params = new URLSearchParams(window.location.search)
let email = params.get('email');

window.onload = getItem();

function getData(e) {
    let list = document.getElementById('item');

    storeData.push(list.value)

    let jsonData = JSON.parse(JSON.stringify(...JSON.parse(localStorage.getItem('user', email))));

    jsonData.tasks = 'thisistest';
    console.log(jsonData)

    let user = jsonData
    console.log(user);

    // let userdata = localStorage.setItem("user", JSON.stringify([...JSON.parse(localStorage.getItem("user", 'a@a')), {tasks: [user]}]));

    JSON.parse(JSON.stringify(...JSON.parse(localStorage.getItem('user', email))));

    list.value = '';

}

function getItem() {
    let data = JSON.parse(localStorage.getItem('tasks'))
    if (data == null) {
        let p = document.createElement('p');
        let textNode = document.createTextNode('No tast available');
        p.appendChild(textNode);
        content.appendChild(p);
    } else {

        let jsonData = JSON.stringify(...JSON.parse(localStorage.getItem('user', email)));

        let userData = JSON.parse(jsonData)


        console.log(userData);

        // localStorage.setItem('user', userData.email, {task: list.value})

        let newData = data.forEach((d) => {
            let list_Ele = document.createElement('li');
            let textNode = document.createTextNode(d.task)
            content.appendChild(textNode);

            let delBUtton = document.createElement('button');
            delBUtton.setAttribute('id', 'delButton')
            delBUtton.innerHTML = 'X'

            list_Ele.appendChild(delBUtton)

        })
    }
}

function setTOList() {

}