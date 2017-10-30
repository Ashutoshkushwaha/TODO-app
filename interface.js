var id = 1;
var newtask = /** @class */ (function () {
    function newtask() {
        this.list = [];
    }
    newtask.prototype.add = function (list) {
        this.list.push(list);
        console.log("item pushed");
    };
    newtask.prototype.complete = function (id) {
        this.list[id - 1].status = "COMPLETED";
    };
    newtask.prototype.update = function (id, title) {
        this.list[id - 1].title = title;
    };
    newtask.prototype["delete"] = function (id) {
        this.list[id - 1].status = "DELETED";
    };
    return newtask;
}());
var tasks = new newtask();
function addItem(id, item, status) {
    tasks.add({
        id: id,
        title: item,
        status: status
    });
}
function display() {
    var parent = document.getElementById("activetask");
    parent.innerHTML = "";
    if (parent) {
        for (var i = 0; i < tasks.list.length; i++) {
            var todo_element = createTodoElement(tasks.list[i]);
            parent.appendChild(todo_element);
        }
    }
}
function createTodoElement(todoOject) {
    var todo_element = document.createElement("div");
    if (todoOject.status != "DELETED") {
        var label = document.createElement("p");
        label.appendChild(document.createTextNode(todoOject.title));
        label.setAttribute("id", todoOject.id);
        label.setAttribute("contentEditable", "false");
        todo_element.appendChild(label);
        if (todoOject.status == "ACTIVE") {
            todo_element.setAttribute("class", "activestatus");
            var complete_button = document.createElement("button");
            complete_button.innerText = "Complete";
            complete_button.setAttribute("onclick", "completeTodo(" + todoOject.id + ")");
            complete_button.setAttribute("class", "btn");
            todo_element.appendChild(complete_button);
            var update_button = document.createElement("button");
            update_button.innerText = "Update";
            update_button.setAttribute("id", todoOject.id + "upd");
            update_button.setAttribute("onclick", "updateTodo(" + todoOject.id + ")");
            update_button.setAttribute("class", "btn");
            todo_element.appendChild(update_button);
        }
        if (todoOject.status != "ACTIVE") {
            todo_element.setAttribute("class", "completestatus");
        }
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete";
        delete_button.setAttribute("onclick", "deleteTodo(" + todoOject.id + ")");
        delete_button.setAttribute("class", "btn");
        todo_element.appendChild(delete_button);
    }
    return todo_element;
}
function deleteTodo(id) {
    var val = window.confirm("Are you sure You want to delete? ");
    if (val) {
        tasks["delete"](id);
    }
    display();
}
function completeTodo(id) {
    tasks.complete(id);
    display();
}
function updateTodo(id) {
    var element = document.getElementById(id);
    var btn = document.getElementById(id + "upd");
    if (element) {
        if (element.contentEditable == "false") {
            element.contentEditable = "true";
            btn.innerText = "Submit";
        }
        else {
            element.contentEditable = "false";
            tasks.update(id, element.innerText);
            display();
        }
    }
}
