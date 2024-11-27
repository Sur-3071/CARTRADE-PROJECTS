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
    const ptype = document.getElementById("type").value;
    const disel = document.getElementById("dis").value;
    document.getElementById("userForm").reset();

    function datarebuild() {
        document.getElementById("dat").value = dat;
        document.getElementById("wid").value = wid;
        document.getElementById("name").value = name;
        document.getElementById("type").value = ptype;
        document.getElementById("dis").value = disel;
    }
    function removedone() {
        setTimeout(function () {
            var v7 = document.getElementById("done");
            v7.style.display = "none";
        }, 3000);
    }

    if (dat.length > 0) {
        if (name.length > 0) {
            if (disel.length > 0) {
                const db1 = "Homeexp";
                const db2 = "Home";

                const w_id = ref(db, `${db1}/${db2}`);
                const dataRefset = ref(db, `${db1}/${wid}`);

                const work_databasecount = ref(db, `${db1}/${db2}`); // Corrected variable naming
                const work_snapshot = await get(work_databasecount);

                // Ensure `work_snapshot.val()` is not null or undefined before using it
                if (work_snapshot.exists()) {
                    var workid = parseInt(work_snapshot.val());

                    try {
                        // Ensure `wid` is defined and properly compared
                        if (workid === parseInt(wid)) {
                            await set(w_id, workid + 1); // Updated logic for clarity
                        }
                        if (ptype === "Farming") {
                            var far = disel;
                            var jcb = 0;
                            var home = 0;
                        }
                        else {
                            if (ptype === "Jcb") {
                                var far = 0;
                                var jcb = disel;
                                var home = 0;
                            }
                            else {
                                var far = 0;
                                var jcb = 0;
                                var home = disel;
                            }
                        }

                        await set(dataRefset, {
                            Date: dat,
                            Name: name,
                            Price: disel,
                            Farming: far,
                            Jcb: jcb,
                            Home: home,
                            Type: ptype,
                        });

                        document.getElementById("done").style.display = "block";
                        removedone(); // Ensure this function is defined elsewhere
                    } catch (error) {
                        console.log("Error updating Firebase data:", error);
                    }
                } else {
                    alert("Snapshot does not exist or is invalid");
                    datarebuild();
                }
            } else {
                alert("Amount is empty");
                datarebuild();
            }
        } else {
            alert("Name is empty");
            datarebuild();
        }
    } else {
        alert("Date is empty");
        datarebuild();
    }

});
