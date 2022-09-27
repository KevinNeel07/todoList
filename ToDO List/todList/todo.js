const button = document.getElementById('button');
let list_Data = document.getElementById('list_ele');
let content = document.getElementById('content');

let deleteEvent = document.getElementById('delButton')

let signOutbtn = document.getElementById('signOut');


if(deleteEvent){
    deleteEvent.addEventListener((e)=>{
        e.target.value
        console.log(e.innerHTML);
    })
}

button.addEventListener('click', setData);

let email;

window.onload = function () {

    const params = new URLSearchParams(window.location.search);
    email = params.get('email');

    getItem()
};

function setData(e) {
    e.preventDefault()

    let list = document.getElementById('item');

    let user = JSON.parse(localStorage.getItem('user'));

    user[user.findIndex((user) => user.email === email)].task.push(list.value);

    localStorage.setItem('user', JSON.stringify(user));

    showList(list.value)
  
    list.value = ''

}

function getItem() {
    let data = JSON.parse(localStorage.getItem('user'))
    let user = data.find((u) => u.email === email)

    if (user.task == null) {
        let p = document.createElement('p');
        let textNode = document.createTextNode('No tast available');
        p.appendChild(textNode);
        content.appendChild(p);
    } else {

        let userData = user.task
        userData.forEach((task) => {
           showList(task)
        })
    }
}

function showList(task){
    let list_Ele = document.createElement('li');
    list_Ele.appendChild(document.createTextNode(task));
    list_Data.appendChild(list_Ele);

    // Delete Button
    let delBUtton = document.createElement('button');
    delBUtton.setAttribute('id', 'delButton')
    delBUtton.innerHTML = 'X'
    list_Ele.appendChild(delBUtton)

    delBUtton.addEventListener('click', () => {
        delItem(task)
        list_Ele.parentNode.removeChild(list_Ele)
    }
    )
}

function delItem(task) {

    let deleteEvent = document.getElementById('delButton')
    console.log(deleteEvent)


    let data = JSON.parse(localStorage.getItem('user'))
    let user = data.find((u) => u.email === email)
    let userData = user.task


    let newItems = userData.filter((ele) => ele !== task)
    console.log(userData, 'userData');

    console.log(newItems);
    data[data.findIndex((d) => d.email === email)].task = newItems;

    localStorage.setItem('user', JSON.stringify(data))
}

signOutbtn.addEventListener('click', ()=>{
    window.location.replace('../index.html')
})