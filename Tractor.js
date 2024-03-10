var driverdata = []
var driveramount = []
var d1 = []
var d2 = []
var d3 = []
var d4 = []
var photo = "sai"
var k1 = 0;
var k2 = 0;
var k3 = 0;
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;
var k5 = 0;
var list = { "Sai": "sai", "Batchu Raju": "raju", "venkanna": "venkanna", "swamy": "swamy", "Chinnodu": "chinnodu", "Abbulu": "abbulu", "Kick": "kick", "Nagu": "nagu1", "Radhakrishna": "radha", "srinu": "srinu", "chanti": "chanti", "Govindu": "govind", "(Pun)Nagu": "nagu2", "Nani": "nani" }
window.onload = function () {
    const session = localStorage.getItem('session');
    if (session === '0') {
        window.location.href = 'TractorLogin.html'
    }
    localStorage.setItem('session', 1)
    const userData = localStorage.getItem('Driverdata');
    const useramount = localStorage.getItem('Driveramount');
    var data = userData.split(',')
    d1 = []
    i = 0
    while (i < data.length - 4) {
        record.date = data[i];
        record.drivername = data[i + 1];
        record.customername = data[i + 2];
        record.price = data[i + 3];
        record.trips = data[i + 4];
        d2.push(data[i])
        d2.push(data[i + 1])
        d2.push(data[i + 2])
        d2.push(data[i + 3])
        d2.push(data[i + 4])
        d1.push(d2)
        d2 = []
        i = i + 5
        driverdata.push(Object.assign({}, record));
    }
    console.log(d1)
    var data1 = useramount.split(',')
    d3 = []
    i = 0
    while (i < data1.length - 2) {
        amountrecord.date = data1[i];
        amountrecord.drivername = data1[i + 1];
        amountrecord.amount = data1[i + 2];
        d4.push(data1[i])
        d4.push(data1[i + 1])
        d4.push(data1[i + 2])
        d3.push(d4)
        d4 = []
        i = i + 3
        driveramount.push(Object.assign({}, amountrecord));
    }
    displaytripsdata();
    displayamountdata()
}
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'hidden') {
        window.location.href = 'TractorLogin.html';
    }
});
function trans() {
    var d = document.getElementById('trans')
    var b = document.getElementById('btn5')
    if (k5 == 0) {
        d.style.display = "block";
        b.textContent = "Close Translator"
        k5 = 1
    }
    else {
        d.style.display = "none";
        b.textContent = "Open Translator"
        k5 = 0
    }
}
function logout() {
    localStorage.setItem('session', 0)
    window.location.href = 'TractorLogin.html'
}
function setup() {
    alert("Entire Data Can Be Deleted...")
    window.localStorage.setItem('Driverdata', [])
    window.localStorage.setItem('Driveramount', [])
    localStorage.setItem('session', 0)
    window.location.href = 'TractorLogin.html'
}
function storetripsdata(d1) {

    window.localStorage.setItem("Driverdata", d1);
}
function storeamountdata(d3) {
    window.localStorage.setItem("Driveramount", d3);
}
function box1() {
    var d = document.getElementById('dname1').value;
    var d1 = document.getElementById('driver1');
    var t1 = document.getElementById('btn1')
    t1.textContent = 'Open';
    k1 = 0
    var r = document.getElementById("tripsdata");
    r.style.display = "none";
    if (d == "Others") {
        d1.style.display = "block";
    }
    else {
        d1.style.display = "none";
    }
}

