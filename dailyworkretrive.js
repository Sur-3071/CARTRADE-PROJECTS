import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "tractor-driver-data.firebaseapp.com",
    projectId: "tractor-driver-data",
    storageBucket: "tractor-driver-data.appspot.com",
    messagingSenderId: "688935767962",
    appId: "1:688935767962:web:d3d8d7569fd2470dfef423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Get a reference to the database service
document.getElementById("submit2").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    var d1 = document.getElementById("search");
    var n = document.getElementById("search");
    n.value = "";
    d1.style.display = "block";
    RePrint();
    // Get the value from the input field

});

async function RePrint() {
    // var dat = document.getElementById("dat1").value.trim();
    // Validate the input (optional)

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Daily Work`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            generateTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}
document.getElementById("search").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    RePrintSearch();

});

async function RePrintSearch() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Daily Work`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            SearchTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}
function generateTable(data) {
    // Get today's date
    const today = new Date();

    // Extract year, month, and day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month
    const day = String(today.getDate()).padStart(2, '0'); // Ensures 2-digit day

    // Print today's date in YYYY-MM-DD format
    var collection = 0;
    var recovery = 0;
    let out = `<table border="1px">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize">Disel</th>
            <th id="csize">Trips</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">Payment Status</th>
            <th id="csize">Edit Data</th>
            <th id="csize">Price</th>
            <th id="csize">Recovery Amount</th>
        </tr>`;
    var l = [];
    var workday = 0;
    var totaltime = 0;
    var hou = 0;
    var mint = 0;
    var totaltrips = 0;
    var totalcontarct = 0;
    var disel = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            disel += parseInt(activity.Disel)
            var editid = customerPhone + "v";
            collection += parseInt(activity.Price);
            var amount = activity.Payment === "Paid" ? 0 : activity.Price
            recovery += parseInt(amount);
            if (activity.Trips !== "--") {
                totaltrips += parseInt(activity.Trips);
            }
            if (activity.Contract !== "--") {
                totalcontarct += parseInt(activity.Contract);
            }
            if (activity.Starting !== "--") {
                var timesplit = activity.TotalTime;
                var v = timesplit.split(':');
                hou += parseInt(v[0]);
                mint += parseInt(v[1]);
            }
            if (!l.includes(activity.Date)) {
                workday += 1;
                l.push(activity.Date);
            }
            // if(customerPhone==="206")
            // {
            //     alert(activity.Drivers);
            // }

            out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Disel}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td><button type="button" class="pay" id=${customerPhone}>${activity.Payment}</button></td>
                        <td><button type="button" id=${editid} class="edit">Edit</button></td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>
                    </tr>`;
        }
    }
    var mintohou = parseInt(mint / 60);
    mint = mint - 60 * mintohou;
    hou += mintohou;
    totaltime = hou + ":" + mint;
    out += `<tr>
    <td colspan="4" id="col">Total Work Analaysis</td>
    <td id="am">${disel}</td>
    <td colspan="1" id="am">${totaltrips}</td>
    <td id="am">${totalcontarct}</td>
    <td id="am" colspan="3">${totaltime}</td>
    <td id="am" colspan="2">Work In Price</td>
    <td id="am">${collection}</td>
    <td id="am">${recovery}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
    const sortedDates = l.sort((a, b) => new Date(a) - new Date(b));
    var dat1 = sortedDates[0];
    var dat2 = year + "-" + month + "-" + day;
    const date1 = new Date(dat1);
    const date2 = new Date(dat2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;
    // Convert the difference to days
    const differenceInDays = (differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    let led = `<table border="1px">
     <tr>
        <th id="bal1">Total Work</th>
        <th id="bal1">Collected Money</th>
        <th id="bal1">Recovery Money</th>
        <th id="bal1">Total Days</th>
        <th id="bal1">Working Days</th>
        <th id="bal1">Holidays</th>
        <th id="bal1">Oil</th>
        <th id="bal1">Maintainance</th>
        <th id="bal1">JCB EMI</th>
        <th id="bal1">Salary</th>
        <th id="bal1">Profit</th>

    </tr>`;
    var pro = collection - (disel) - (differenceInDays * 734) - (workday * 335) - (differenceInDays * 1800);
    led += `<tr>
    <td class="lsize">${collection}</td>
    <td>${collection - recovery}</td>
    <td>${recovery}</td>
    <td>${differenceInDays}</td>
    <td>${workday}</td>
    <td>${differenceInDays - workday}</td>
    <td>${disel}</td>
    <td>${workday * 335}</td>
    <td>${differenceInDays * 1800}</td>
    <td>${differenceInDays * 734}</td>
    <td>${pro}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger").innerHTML = led;
}

document.addEventListener("click", async function (e1) {
    if (e1.target && e1.target.className === "edit") {
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btnId = e1.target.id;
        let id = btnId.replaceAll('v', '');

        // Get the button element using the ID
        var btn = document.getElementById(btnId);

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Daily Work/${id}`);
        const snapshot = await get(dataRefget);
        var data;
        if (snapshot.exists()) {
            data = snapshot.val();
        }
        let payment = data.Payment;
        var Contract = data.Contract;
        var Date = data.Date;
        var Ending = data.Ending;
        var Name = data.Name;
        var PhoneNumber = data.PhoneNumber;
        var Disel = data.Disel;
        var Price = data.Price;
        var Shift = data.Shift;
        var output = data.Drivers;
        var Starting = data.Starting;
        var TotalTime = data.TotalTime;
        var Trips = data.Trips;
        var Villagename = data.Villagename
        if (Trips === "--" && Contract === "--") {
            var worktype = "Hours";
        }
        else {
            if (Trips === "--" && Starting === "--") {
                var worktype = "Contract";
            }
            else {
                if (Starting === "--" && Contract === "--") {
                    var worktype = "Loading";
                }
            }
        }
        // alert(worktype);
        // var worktype="Contarct";
        document.getElementById("dat").value = Date;
        document.getElementById("wid").value = id;
        document.getElementById("name").value = Name;
        document.getElementById("vil").value = Villagename;
        document.getElementById("pno").value = PhoneNumber;
        document.getElementById("dis").value = Disel;
        document.getElementById("con").value = Contract;
        document.getElementById("stime").value = Starting
        document.getElementById("etime").value = Ending;
        document.getElementById("ttime").value = TotalTime;
        document.getElementById("rate").value = Price;
        document.getElementById("shift").value = Shift;
        document.getElementById("trips").value = Trips;
        document.getElementById("output").value = output;
        document.getElementById("worktype").value = worktype;
        document.getElementById("pay").value = payment;
        if (worktype == "Hours") {
            document.getElementById("loading").style.display = "none";
            document.getElementById("contract").style.display = "none";
            document.getElementById("hours").style.display = "block";
        }
        else {
            if (worktype == "Loading") {
                document.getElementById("hours").style.display = "none";
                document.getElementById("loading").style.display = "block";
                document.getElementById("contract").style.display = "none";
            }
            else {
                document.getElementById("hours").style.display = "none";
                document.getElementById("loading").style.display = "none";
                document.getElementById("contract").style.display = "block";
            }
        }
        // RePrintSearch();
        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            RePrintSearch();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                RePrintSearch();
            }
        }
    }
})

