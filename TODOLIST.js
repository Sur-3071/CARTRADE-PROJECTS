var l = []
window.onload = function () {
    var li = localStorage.getItem('name');
    word = ""
    console.log(li.length)
    for (var i = 0; i < li.length; i++) {
        if (li[i] == ',') {
            l.push(word)
            word = ""
        }
        else {
            word += li[i]
        }
    }
    if (word.length > 0) {
        l.push(word)
        display(l)
    }
}
function add() {
    var v = document.getElementById('work').value;
    if (v.length > 0) {
        l.push(v)
        clearInput()
        store(l)
    }
    else {
        alert("Enter your work")
    }
}
function store(l) {
    localStorage.setItem('name', l);
    display(l)
}
function display(l) {
    var r = document.getElementById("enter");
    r.innerHTML = "";
    var out = `<table border="1px" >
            <tr>
            <th>Sno</th>
                <th>Today Work</th>
                <th>Delete</th>
            </tr>`;
    for (var i = 0; i < l.length; i++) {
        v=i+1
        out = out + `<tr>
                <td>`+ v + `</td>
                <td>`+ l[i] + `</td>
                <td><button type='button' onclick='del(`+ i + `)'>Delete</button>
                </tr>`;
    }
    out = out + "</table>";
    r.innerHTML = out;
}
function clearInput() {
    var inputElement = document.getElementById("work");
    inputElement.value = "";
}
function del(i) {
    l.splice(i, 1)
    store(l);
    if (l.length == 0) {
        alert("Today Your work is done")
        location.reload()
    }
}