function box2() {
    var d = document.getElementById('dname2').value;
    var d1 = document.getElementById('driver2');
    var t1 = document.getElementById('bt1')
    var t2 = document.getElementById('bt2')
    var t3 = document.getElementById('bt3')
    t1.textContent = "Trips";
    t2.textContent = "Amount";
    t3.textContent = "Balanace"
    k2 = 0
    p1 = 0
    p2 = 0
    p3 = 0
    var r1 = document.getElementById("drivertrips");
    var r2 = document.getElementById("driveramount");
    var r3 = document.getElementById("driverbal");
    r1.style.display = "none";
    r2.style.display = "none";
    r3.style.display = "none";
    p4 = document.getElementById(photo)
    p4.style.display = "none"
    photo = list[d]
    var p = document.getElementById(list[d])
    p.style.display = "block";
    if (d == "Others") {
        d1.style.display = "block";
    }
    else {
        d1.style.display = "none";
    }
}
function box3() {
    var d = document.getElementById('dname3').value;
    var d1 = document.getElementById('driver3');
    var t1 = document.getElementById('btn3')
    t1.textContent = 'Open';
    k3 = 0
    var r = document.getElementById("amountdata");
    r.style.display = "none";
    if (d == "Others") {
        d1.style.display = "block";
    }
    else {
        d1.style.display = "none";
    }
}

var record = {
    date: "",
    drivername: "",
    customername: "",
    price: "",
    trips: ""
};
var amountrecord = {
    date: "",
    drivername: "",
    amount: ""
};

