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

document.getElementById('submit').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("dat").value;
    const wid = document.getElementById("wid").value;
    const name = document.getElementById("name").value;
    const villname = document.getElementById("vil").value;
    const pno = document.getElementById("pno").value;
    const disel = document.getElementById("dis").value;
    var con = document.getElementById("con").value;
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;
    var ttime = document.getElementById("ttime").value;
    const rate = document.getElementById("rate").value;
    const shift = document.getElementById("shift").value;
    const worktype = document.getElementById("worktype").value;
    var trips = document.getElementById("trips").value;

    document.getElementById("userForm").reset();
    if (trips.length > 0) {
        stime = "--";
        etime = "--";
        ttime = "--";
        con = "--";

    }
    else {
        if (con.length > 0) {
            trips = "--";
            stime = "--";
            etime = "--";
            ttime = "--";
        }
        else {
            trips = "--";
            con = "--";
        }
    }
    if (dat.length > 0) {
        if (name.length > 0) {
            if (villname.length > 0) {
                if (disel.length > 0) {
                    if (shift !== "select Shift Type") {
                        if ((worktype === "Loading" && isAllDigits(trips)) ||(worktype === "Contract" && isAllDigits(con))) {
                                const db1 = "Sethu";
                                const db2 = "Work_Count";
                                const db3 = "Sethu_Id";
                                const db4 = "Work_Id";
                                const db5 = "Daily Work";
                                const w_id = ref(db, `${db2}`);
                                const dataRefset = ref(db, `${db5}/${wid}`);
                                var sethu_databasecount = ref(db, `${db2}/${db3}`);
                                const sethu_snapshot = await get(sethu_databasecount);
                                var sethuid = parseInt(sethu_snapshot.val());
                                var work_databasecount = ref(db, `${db2}/${db4}`);
                                const work_snapshot = await get(work_databasecount);
                                var workid = parseInt(work_snapshot.val());
                                try {
                                    if (workid == wid) {
                                        await set(w_id, {
                                            Sethu_Id: parseInt(sethuid),
                                            Work_Id: parseInt(workid) + 1
                                        });
                                    }
                                    var pay = "UnPaid";
                                    await set(dataRefset, {
                                        Date: dat,
                                        Name: name,
                                        Villagename: villname,
                                        PhoneNumber: pno,
                                        Shift: shift,
                                        Contract: con,
                                        Payment: pay,
                                        Disel: disel,
                                        Trips: trips,
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
                        }
                        else {
                            alert("Please Enter Trips or Amount in digits Only Not Include Alphabets");
                            datarebuild();
                        }
                    }
                    else {
                        alert("Please Select Shift Type");
                        datarebuild();
                    }
                }
                else {
                    alert("Please Enter Disel Amount");
                    datarebuild();
                }
            }
            else {
                alert("Please Enter Village Name");
                datarebuild();
            }
        }
        else {
            alert("Please Enter Customer Name Or place Or Location Name");
            datarebuild();
        }
    }
    else {
        alert("Please Choose Date");
        datarebuild();
    }
    function isAllDigits(str) {
        return /^\d+$/.test(str);
    }
    function datarebuild() {
        document.getElementById("dat").value = dat;
        document.getElementById("wid").value = wid;
        document.getElementById("name").value = name;
        document.getElementById("vil").value = villname;
        document.getElementById("worktype").value = worktype;
        document.getElementById("pno").value = pno;
        document.getElementById("dis").value = disel;
        document.getElementById("con").value = con;
        document.getElementById("stime").value = stime;
        document.getElementById("etime").value = etime;
        document.getElementById("ttime").value = ttime;
        document.getElementById("rate").value = rate;
        document.getElementById("shift").value = shift;
        document.getElementById("trips").value = trips;
    }
});
