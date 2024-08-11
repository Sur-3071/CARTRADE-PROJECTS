import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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

// Get a reference to the database service
document.getElementById("submit2").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior

    // Get the value from the input field
    var dat = document.getElementById("dat1").value.trim();
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
});

function generateTable(data) {
    let out = `<table border="1px">
        <tr>
            <th>Customer Id</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Village</th>
            <th>shift</th>
            <th>Trips</th>
            <th>Starting Time</th>
            <th>Ending Time</th>
            <th>Total Time</th>
            <th>Price</th>
        </tr>`;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.PhoneNumber}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Shift}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
        }
    }

    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
}

document.getElementById("submit1").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior

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
});

function generateTableByDate(data, startdate, enddate) {
    var collection = 0;
    let out = `<table border="1px">
        <tr>
            <th>Customer Id</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Village</th>
            <th>shift</th>
            <th>Trips</th>
            <th>Starting Time</th>
            <th>Ending Time</th>
            <th>Total Time</th>
            <th>Price</th>
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
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Date >= startdate && activity.Date <= enddate) {
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
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
            }
        }
    }
    out += `<tr>
            <td colspan="10" id="col">Total Collection Done In This Time Period</td>
            <td id="am">${collection}</td>
            </tr>`;
    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
    let led = `<table border="1px">
    <tr>
        <th>Total Work</th>
        <th>Total Days</th>
        <th>Working Days</th>
        <th>Holidays</th>
        <th>Oil</th>
        <th>Maintainance</th>
        <th>JCB EMI</th>
        <th>Salary</th>
        <th>Profit</th>

    </tr>`;
    var pro = collection - (workday * 3500) - (differenceInDays * 734) - (differenceInDays * 335)-(differenceInDays * 1800);
    led += `<tr>
    <td>${collection}</td>
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
