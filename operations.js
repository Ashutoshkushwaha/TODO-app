window.onload = function () {
    var input = document.getElementById("userinput");
    var submitButton = document.getElementById("submit");

    const active = "ACTIVE"
    submitButton.onclick = function () {
        var value = input.value;
        if(value){
            addItem(id, value, active )
            id++;
            display();
        }

    }
}
