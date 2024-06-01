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

document.getElementById("submit1").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior

    // Get the value from the input field
    var  dat = document.getElementById("dat1").value.trim();

    // Validate the input (optional)
    if (dat === "") {
        console.log("Please provide a valid date.");
        return;
    }

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const db1 = "Daily Work";
        const dataRefget = ref(db2, `${db1}/${dat}`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            generateTable(data);
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);
    }
});

function generateTable(data) {
    let out = `<table border="1px">
        <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Village</th>
            <th>Trips</th>
            <th>Starting Time</th>
            <th>Ending Time</th>
            <th>Total Time</th>
            <th>Price</th>
        </tr>`;

    for (const date in data) {
        if (data.hasOwnProperty(date)) {
            const customersByDate = data[date];
            for (const customerPhone in customersByDate) {
                if (customersByDate.hasOwnProperty(customerPhone)) {
                    const activity = customersByDate[customerPhone];
                    out += `<tr>
                                <td>${date}</td>
                                <td>${activity.Name}</td>
                                <td>${activity.PhoneNumber}</td>
                                <td>${activity.Villagename}</td>
                                <td>${activity.Trips}</td>
                                <td>${activity.Starting}</td>
                                <td>${activity.Ending}</td>
                                <td>${activity.TotalTime}</td>
                                <td>${activity.Price}</td>
                            </tr>`;
                }
            }
        }
    }
    

out += `</table>`;
document.getElementById("enterdata").innerHTML = out;
}

