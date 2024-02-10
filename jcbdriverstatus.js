var l1 = []
var l2 = []
var l3 = []
var l4 = []
var p = []
var q = []
var r = []
var c1 = []
var dm;
var val;
// localStorage.setItem('salary','5000,5000')
// localStorage.setItem('date1','2024/01/28,2024/02/03')
window.onload = function () {
    var x = localStorage.getItem('date');
    var y = localStorage.getItem('reason');
    var m = localStorage.getItem('date1');
    var n = localStorage.getItem('salary');
    var a = localStorage.getItem('Months');
    var b = localStorage.getItem('Salary');
    var c = localStorage.getItem('Leaves');
    p = a.split(',')
    q = b.split(',')
    r = c.split(',')
    display_year(p, q, r)
    date = ""
    rea = ""
    for (var i = 0; i < x.length; i++) {
        if (x[i] == ',') {
            l1.push(date)
            date = ""
        }
        else {
            date += x[i]
        }
    }
    for (var i = 0; i < y.length; i++) {
        if (y[i] == ',') {
            l2.push(rea)
            rea = ""
        }
        else {
            rea += y[i]
        }
    }
    if (date.length > 0) {
        l1.push(date)
    }
    if (rea.length > 0) {
        l2.push(rea)
    }
    display(l1, l2)
    d = ""
    sal = ""
    for (var i = 0; i < m.length; i++) {
        if (m[i] == ',') {
            l3.push(d)
            d = ""
        }
        else {
            d += m[i]
        }
    }
    for (var i = 0; i < n.length; i++) {
        if (n[i] == ',') {
            l4.push(sal)
            sal = ""
        }
        else {
            sal += n[i]
        }
    }
    if (d.length > 0) {
        l3.push(d)
    }
    if (sal.length > 0) {
        l4.push(sal)
    }
    displaysal(l3, l4)
}
function add() {

    var date = document.getElementById('d1').value;
    console.log(date)
    var v2 = document.getElementById('work').value;
    if (v2.length > 0 && date.length > 0) {
        if (date[5] != '0') {
            dm = parseInt(date[5] + date[6])
        }
        else {
            dm = parseInt(date[6])
        }
        console.log("date for replace"+dm)
        val = parseInt(r[dm - 1])
        r[dm-1] = val+1
        r[12]=parseInt(r[12])+1
        storeyear(p,q,r)
        l1.push(date)
        l2.push(v2)
        clearInput1()
        store(l1, l2)
    }
    else {
        alert("Enter your work")
    }
}
function addsalary() {
    var date = document.getElementById('d2').value;
    var v3 = document.getElementById('work1').value;
    if (v3.length > 0 && date.length > 0) {
        if (date[5] != '0') {
            dm = parseInt(date[5] + date[6])
        }
        else {
            dm = parseInt(date[6])
        }
        val = parseInt(q[dm - 1])
        q[dm-1] = val + parseInt(v3)
        q[12]=parseInt(q[12])+parseInt(v3)
        storeyear(p,q,r)
        l3.push(date)
        l4.push(v3)
        clearInput2()
        storesal(l3, l4)
    }
    else {
        alert("Enter your work")
    }
}
function store(l1, l2) {
    localStorage.setItem('date', l1);
    localStorage.setItem('reason', l2);
    display(l1, l2)
}
function storesal(l3, l4) {
    localStorage.setItem('date1', l3);
    localStorage.setItem('salary', l4);
    displaysal(l3, l4)
}
function storeyear(p,q,r) {
    localStorage.setItem('Months', p);
    localStorage.setItem('Salary', q);
    localStorage.setItem('Leaves', r);
    display_year(p,q,r)
}
function storedef() {
    console.log("Default setting is done")
    localStorage.setItem('Months',["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December","Total"]
    );
    localStorage.setItem('Salary', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]);
    localStorage.setItem('Leaves', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]);
    display_year(p,q,r)
}
function display(l1, l2) {
    var r = document.getElementById("enter");
    r.innerHTML = "";
    if (l1[0] != null) {
        var out = `<table border="1px" >
            <tr>
                <th>Date</th>
                <th>Reason For Holiday</th>
                <th>Delete</th>
            </tr>`;
        for (var i = 0; i < l1.length; i++) {
            out = out + `<tr>
                <td>`+ l1[i] + `</td>
                <td>`+ l2[i] + `</td>
                <td><button type='button' onclick='del(`+ i + `)'>Delete</button>
                </tr>`;
        }
        out = out + "</table>";
        r.innerHTML = out;
    }
}
function display_year(p, q, r) {
    var r1 = document.getElementById("year");
    r1.innerHTML = "";
    var out = `<table border="1px" >
            <tr>
                <th>Months</th>
                <th>Salary</th>
                <th>Leaves</th>
            </tr>`;
    for (var i = 0; i < p.length; i++) {
        out = out + `<tr>
                <td>`+ p[i] + `</td>
                <td>`+ q[i] + `</td>
                <td>`+ r[i] + `</td>
                </tr>`;
    }
    out = out + "</table>";
    r1.innerHTML = out;
}
function displaysal(l3, l4) {
    var r = document.getElementById("enter1");
    r.innerHTML = "";
    if (l3[0] != null) {
        var out = `<table border="1px" >
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Delete</th>
            </tr>`;

        for (var i = 0; i < l3.length; i++) {
            out = out + `<tr>
                <td>`+ l3[i] + `</td>
                <td>`+ l4[i] + `</td>
                <td><button type='button' onclick='delsal(`+ i + `)'>Delete</button>
                </tr>`;
        }
        out = out + "</table>";
        r.innerHTML = out;
    }
}
function clearInput1() {
    var inputElement1 = document.getElementById("work");
    inputElement1.value = "";


}
function clearInput2() {
    var inputElement2 = document.getElementById("work1");
    inputElement2.value = "";


}
function del(i) {
    //alert("Leaves Record is deleting....")
    date=l1[i]
    if (date[5] != '0') {
        dm = parseInt(date[5] + date[6])
    }
    else {
        dm = parseInt(date[6])
    }
    val = parseInt(r[dm - 1])
    if(val>0)
    {
    r[dm-1] = val-1
    r[12]=parseInt(r[12])-1
    }
    storeyear(p,q,r)
    l1.splice(i, 1)
    l2.splice(i, 1)
    store(l1, l2);
    if (l1.length == 0) {
        location.reload()
    }
}
function delsal(i) {
    //alert("Amount Record is deleting....")
    date=l3[i]
    v3=l4[i]
    if (date[5] != '0') {
        dm = parseInt(date[5] + date[6])
    }
    else {
        dm = parseInt(date[6])
    }
    val = parseInt(q[dm - 1])
    if(val>0)
    {
    q[dm-1] = val -parseInt(v3)
    q[12]=parseInt(q[12])-parseInt(v3)
    }
    storeyear(p,q,r)
    l3.splice(i, 1)
    l4.splice(i, 1)
    storesal(l3, l4);
    if (l3.length == 0) {
        location.reload()
    }
}
