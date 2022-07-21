import axios from "axios";

function setTodos(todos){
    document.getElementById('todo-loader').hidden = true;
    var container = document.getElementById('todo-container');
    var strToAdd = `
    <table id="main-table" class="table">
        <thead>
        <tr class="text-light">
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Due</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>`;
    todos.forEach(todo => {
        strToAdd +=`
        
        <tr>
            <td>${todo.name}</td>
            <td>${todo.status}</td>
            <td>${todo.priorityLevel}</td>
            <td>${todo.due}</td>
            <td>${todo.description}</td>
            <td id="${todo["_id"]}" class="needs"><div class="loader small" hidden></td>
        </tr>
        `;
    });

    strToAdd = strToAdd + `</tbody></table>`;

    container.innerHTML = strToAdd;

    document.querySelectorAll(".needs").forEach(element => {
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";

        deleteButton.addEventListener("click", async (e) => {
            var id = e.target.parentElement.id;
            e.target.parentElement.querySelector('.loader').hidden = false;
            e.target.parentElement.querySelectorAll('button').forEach(button => {
                button.hidden = true;
            });


            await axios.delete(`/todo/${id}`);

            var todos = (await axios.get('/todo')).data;
            setTodos(todos);
        })
        element.appendChild(deleteButton);
        
        var completeButton = document.createElement('button');
        completeButton.innerHTML = "Complete";

        completeButton.addEventListener("click", async (e) => {
            var id = e.target.parentElement.id;
            e.target.parentElement.querySelector('.loader').hidden = false;
            e.target.parentElement.querySelectorAll('button').forEach(button => {
                button.hidden = true;
            });


            await axios.put(`/todo/${id}`, {status: "Completed"});

            var todos = (await axios.get('/todo')).data;
            setTodos(todos);
        });

        element.appendChild(completeButton);
    });
}

async function main(){
    var todos = axios.get('/todo');

    if(localStorage.getItem('todos') != null){
        try{
            var localTodos = await JSON.parse(localStorage.getItem('todos'));
            setTodos(localTodos);
        }catch(err){
            //do nothing
        }
    }

    todos = (await todos).data;

    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos(todos);
}

main();