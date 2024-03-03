var tripslist = []
var tripsdate = []
var amountdate = []
var amount = []
var l1=[]
var l2=[]
var tripscount=0
var cash=0
window.onload = function () {
    var x = localStorage.getItem('tripsdate');
    var y = localStorage.getItem('trips');
    date = ""
    rea = ""
    for (var i = 0; i < x.length; i++) {
        if (x[i] == ',') {
            tripsdate.push(date)
            date = ""
        }
        else {
            date += x[i]
        }
    }
    for (var i = 0; i < y.length; i++) {
        if (y[i] == ',') {
             tripscount += Number(rea)
            tripslist.push(rea)
            rea = ""
        }
        else {
            rea += y[i]
        }
    }
    if (date.length > 0) {
        
        tripsdate.push(date)
    }
    if (rea.length > 0) {
        tripscount += Number(rea)
        tripslist.push(rea)
    }
    console.log("value is "+tripscount)
    displaytrips()
    var x1 = localStorage.getItem('amountdate');
    var y1 = localStorage.getItem('amountgiven');
    date = ""
    rea = ""
    for (var i = 0; i < x1.length; i++) {
        if (x1[i] == ',') {
            amountdate.push(date)
            date = ""
        }
        else {
            date += x1[i]
        }
    }
    for (var i = 0; i < y1.length; i++) {
        if (y1[i] == ',') {
            cash+=parseInt(rea)
            amount.push(rea)
            rea = ""
        }
        else {
            rea += y1[i]
        }
    }
    if (date.length > 0) {
        amountdate.push(date)
    }
    if (rea.length > 0) {
        cash+=parseInt(rea)
        amount.push(rea)
    }
    displayamount()
    defstorage()
}
function addtrips() {
    var date = document.getElementById('d1').value;
    var trips = document.getElementById('trips').value;
    if(date.length>0 && trips.length>0)
    {
        tripslist.push(trips)
        tripsdate.push(date)
        storetrips()
    }
    else
    {
        alert("Enter trips here...")
    }
}
function displaytrips() {
    var r = document.getElementById("tripstable");
    r.innerHTML = "";
    if (tripslist[0] != null) {
        var out = `<table border="1px" >
            <tr>
                <th>Sno</th>
                <th>Date</th>
                <th>Total Trips Data</th>
                <th>Delete</th>
            </tr>`;
        for (var i = 0; i < tripslist.length; i++) {
            var s = i + 1

            out = out + `<tr>
                <td>`+ s + `</td>
                <td>`+ tripsdate[i] + `</td>
                <td>`+ tripslist[i] + `</td>
                <td><button type='button' onclick='deltrips(`+ i + `)'>Delete</button>
                </tr>`;
        }
        out = out + "</table>";
        r.innerHTML = out
    }
}
function addamount() {
    var date = document.getElementById('d2').value;
    var money = document.getElementById('amount').value;
    if(date.length>0 && money.length>0)
    {
        amountdate.push(date)
        amount.push(money)
        storeamount()
    }
    else{
        alert("Enter amount...")
    }
}
function displayamount() {
    var r = document.getElementById("amounttable");
    r.innerHTML = "";
    if (amount[0] != null) {
        var out = `<table border="1px" >
            <tr>
                <th>Sno</th>
                <th>Date</th>
                <th>Amount Given</th>
                <th>Delete</th>
            </tr>`;
        for (var i = 0; i < amount.length; i++) {
            var s = i + 1

            out = out + `<tr>
                <td>`+ s + `</td>
                <td>`+ amountdate[i] + `</td>
                <td>`+ amount[i] + `</td>
                <td><button type='button' onclick='delamount(`+ i + `)'>Delete</button>
                </tr>`;
        }
        out = out + "</table>";
        r.innerHTML = out
    }
}
function deltrips(i) {
    tripslist.splice(i, 1)
    tripsdate.splice(i, 1)
    storetrips()
}
function delamount(i) {
    amountdate.splice(i, 1)
    amount.splice(i, 1)
    storeamount()
}
function defstorage() {
    var r = document.getElementById("balanace");
    r.innerHTML = "";
    var tripsamount=tripscount*600
    var bal=tripsamount-cash;
    var out = `<table border="1px" >
            <tr>
                <th>Trips</th>
                <th>Amount for trips </th>
                <th>Amount Given</th>
                <th>Balance</th>
            </tr>
            <tr>
                <td id='t1'>`+tripscount+`</td>
                <td id='t2'>`+tripsamount+`</td>
                <td id='t3'>`+cash+`</td>
                <td id='t4'>`+bal+`</td>
            </tr>`;
    out = out + "</table>";
    r.innerHTML = out;
}
function storetrips() {
    localStorage.setItem('tripsdate', tripsdate);
    localStorage.setItem('trips', tripslist);
    displaytrips()
}
function storeamount() {
    localStorage.setItem('amountdate', amountdate);
    localStorage.setItem('amountgiven', amount);
    displayamount()
}
function storebalanace(p,q,r) {
    localStorage.setItem('Months', p);
    localStorage.setItem('Salary', q);
    localStorage.setItem('Leaves', r);
    display_year(p,q,r)
}