function adddriverdata() {
    var date = document.getElementById('d1').value;
    var driver = document.getElementById('dname1').value;
    var customer = document.getElementById('cname').value;
    var price = document.getElementById('aname').value;
    var trips = document.getElementById('trips').value;

    if (date.length > 0 && trips.length > 0 && driver.length > 0 && customer.length > 0) {
        d2.push(date)
        d2.push(driver)
        d2.push(customer)
        d2.push(price)
        d2.push(trips)
        d1.push(d2)
        d2 = []
        record.date = date;
        record.drivername = driver;
        record.customername = customer;
        record.price = price;
        record.trips = trips;

        driverdata.push(Object.assign({}, record));
        storetripsdata(d1)

        record = {
            date: "",
            drivername: "",
            customername: "",
            price: "",
            trips: ""
        };
    } else {
        alert("Please fill all fields!");
    }
    displaytripsdata();

}
function deltripsdata(i) {
    driverdata.splice(i, 1)
    d1.splice(i, 1)
    displaytripsdata()
    dispalydrivertrips()
    storetripsdata(d1)
}
function delamountdata(i) {
    driveramount.splice(i, 1)
    d3.splice(i, 1)
    displayamountdata()
    storeamountdata(d3)
}
function displaytripsdata() {
    var r = document.getElementById("tripsdata");
    r.innerHTML = "";
    if (driverdata.length > 0) {
        var out = `<table border="1px" >
            <tr>
                <th>Sno</th>
                <th>Date</th>
                <th>Driver Name</th>
                <th>Customer Name</th>
                <th>Price</th>
                <th>Trips</th>
                <th>Delete</th>
            </tr>`;
        for (var i = 0; i < driverdata.length; i++) {
            var s = i + 1;
            // Use strings as keys in the driverdata objects
            out += `<tr>
                <td>` + s + `</td>
                <td>` + driverdata[i]['date'] + `</td>
                <td>` + driverdata[i]['drivername'] + `</td>
                <td>` + driverdata[i]['customername'] + `</td>
                <td>` + driverdata[i]['price'] + `</td>
                <td>` + driverdata[i]['trips'] + `</td>
                <td><button type='button' onclick='deltripsdata(` + i + `)'>Delete</button>
                </tr>`;
        }
        out += "</table>";
        r.innerHTML = out;
    }
}
function dispalydrivertrips(w) {
    var d = document.getElementById('dname2').value;
    var r = document.getElementById("drivertrips");
    r.innerHTML = "";
    if (driverdata.length > 0) {
        var out = `<table border="1px" >
            <tr>
                <th>తోలకం</th>
                <th>తేదీ</th>
                <th>వినియోగదారుని పేరు</th>
                <th>ధర</th>
                <th>ట్రిప్పులు</th>
                <th>మొత్తం ధర</th>
                <th>తొలగించు</th>
            </tr>`;
        var k = 1;
        var total = 0;
        for (var i = 0; i < driverdata.length; i++) {
            // Use strings as keys in the driverdata objects
            if (driverdata[i]['drivername'] == d) {
                var trips = parseInt(driverdata[i]['trips'])
                var amount = parseInt(driverdata[i]['price'])
                var tripamount = trips * amount
                total += tripamount;
                out += `<tr>
                <td>` + k + `</td>
                <td>` + driverdata[i]['date'] + `</td>
                <td>` + driverdata[i]['customername'] + `</td>
                <td>` + driverdata[i]['price'] + `</td>
                <td>` + driverdata[i]['trips'] + `</td>
                <td>` + tripamount + `</td>
                <td><button type='button' onclick='deltripsdata(` + i + `)'>Delete</button>
                </tr>`;
                k = k + 1;
            }
        }
        out += `<tr>
          <td colspan="5">ట్రిప్పులు మొత్తానికి అయిన డబ్బులు</td>
          <td colspan="1">`+ total + `</td>
        </tr>`
        out += "</table>";
        r.innerHTML = out;
    }
    getdrivertrips();
}
var x1 = 0
var x2 = 0
var x3 = 0
function addtrip() {
    var d = document.getElementById('list1');
    var d1 = document.getElementById('b1');
    if (x1 == 0) {
        d.style.display = "block"
        d1.textContent="Close"
        x1=1
    }
    else {
        d.style.display = "none"
        d1.textContent="Add Data"
        x1=0

    }
}
function showdriver() {
    var d = document.getElementById('list2');
    var d1 = document.getElementById('b2');
    if (x2 == 0) {
        d.style.display = "block"
        d1.textContent="Close"
        x2=1
    }
    else {
        d.style.display = "none"
        d1.textContent="Driver Data"
        x2=0

    }
}
function addamount() {
    var d = document.getElementById('list3');
    var d1 = document.getElementById('b3');
    if (x3 == 0) {
        d.style.display = "block"
        d1.textContent="Close"
        x3=1
    }
    else {
        d.style.display = "none"
        d1.textContent="Amount Data"
        x3=0
    }
}
function dispalydriveramount(w) {
    var d = document.getElementById("dname2").value;
    var r = document.getElementById("driveramount");
    r.innerHTML = "";
    var k6 = 0;
    if (driveramount.length > 0) {
        var out = `<table border="1px" >
            <tr>
                <th>తోలకం</th>
                <th>తేదీ</th>
                <th>డబ్బులు తీసుకున్నవి</th>
                <th>తొలగించు</th>
            </tr>`;
        for (var i = 0; i < driveramount.length; i++) {
            // Use strings as keys in the driverdata objects
            if (driveramount[i]['drivername'] == d) {
                k6 = k6 + 1
                out += `<tr>
                    <td>` + k6 + `</td>
                    <td>` + driveramount[i]['date'] + `</td>
                    <td>` + driveramount[i]['amount'] + `</td>
                    <td><button type='button' onclick='delamountdata(` + i + `)'>Delete</button>
                    </tr>`;
            }
        }
        out += "</table>";
        r.innerHTML = out;
    }
    getdriveramount();
}
function dispalydriverbal(w) {
    var d = document.getElementById("dname2").value;
    var tripscount = 0
    var tripsamount = 0
    var takenamount = 0
    var r = document.getElementById("driverbal");
    r.innerHTML = "";
    for (var i = 0; i < driverdata.length; i++) {
        if (driverdata[i]['drivername'] === d) {
            tripscount += parseInt(driverdata[i]['trips'])
            tripsamount += (parseInt(driverdata[i]['trips']) * parseInt(driverdata[i]['price']))
        }
    }
    for (var i = 0; i < driveramount.length; i++) {
        if (driveramount[i]['drivername'] === d) {
            takenamount += parseInt(driveramount[i]['amount'])
        }
    }
    var out = `<table border="1px" >
            <tr>
                <th>యజమాని పేరు</th>
                <th>ట్రిప్పులు</th>
                <th>మొత్తం డబ్బులు</th>
                <th>డబ్బులు ఇచ్చినవి</th>
                <th>ఇవ్వాల్సిన డబ్బులు</th>
            </tr>`;
    var bal = tripsamount - takenamount;
    out += `<tr>
                    <td>` + d + `</td>
                    <td>` + tripscount + `</td>
                    <td>` + tripsamount + `</td>
                    <td>` + takenamount + `</td>
                    <td>` + bal + `</td>
                    </tr>`;
    out += "</table>";
    r.innerHTML = out;
    getdriverbal();
}
function adddriveramountdata() {
    var date = document.getElementById('d2').value;
    var driver = document.getElementById('dname3').value;
    var amount = document.getElementById('amount').value;

    if (date.length > 0 && amount.length > 0 && driver.length > 0) {
        d4.push(date)
        d4.push(driver)
        d4.push(amount)
        d3.push(d4)
        d4 = []
        amountrecord.date = date;
        amountrecord.drivername = driver;
        amountrecord.amount = amount;

        driveramount.push(Object.assign({}, amountrecord));
        storeamountdata(d3)
        amountrecord = {
            date: "",
            drivername: "",
            amount: ""
        };
    } else {
        alert("Please fill all fields!");
    }
    displayamountdata();

}
setTimeout(function () {
    window.location.href = 'TractorLogin.html';
}, 30 * 60000);
function displayamountdata() {
    var r = document.getElementById("amountdata");
    r.innerHTML = "";
    if (driveramount.length > 0) {
        var out = `<table border="1px" >
            <tr>
                <th>Sno</th>
                <th>Date</th>
                <th>Driver Name</th>
                <th>Amount</th>
                <th>Delete</th>
            </tr>`;
        for (var i = 0; i < driveramount.length; i++) {
            var s = i + 1;
            // Use strings as keys in the driverdata objects
            out += `<tr>
                <td>` + s + `</td>
                <td>` + driveramount[i]['date'] + `</td>
                <td>` + driveramount[i]['drivername'] + `</td>
                <td>` + driveramount[i]['amount'] + `</td>
                <td><button type='button' onclick='delamountdata(` + i + `)'>Delete</button>
                </tr>`;
        }
        out += "</table>";
        r.innerHTML = out;
    }
}

