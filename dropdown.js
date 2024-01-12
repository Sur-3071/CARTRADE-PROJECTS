function aftertenth() {
    var a = document.getElementById("dd1").value;
    var b = final[a];
    var c = document.getElementById("dd2");
    c.innerHTML = " "
    c.innerHTML += "<option>" + "barnch" + "</option>"
    for (var i = 0; i < b.length; i++) {
        console.log(b[i]);
        c.innerHTML += "<option>" + b[i] + "</option>"
        console.log(c);
    }
    console.log(d)

}
function aftertenth1() {
    var a = document.getElementById("dd2").value;
    var b = final[a];
    var c = document.getElementById("dd3");
    c.innerHTML = " "
    var d = document.createElement("option");
    d.innerHTML = "Carrer options"
    for (var i = 0; i < b.length; i++) {
        console.log(b[i]);
        d = document.createElement("option");
        d.innerHTML = b[i];
        c.appendChild(d);
        console.log(c);
    }
    console.log(d)

}
var final =
{
    "Intermediate":
        [
            "MPC",
            "BIPC",
            "CEC"
        ],
    "Polytechnic":
        [
            "Mediacal",
            "Civil",
            "EEE",
            "Chemical",
            "Computer",
            "Automobile"
        ],
    "ITI":
        [
            "Fitter",
            "Mechanical",
            "Electrician"
        ],
    "Para Medical":
        [
            'B.Sc. Nursing',
            'Medical Laboratory Technology',
            'Physiotherapy Course',
            'Dental Hygiene Course'
        ],
    "MPC":
    [
        "Engineering",
        "Physics and Astrophysics",
        "Chemistry and Chemical Engineering",
        "Mathematics and Statistics",
        "Astronomy and Space Sciences",
        "Architecture",
        "Biotechnology",
        "Materials Science and Engineering"
    ],
    "BIPC":
        [
            "Medicine and Surgery",
            "Pharmacy and Pharmaceutical Sciences",
            "Nursing and Allied Health Sciences",
            "Veterinary Science and Animal Husbandry",
            "Dentistry"
        ],
    "CEC":
        [
            "Executive Chef",
            "Food and Beverage Director",
            "Culinary Consultant",
            "Corporate Chef",
            "Educator or Culinary Instructor",
            "Private Chef or Personal Chef",
            "Restaurant Owner or Entrepreneur",
            "Specialty Chef"
        ],
        "Mediacal":
        [
            "Doctor",
            "Surgeon",
            "Nurse",
            "Pharmacist"
        ],
        "Civil":
        [
            "Civil Engineer",
            "Structural Engineer",
            "Urban Planner"
        ],
        "EEE":
        [
            "Electrical Engineer",
            "Electronics Engineer",
            "Power Systems Engineer"
        ],
        "Chemical":
        [
            "Chemical Engineer",
            "Process Engineer",
            "Petrochemical Engineer"
        ],
        "Computer":
        [
            "Software Developer",
            "Data Scientist",
            "Network Engineer"
        ],
        "Automobile":
        [
            "Automotive Engineer",
            "Vehicle Designer",
            "Manufacturing Engineer"
        ],
        "Fitter":
        [
            "JOB",
            "Own business"
        ],
        "Mechanical":
        [
            "JOB",
            "Own business"
        ],
        "Electrician":
        [
            "JOB",
            "Own business"
        ],
        "B.Sc. Nursing":
        [
            "JOB",
            "Own business"
        ],
        "Medical Laboratory Technology":
        [
            "JOB",
            "Own business"
        ],
        "Physiotherapy Course":
        [
            "JOB",
            "Own business"
        ],
        "Dental Hygiene Course":
        [
            "JOB",
            "Own business"
        ]

}
function print() {
    var a = document.getElementById("dd1").value;
    var b = document.getElementById("dd2").value;
    var c = document.getElementById("dd3").value;
    var d = document.getElementById("result");
    d.innerHTML = "Your Career Goal is:  " + a + "====>" + b + "===>" + c;
}