let url="https://62eca24d55d2bd170e83c335.mockapi.io/todo"

let getTodoList=async()=>{
let todoData;
try{
   let todoapi= await fetch(url)
        todoData=await todoapi.json()
        console.log(todoData)
        return todoData
    
}
catch{
    console.log("empty list")
}
}

let disPlayTodo=async()=>{
    try{
        let listform=document.querySelector(".todolist")
        let listvalue=""
        let getTodo=await getTodoList()
        getTodo.forEach(todo => {
            listvalue+=`
                <div class="todo card" id="todo-${todo.id}">
                <div class="row p-2">
                <div class="col-lg-8">
                <div class="tododesc" id="tododesc-${todo.id}">${todo.todo_value}</div>
                </div>
                <div class="col-lg-4">
                <button class="delete-btn btn" onclick="deleteTodo(${todo.id})"><i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            <button class="edit-btn btn" onclick="displayEdit(${todo.id})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
           
            </div>
            </div>
                </div>
            `
        });
        listform.innerHTML=listvalue


    }catch{
        console.log("value not loaded")
    }
}

disPlayTodo()

let AddTodo=async()=>{
    try{
        let value=document.querySelector("#addtodo").value
        if(value===""){
            alert("please enter the value")
        }
        else{
            let addtodo=await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    todo_value: value
                 } ),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            console.log(addtodo)
            disPlayTodo()
            document.querySelector("#addtodo").value=""
            document.querySelector(".success-msg").innerHTML="Successfully added"

        }
    }
    catch{
        console.log("not abal eto add new todo")
    }
}


let deleteTodo=async(id)=>{
    document.querySelector(".success-msg").innerHTML=""
    try{
        await fetch(url+"/"+id,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        disPlayTodo()

        document.querySelector(".success-msg").innerHTML="Successfully deleted"
    }
    catch{
        console.log("not abale to delete")
    }
}




let displayEdit=async(id)=>{
    try{
        let todovalue=document.querySelector("#tododesc-"+id).innerText
        let todolistval=document.querySelector("#todo-"+id)
        todolistval.innerHTML=""
    let divRow=document.createElement("div")
    divRow.innerHTML=""
    divRow.setAttribute("class","editTodo")
let divinnerhtml=""
divinnerhtml+=`<div class="row p-2"><div class="col-lg-12 form-inline editform"> <input type="text" value=${todovalue} class="form-control edditTodo" id="edditTodo-${id}" placeholder="enter todo">
<button class="btnEdit" onclick="editTodo(${id})">Update</button></div></div>

`
divRow.innerHTML=divinnerhtml

todolistval.innerHTML=divRow.innerHTML

    }
    catch{
        console.log("not able to edit")
    }
}
let editTodo=async(id)=>{
    try{
        let todo_value=document.querySelector("#edditTodo-"+id).value
        console.log(todo_value)
        let todovalue=await fetch(url+"/"+id,{
            method: "PUT",
            body: JSON.stringify({
                todo_value: todo_value
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        disPlayTodo()
        document.querySelector(".success-msg").innerHTML="Successfully edited"
    }
    catch{
        console.log("not able to save")
    }
}