function gettripsdata() {
    var t = document.getElementById('tripsdata');
    var t1 = document.getElementById('btn1')
    if (k1 == 0) {
        t.style.display = "block"
        t1.textContent = "Close"
        k1 = 1
    }
    else {
        t.style.display = "none"
        t1.textContent = "Open"
        k1 = 0
    }
}
function getdrivertrips() {
    var v1 = document.getElementById('drivertrips');
    if (p1 == 0) {
        v1.style.display = "block";
        var t1 = document.getElementById('bt1')
        t1.textContent = "Close Trips"
        p1 = 1
    }
    else {
        v1.style.display = "none";
        var t1 = document.getElementById('bt1')
        t1.textContent = "Trips"
        p1 = 0
    }
}
function getdriveramount(w) {
    var v2 = document.getElementById('driveramount');
    if (p2 == 0) {
        v2.style.display = "block";
        var t1 = document.getElementById('bt2')
        t1.textContent = "Close Amount"
        p2 = 1
    }
    else {
        v2.style.display = "none";
        var t1 = document.getElementById('bt2')
        t1.textContent = "Amount"
        p2 = 0
    }
}

function getdriverbal(w) {
    var v3 = document.getElementById('driverbal');
    if (p3 == 0) {
        v3.style.display = "block";
        var t1 = document.getElementById('bt3')
        t1.textContent = "Close Balanace"
        p3 = 1

    }
    else {
        v3.style.display = "none";
        var t1 = document.getElementById('bt3')
        t1.textContent = "Balanace"
        p3 = 0

    }
}
function getamountdata() {
    var t = document.getElementById('amountdata');
    var t1 = document.getElementById('btn3')
    if (k3 == 0) {
        t.style.display = "block"
        t1.textContent = "Close"
        k3 = 1
    }
    else {
        t.style.display = "none"
        t1.textContent = "Open"
        k3 = 0
    }
}
//entire copy rights belongs to KONE RAM LAL SUFRRESH