function SearchTable(data) {
    // Get today's date
    var d = document.getElementById("ledger");
    var name = document.getElementById("search").value;
    console.log(name.length);
    if (name.length > 0) {
        d.style.display = "none";
        var collection = 0;
        var recovery = 0;
        var totaltime = 0;
        var hou = 0;
        var mint = 0;
        var totaltrips = 0;
        var totalcontarct = 0;
        let out = `<table border="1px">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize">Customer Name</th>
            <th id="csize">Village</th>
            <th id="csize1">Disel</th>
            <th id="csize">Trips</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">Payment Status</th>
            <th id="csize">Edit Data</th>
            <th id="csize">Price</th>
            <th id="csize">Recovery Amount</th>
        </tr>`;
        var disel = 0;
        for (const customerPhone in data) {
            if (data.hasOwnProperty(customerPhone)) {
                const activity = data[customerPhone];
                if (activity.Name.indexOf(name) !== -1 || activity.Villagename.indexOf(name) !== -1 || activity.Payment === name) {
                    disel += parseInt(activity.Disel);
                    var editid = customerPhone + "v";
                    collection += parseInt(activity.Price);
                    if (activity.Trips !== "--") {
                        totaltrips += parseInt(activity.Trips);
                    }
                    if (activity.Contract !== "--") {
                        totalcontarct += parseInt(activity.Contract);
                    }
                    if (activity.Starting !== "--") {
                        var timesplit = activity.TotalTime;
                        var v = timesplit.split(':');
                        hou += parseInt(v[0]);
                        mint += parseInt(v[1]);
                    }
                    var amount = activity.Payment === "Paid" ? 0 : activity.Price
                    recovery += parseInt(amount);
                    out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Disel}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td><button type="button" class="pay" id=${customerPhone}>${activity.Payment}</button></td>
                        <td><button type="button" id=${editid} class="edit">Edit</button></td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>
                    </tr>`;
                }
            }
        }
        var mintohou = parseInt(mint / 60);
        mint = mint - 60 * mintohou;
        hou += mintohou;
        totaltime = hou + ":" + mint;

        out += `<tr>
   <td colspan="4" id="col">Total Work Analaysis</td>
   <td id="am">${disel}</td>
    <td id="am">${totaltrips}</td>
    <td id="am">${totalcontarct}</td>
    <td id="am" colspan="3">${totaltime}</td>
    <td id="am" colspan="2">Work In Price</td>
    <td id="am">${collection}</td>
    <td id="am">${recovery}</td>
    </tr>`;
        out += `</table>`;
        document.getElementById("enterdata").innerHTML = out;
    }
    else {
        d.style.display = "block";
        RePrint();
    }
}

document.getElementById("submit1").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    document.getElementById("search").value = "";
    RePrint1();
});
async function RePrint1() {
    // Get the value from the input field
    var startdate = document.getElementById("dat1").value.trim();
    var enddate = document.getElementById("dat2").value.trim();
    // Validate the input (optional)
    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Daily Work`);
        const dataRefget1 = ref(db2, `Homeexp`);
        const snapshot = await get(dataRefget);
        const snapshot1 = await get(dataRefget1);


        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            const data1 = snapshot1.val();
            generateTableByDate(data, startdate, enddate, data1);

        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }

}
function generateTableByDate(data, startdate, enddate, data1) {
    var collection = 0;
    let out = `<table border="1px">
       <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize1">Disel</th>
            <th id="csize">Trips</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">Price</th>
            <th id="csize">Recovery</th>
        </tr>`;

    // Define two dates
    const date1 = new Date(startdate);
    const date2 = new Date(enddate);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;

    // Convert the difference to days
    const differenceInDays = (differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    var l = [];
    var workday = 0;
    var recovery = 0;
    var totaltime = 0;
    var hou = 0;
    var mint = 0;
    var totaltrips = 0;
    var totalcontarct = 0;
    var disel = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Date >= startdate && activity.Date <= enddate) {
                var amount = activity.Payment === "Paid" ? 0 : activity.Price
                var editid = customerPhone + "v";
                disel += parseInt(activity.Disel);
                recovery += parseInt(amount);
                if (!l.includes(activity.Date)) {
                    workday += 1;
                    l.push(activity.Date);
                }
                if (activity.Trips !== "--") {
                    totaltrips += parseInt(activity.Trips);
                }
                if (activity.Contract !== "--") {
                    totalcontarct += parseInt(activity.Contract);
                }
                if (activity.Starting !== "--") {
                    var timesplit = activity.TotalTime;
                    var v = timesplit.split(':');
                    hou += parseInt(v[0]);
                    mint += parseInt(v[1]);
                }
                collection = collection + parseInt(activity.Price);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Disel}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>

                    </tr>`;
            }
        }
    }
    var mintohou = parseInt(mint / 60);
    mint = mint - 60 * mintohou;
    hou += mintohou;
    totaltime = hou + ":" + mint;
    out += `<tr>
           <td colspan="4" id="col">Total Work Analaysis</td>
            <td id="am">${disel}</td>
            <td id="am">${totaltrips}</td>
            <td id="am">${totalcontarct}</td>
            <td id="am" colspan="3">${totaltime}</td>
            <td id="am">${collection}</td>
            <td id="am">${recovery}</td>
            </tr>`;
    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
    let led = `<table border="1px">
    <tr>
        <th id="bal1">Total Work</th>
        <th id="bal1">Collected Money</th>
        <th id="bal1">Recovery Money</th>
        <th id="bal1">Total Days</th>
        <th id="bal1">Working Days</th>
        <th id="bal1">Holidays</th>
        <th id="bal1">Oil</th>
        <th id="bal1">Maintainance</th>
        <th id="bal1">JCB EMI</th>
        <th id="bal1">Salary</th>
        <th id="bal1">Profit</th>

    </tr>`;
    var pro = collection - (disel) - (differenceInDays * 734) - (workday * 335) - (differenceInDays * 1800);
    led += `<tr>
    <td>${collection}</td>
    <td>${collection - recovery}</td>
    <td>${recovery}</td>
    <td>${differenceInDays}</td>
    <td>${workday}</td>
    <td>${differenceInDays - workday}</td>
    <td>${disel}</td>
    <td>${workday * 335}</td>
    <td>${differenceInDays * 1800}</td>
    <td>${differenceInDays * 734}</td>
    <td>${pro}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger").innerHTML = led;
    generateHomeTablebydate(data1, startdate, enddate);
}
document.addEventListener("click", async function (e1) {
    if (e1.target && e1.target.className === "pay") {
        e1.preventDefault();
        var id = e1.target.id;
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Daily Work/${id}`);
        const snapshot = await get(dataRefget);
        var data;
        if (snapshot.exists()) {
            data = snapshot.val();
        }
        let payment = data.Payment;
        if (payment === "UnPaid") {
            payment = "Paid";
        }
        else {
            payment = "UnPaid";
        }
        document.getElementById(id).textContent = payment;
        const db1 = "Daily Work";
        const paymentstatus = ref(db, `${db1}/${id}`);
        await set(paymentstatus, {
            Contract: data.Contract,
            Payment: payment,
            Date: data.Date,
            Ending: data.Ending,
            Name: data.Name,
            PhoneNumber: data.PhoneNumber,
            Disel: data.Disel,
            Price: data.Price,
            Shift: data.Shift,
            Starting: data.Starting,
            TotalTime: data.TotalTime,
            Trips: data.Trips,
            Villagename: data.Villagename
        });
        RePrintSearch();
    }
    else {
        if (e1.target && e1.target.className === "pays") {
            e1.preventDefault();
            var id = e1.target.id;
            const db2 = getDatabase(app);
            const dataRefget = ref(db2, `Daily Work/${id}`);
            const snapshot = await get(dataRefget);
            var data;
            if (snapshot.exists()) {
                data = snapshot.val();
            }
            let payment = data.Payment;
            if (payment === "UnPaid") {
                payment = "Paid";
            }
            else {
                payment = "UnPaid";
            }
            document.getElementById(id).textContent = payment;
            const db1 = "Daily Work";
            const paymentstatus = ref(db, `${db1}/${id}`);
            await set(paymentstatus, {
                Contract: data.Contract,
                Payment: payment,
                Date: data.Date,
                Ending: data.Ending,
                Name: data.Name,
                PhoneNumber: data.PhoneNumber,
                Disel: data.Disel,
                Price: data.Price,
                Shift: data.Shift,
                Starting: data.Starting,
                TotalTime: data.TotalTime,
                Trips: data.Trips,
                Villagename: data.Villagename
            });
            RePrint1();
        }
    }
});

document.getElementById("submit3").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    var d1 = document.getElementById("typech");
    var n = document.getElementById("typech");
    n.value = "";
    d1.style.display = "block";
    RePrintHome();
    // Get the value from the input field

});
document.getElementById("typech").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    RePrintHome();
    // Get the value from the input field

});

async function RePrintHome() {
    // alert("hi");
    // var dat = document.getElementById("dat1").value.trim();
    // Validate the input (optional)

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Homeexp`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            var v1 = document.getElementById("typech").value;
            if (v1.length > 0) {
                generateHomeTableSearch(data, v1)
            }
            else {
                generateHomeTable(data);
            }
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}
function generateHomeTablebydate(data, startdate, enddate) {

    console.log(data);

    let out1 = `<table border="1px">
        <tr>
            <th id="csize">Purpose Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Purpose Type</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Home Expenses</th>
            <th id="csize1">Farming</th>
            <th id="csize1">Jcb</th>
            <th id="csize1">Amount
            </th>
        </tr>`;
    var amt = 0;
    var f1 = 0;
    var j1 = 0;
    var h1 = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (customerPhone !== "Home") {
                if (activity.Date >= startdate && activity.Date <= enddate) {

                    if (activity.Type === "Farming") {
                        f1 += parseInt(activity.Price);
                    }
                    else {
                        if (activity.Type === "Jcb") {
                            j1 += parseInt(activity.Price);
                        }
                        else {
                            h1 += parseInt(activity.Price);
                        }
                    }
                    amt += parseInt(activity.Price);
                    out1 += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Type}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Home}</td>
                        <td>${activity.Farming}</td>
                        <td>${activity.Jcb}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
                }
            }
        }
    }
    out1 += `<tr>
    <td colspan="4" id="col">Total Expenses</td>
    <td id="am">${h1}</td>
    <td id="am">${f1}</td>
    <td id="am">${j1}</td>
    <td id="am">${amt}</td>
    </tr>`;
    out1 += `</table>`;
    document.getElementById("homeexp").innerHTML = out1;
}

