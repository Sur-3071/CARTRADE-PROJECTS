var t = []
var t1=[]
var city=[]
var data = []
var p = 0
var p1 = 0
var r1=document.getElementById("ccm1");
var r2=document.getElementById("ccm");
function openstateForm() {
    document.getElementById("add").style.display = "block";

}
function closestateForm() {
    document.getElementById("add").style.display = "none";
}
function stateeditForm(val) {
    console.log("hi coming");
    document.getElementById("popupForm").style.display = "block";
    p = val

}
function closeeditForm() {
    document.getElementById("popupForm").style.display = "none";
}

function opencityForm() {
    document.getElementById("city").style.display = "block";
    r1.innerHTML=" "
    r1.innerHTML+="<option>"+"States"+"</option>"
    for(var i=0;i<data.length;i++)
    {
        r1.innerHTML+="<option>"+data[i][0]+"</option>"
    }

}
function closecityForm() {
    document.getElementById("city").style.display = "none";
}
function cityeditForm(val) {
    document.getElementById("citypopupForm").style.display = "block";
    r2.innerHTML=" "
    r2.innerHTML+="<option>"+"States"+"</option>"
    for(var i=0;i<data.length;i++)
    {
        r2.innerHTML+="<option>"+data[i][0]+"</option>"
    }
    p1 = val

}
function closecityeditForm() {
    document.getElementById("citypopupForm").style.display = "none";
}

function addstate() {
    var data1 = document.getElementById("state").value;
    var data2 = document.getElementById("cityname").value;
    var data3 = document.getElementById("popu").value;
    var data4 = document.getElementById("cm").value;
    if (data1.length == 0 || data2.length == 0 || data3.length == 0 || data4.length == 0) {
        alert("Enter Data Properly");
    }
    else {
        t.push(data1)
        t.push(data2)
        t.push(data3)
        t.push(data4)
        data.push(t)
        t = []
        closestateForm();
        displaystatelist();
    }
}
function addcity() {
    var data1 = document.getElementById("cityname1").value;
    var data2 = document.getElementById("mla").value;
    var data3 = document.getElementById("popu1").value;
    var data4 = document.getElementById("ccm1").value;
    if (data1.length == 0 || data2.length == 0 || data3.length == 0 || data4.length == 0) {
        alert("Enter Data Properly");
    }
    else {
        t1.push(data1)
        t1.push(data2)
        t1.push(data3)
        t1.push(data4)
        city.push(t1)
        t1 = []
        closecityForm();
        displaycitylist();
    }
}
function del(val) {
    data.splice(val, 1);
    displaystatelist()
}
function delcity(val) {
    city.splice(val, 1);
    displaycitylist()
}

function stateedit() {
    var data4 = document.getElementById("ename").value;
    var data5 = document.getElementById("eroll").value;
    var data6 = document.getElementById("edept").value;
    var data7 = document.getElementById("ecm").value;
    if (data4.length == 0 || data5.length == 0 || data6.length == 0|| data7.length == 0) {
        alert("Enter Data Properly");
    }
    else 
    {
        data[p] = [data4, data5, data6,data7];
        closeeditForm();
        displaystatelist();
    }
}

function cityedit() {
    var data4 = document.getElementById("cname").value;
    var data5 = document.getElementById("croll").value;
    var data6 = document.getElementById("cdept").value;
    var data7 = document.getElementById("ccm").value;
    if (data4.length == 0 || data5.length == 0 || data6.length == 0|| data7.length == 0) {
        alert("Enter Data Properly");
    }
    else 
    {
        city[p1] = [data4, data5, data6,data7];
        closecityeditForm();
        displaycitylist();
    }
}
function displaystatelist() {
    var r = document.getElementById("dis");
    r.innerHTML = "";
    var out = `<table align="left" border="1px">
            <tr id="tablerow">
                <td>State Name</td>
                <td>Capital Name</td>
                <td>Population</td>
                <td>CM Name</td>
                <td>Remove</td>
                <td>Edit</td>
            </tr>`;
    for (var i = 0; i < data.length; i++) {
        out = out + `<tr>
                <td>`+ data[i][0] + `</td>
                <td>`+ data[i][1] + `</td>
                <td>`+ data[i][2] + `</td>
                <td>`+ data[i][3] + `</td>
                <td><input type="button" value="Delete" onclick="del(`+ i + `)" ></td>
                <td><input type="button" value="Edit" onclick="stateeditForm(`+ i + `)" ></td>
                </tr>`;
    }
    out = out + "</table>";
    r.innerHTML = out;
}
displaystatelist();
function displaycitylist() {
    var r = document.getElementById("citydata");
    r.innerHTML = "";
    var out = `<table align="left" border="1px" >
            <tr id="tablerow">
                <td>City Name</td>
                <td>MLA Name</td>
                <td>Population</td>
                <td>State Name</td>
                <td>Remove</td>
                <td>Edit</td>
            </tr>`;
    for (var i = 0; i < city.length; i++) {
        out = out + `<tr>
                <td>`+ city[i][0] + `</td>
                <td>`+ city[i][1] + `</td>
                <td>`+ city[i][2] + `</td>
                <td>`+ city[i][3] + `</td>
                <td><input type="button" value="Delete" onclick="delcity(`+ i + `)" ></td>
                <td><input type="button" value="Edit" onclick="cityeditForm(`+ i + `)" ></td>
                </tr>`;
    }
    out = out + "</table>";
    r.innerHTML = out;
}
displaycitylist();