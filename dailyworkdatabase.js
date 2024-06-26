import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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

document.getElementById('submit').addEventListener('click', async function (e) {
    e.preventDefault();

    const dat = document.getElementById("dat").value;
    const wid = document.getElementById("wid").value;
    const name = document.getElementById("name").value;
    const villname = document.getElementById("vil").value;
    const pno = document.getElementById("pno").value;
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;
    var ttime = document.getElementById("ttime").value;
    const rate = document.getElementById("rate").value;
    const shift = document.getElementById("shift").value;
    var trips = document.getElementById("trips").value;
    document.getElementById("userForm").reset();
    if(trips.length>0)
        {
            stime="--";
            etime="--";
            ttime="--";
        }
        else
        {
            trips="--";
        }

    const db1 = "Daily Work";
    const db2 = "Work_Count";
    const w_id=ref(db,`${db2}`);
    const dataRefset = ref(db, `${db1}/${dat}/${wid}/${shift}`);

    try { 
        await set(w_id,{
            Work_Id:parseInt(wid)+1
        });
        await set(dataRefset, {
            Name: name,
            Villagename: villname,
            PhoneNumber:pno,
            Trips:trips,
            Starting: stime,
            Ending: etime,
            TotalTime: ttime,
            Price: rate
        });
        document.getElementById("done").style.display = "block";
        removedone();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("An error occurred. Please try again.");
    }
});