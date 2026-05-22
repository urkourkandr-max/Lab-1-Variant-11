document.addEventListener("DOMContentLoaded", function () {

let items = [];
let editId = null;

const API = "http://localhost:3000/api/duties";

const form = document.getElementById("dutyForm");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");

load();

async function load(){
const res = await fetch(API);
const data = await res.json();
items = data.items;
render();
}

form.addEventListener("submit", async function(e){
e.preventDefault();
clearErrors();

const data = {
date: dateInput.value,
time: timeInput.value,
name: nameInput.value.trim(),
comment: commentInput.value.trim()
};

if(!validate(data)) return;

if(editId){

await fetch(`${API}/${editId}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

editId = null;

}else{

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

}

form.reset();
load();

});

function validate(data){

let valid = true;

if (!data.date) {
showError(dateInput, "Оберіть дату");
valid = false;
}

if(!data.time){
showError(timeInput, "Оберіть час");
valid = false;
}

if(data.name.length < 3){
showError(nameInput, "Ім’я мінімум 3 букви");
valid = false;
}

if(data.comment.length > 50){
showError(commentInput, "Макс 50 символів");
valid = false;
}

return valid;
}

function showError(input, message){
input.classList.add("invalid");
input.nextElementSibling.textContent = message;
}

function clearErrors(){
document.querySelectorAll(".invalid")
.forEach(el => el.classList.remove("invalid"));

document.querySelectorAll(".error")
.forEach(el => el.textContent = "");
}

function render(){

let filtered = items.filter(item =>
item.name.toLowerCase()
.includes(searchInput.value.toLowerCase())
);

tableBody.innerHTML = "";

filtered.forEach((item, index)=>{

const row = document.createElement("tr");

row.innerHTML = `
<td>${index+1}</td>
<td>${item.date}</td>
<td>${item.time}</td>
<td>${item.name}</td>
<td>${item.comment || ""}</td>
<td>
<button onclick="editItem(${item.id})">Редагувати</button>
<button onclick="deleteItem(${item.id})">Видалити</button>
</td>
`;

tableBody.appendChild(row);

});

}

window.deleteItem = async function(id){

await fetch(`${API}/${id}`,{
method:"DELETE"
});

load();

}

window.editItem = function(id){

const item = items.find(i => i.id === id);

dateInput.value = item.date;
timeInput.value = item.time;
nameInput.value = item.name;
commentInput.value = item.comment;

editId = id;

}

searchInput.addEventListener("input", render);

sortBtn.addEventListener("click", function(){

items.sort((a,b)=> new Date(a.date) - new Date(b.date));

render();

});

});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});