function generateHomeTableSearch(data, v1) {
    let out = `<table border="1px">
        <tr>
            <th id="csize">Purpose Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Purpose Type</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Home Expenses</th>
            <th id="csize1">Farming</th>
            <th id="csize1">Jcb</th>
            <th id="csize1">Amount</th>
        </tr>`;
    var amt = 0;
    var f1 = 0;
    var j1 = 0;
    var h1 = 0;
    var c = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (customerPhone !== "Home") {
                if (activity.Type === v1) {
                    c += parseInt(activity.Price);
                    amt += parseInt(activity.Price);
                    out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Type}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Home}</td>
                        <td>${activity.Farming}</td>
                        <td>${activity.Jcb}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
                }
            }
        }
    }
    if(v1==="Farming")
    {
        j1=0;
        h1=0;
        f1=c;
    }
    else
    {
        if(v1==="Jcb")
        {
            h1=0;
            f1=0;
            j1=c;
        }
        else
        {
            f1=0;
            j1=0;
            h1=c;
        }
    }
    out += `<tr>
    <td colspan="4" id="col">Total Expenses</td>
    <td id="am">${h1}</td>
    <td id="am">${f1}</td>
    <td id="am">${j1}</td>
    <td id="am">${amt}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("homeexp").innerHTML = out;
}


function generateHomeTable(data) {
    let out = `<table border="1px">
        <tr>
            <th id="csize">Purpose Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Purpose Type</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Home Expenses</th>
            <th id="csize1">Farming</th>
            <th id="csize1">Jcb</th>
            <th id="csize1">Amount</th>
        </tr>`;
    var amt = 0;
    var f1 = 0;
    var j1 = 0;
    var h1 = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (customerPhone !== "Home") {
                if (activity.Type === "Farming") {
                    f1 += parseInt(activity.Price);
                }
                else {
                    if (activity.Type === "Jcb") {
                        j1 += parseInt(activity.Price);
                    }
                    else {
                        h1 += parseInt(activity.Price);
                    }
                }
                amt += parseInt(activity.Price);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Type}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Home}</td>
                        <td>${activity.Farming}</td>
                        <td>${activity.Jcb}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
            }
        }
    }
    out += `<tr>
    <td colspan="4" id="col">Total Expenses</td>
    <td id="am">${h1}</td>
    <td id="am">${f1}</td>
    <td id="am">${j1}</td>
    <td id="am">${amt}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("homeexp").innerHTML = out;
}
