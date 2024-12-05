import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
const db = getDatabase(app);

submit.addEventListener('click', function (e) {
    e.preventDefault();
    const d = document.getElementById("d1").value;
    const drivername = document.getElementById("dname1").value;
    const customer = document.getElementById("cname").value;
    const day = document.getElementById("time").value;
    const price = document.getElementById("aname").value;
    const trips = document.getElementById("trips").value;
    const db1 = "Trips";
    const db2 = "Amount";
    if (d.length > 0 && drivername.length > 0 && customer.length > 0 && price.length > 0 && trips.length > 0) {
        // Set data to Firebase database
        const dataRefget = ref(db, `${db1}/${drivername}/`);
        const dataRefset = ref(db, `${db1}/${drivername}/${d}/${customer}/${day}`);

        set(dataRefset, {
            Price: price,
            Trips: trips
        })
            .then(() => {
                document.getElementById("form").reset();
                var d = document.getElementById("done");
                d.style.display = "block";
                removedone()
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        alert("Please Enter All The Fields Properly");
    }
});
amountdataentry.addEventListener('click', function (e) {
    e.preventDefault();
    const d = document.getElementById("d2").value;
    const drivername = document.getElementById("dname3").value;
    const pur = document.getElementById("pur").value;
    const amount = document.getElementById("amount").value;
    const db2 = "Amount";

    // Set data to Firebase database
    if (d.length > 0 && drivername.length > 0 && amount.length > 0) {
        const dataRefget = ref(db, `${db2}/${drivername}/`);
        const dataRefset = ref(db, `${db2}/${drivername}/${d}/`);

        set(dataRefset, {
            Amount: amount,
            Purpose:pur
        })
            .then(() => {
                document.getElementById("form1").reset();
                var d = document.getElementById("done");
                d.style.display = "block";
                removedone()
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        alert("Please Fill All The Fields");
    }
});
getDataBtn.addEventListener('click', function () {
    const drivername = document.getElementById("dname2").value;
    const db1 = "Trips";
    if (drivername!="select Driver Name") {
        const dataRefget = ref(db, `${db1}/${drivername}/`);

        get(dataRefget)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    displaytripsdata(data)

                } else {
                    NoDatatrips();
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error occurred while fetching data: ", error);
            });
    }
    else {
        alert("Please Select Driver Name");
    }
});
getamount.addEventListener('click', function () {
    const drivername = document.getElementById("dname2").value;
    const db1 = "Amount";
    if (drivername!="select Driver Name") {
        const dataRefget = ref(db, `${db1}/${drivername}/`);
        get(dataRefget)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    displayamountdata(data)

                } else {
                    NoDataamount();
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error occurred while fetching data: ", error);
            });
        }
        else {
            alert("Please Select Driver Name");
        }
    });
getbal.addEventListener('click', function () {
    const drivername = document.getElementById("dname2").value;
    const db1 = "Trips";
    const db2 = "Amount";
    const dataRefget = ref(db, `${db1}/${drivername}/`);
    const dataRefget1 = ref(db, `${db2}/${drivername}/`);
    if(drivername!="select Driver Name")
    {
    get(dataRefget).then((snapshot1) => {
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            displaybal1(data, drivername)
        }
        else {
            NoDatabal();
            console.log("No data available");
        }
    })
        .catch((error) => {
            console.error("Error occurred while fetching data: ", error);
        });
    get(dataRefget1).then((snapshot1) => {
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            displaybal2(data)
        }
        else {
            NoDatabal();
            console.log("No data available");
        }
    })
        .catch((error) => {
            console.error("Error occurred while fetching data: ", error);
        });
    }
    else
    {
        alert("Plesae Select Driver Name");
    }
});
