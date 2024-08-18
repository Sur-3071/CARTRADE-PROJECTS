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
    var dat1 = "2024-08-10";
    var dat2 = year + "-" + month + "-" + day;
    const date1 = new Date(dat1);
    const date2 = new Date(dat2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;
    // Convert the difference to days
    const differenceInDays = (differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    var collection = 0;
    var recovery = 0;
    let out = `<table border="1px">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize3">Customer Name</th>
            <th id="csize3">Phone Number</th>
            <th id="csize3">Village</th>
            <th id="csize1">shift</th>
            <th id="csize">Trips</th>
            <th id="csize2">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize2">Payment Status</th>
            <th id="csize2">Price</th>
            <th id="csize2">Recovery Amount</th>
        </tr>`;
    var l = [];
    var workday = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            collection += parseInt(activity.Price);
            var amount = activity.Payment === "Paid" ? 0 : activity.Price
            recovery += parseInt(amount);
            if (!l.includes(activity.Date)) {
                workday += 1;
                l.push(activity.Date);
            }
            out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.PhoneNumber}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Shift}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td><button type="button" class="pay" id=${customerPhone}>${activity.Payment}</button></td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>
                    </tr>`;
        }
    }
    out += `<tr>
    <td colspan="12" id="col">Total Work In Price</td>
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
    var pro = collection - (workday * 3500) - (differenceInDays * 734) - (differenceInDays * 335) - (differenceInDays * 1800);
    led += `<tr>
    <td class="lsize">${collection}</td>
    <td>${collection - recovery}</td>
    <td>${recovery}</td>
    <td>${differenceInDays}</td>
    <td>${workday}</td>
    <td>${differenceInDays - workday}</td>
    <td>${workday * 3500}</td>
    <td>${workday * 335}</td>
    <td>${differenceInDays * 1800}</td>
    <td>${differenceInDays * 734}</td>
    <td>${pro}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger").innerHTML = led;
}


function SearchTable(data) {
    // Get today's date
    var d = document.getElementById("ledger");
    var name = document.getElementById("search").value;
    if (name.length > 0) {
        d.style.display = "none";
    }
    else
    {
        d.style.display = "block";
    }
    var collection = 0;
    var recovery = 0;
    let out = `<table border="1px">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize3">Customer Name</th>
            <th id="csize3">Phone Number</th>
            <th id="csize3">Village</th>
            <th id="csize1">shift</th>
            <th id="csize">Trips</th>
            <th id="csize2">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize2">Payment Status</th>
            <th id="csize2">Price</th>
            <th id="csize2">Recovery Amount</th>
        </tr>`;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Name.indexOf(name) !== -1 || activity.Villagename.indexOf(name) !== -1) {
                collection += parseInt(activity.Price);
                var amount = activity.Payment === "Paid" ? 0 : activity.Price
                recovery += parseInt(amount);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.PhoneNumber}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Shift}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td><button type="button" class="pay" id=${customerPhone}>${activity.Payment}</button></td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>
                    </tr>`;
            }
        }
    }
    out += `<tr>
    <td colspan="12" id="col">Total Work In Price</td>
    <td id="am">${collection}</td>
    <td id="am">${recovery}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
}

document.getElementById("submit1").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
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
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            generateTableByDate(data, startdate, enddate);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }

}
function generateTableByDate(data, startdate, enddate) {
    var collection = 0;
    let out = `<table border="1px">
       <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize3">Customer Name</th>
            <th id="csize3">Phone Number</th>
            <th id="csize3">Village</th>
            <th id="csize1">shift</th>
            <th id="csize">Trips</th>
            <th id="csize2">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize2">Payment Status</th>
            <th id="csize2">Price</th>
            <th id="csize2">Recovery Amount</th>
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
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Date >= startdate && activity.Date <= enddate) {
                var amount = activity.Payment === "Paid" ? 0 : activity.Price
                recovery += parseInt(amount);
                if (!l.includes(activity.Date)) {
                    workday += 1;
                    l.push(activity.Date);
                }
                collection = collection + parseInt(activity.Price);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.PhoneNumber}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Shift}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                       <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td><button type="button" class="pays" id=${customerPhone}>${activity.Payment}</button></td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>
                    </tr>`;
            }
        }
    }
    out += `<tr>
            <td colspan="12" id="col">Total Collection Done In This Time Period</td>
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
    var pro = collection - (workday * 3500) - (differenceInDays * 734) - (differenceInDays * 335) - (differenceInDays * 1800);
    led += `<tr>
    <td>${collection}</td>
    <td>${collection - recovery}</td>
    <td>${recovery}</td>
    <td>${differenceInDays}</td>
    <td>${workday}</td>
    <td>${differenceInDays - workday}</td>
    <td>${workday * 3500}</td>
    <td>${workday * 335}</td>
    <td>${differenceInDays * 1800}</td>
    <td>${differenceInDays * 734}</td>
    <td>${pro}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger").innerHTML = led;
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
            Price: data.Price,
            Shift: data.Shift,
            Starting: data.Starting,
            TotalTime: data.TotalTime,
            Trips: data.Trips,
            Villagename: data.Villagename
        });
        RePrint();
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
