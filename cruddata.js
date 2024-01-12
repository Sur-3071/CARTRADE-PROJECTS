var t=[]
            var data=[]
            var p=0
            function openForm(val) {
                document.getElementById("popupForm").style.display = "block";
                p=val

              }
              function closeForm() {
                document.getElementById("popupForm").style.display = "none";
              }
              function addForm() {
                document.getElementById("add").style.display = "block";

              }
              function addcloseForm() {
                document.getElementById("add").style.display = "none";
              }
            function add()
            {
                var data1=document.getElementById("name").value;
                var data2=document.getElementById("roll").value;
                var data3=document.getElementById("dept").value;
                if(data1.length==0 || data2.length==0|| data3.length==0 )
                {
                    alert("Enter Data Properly");
                }
                else
                {
                t.push(data1)
                t.push(data2)
                t.push(data3)
                data.push(t)
                t=[]
                addcloseForm();
                display_list();
                }
            }
            function del(val)
            {
                data.splice(val,1);
                display_list()
            }

            function Edit() 
            {
                var data4=document.getElementById("ename").value;
                var data5=document.getElementById("eroll").value;
                var data6=document.getElementById("edept").value;
                if(data4.length==0 || data5.length==0|| data6.length==0 )
                {
                    alert("Enter Data Properly");
                }
                else
                {
                data[p]=[data4,data5,data6];
                closeForm();
                display_list();
                }
            }
        function display_list()
        {
        var r = document.getElementById("dis");
        r.innerHTML = "";
        var out = `<table border="1px" >
            <tr>
                <td>Name</td>
                <td>Roll</td>
                <td>Department</td>
                <td>Remove</td>
                <td>Edit</td>
            </tr>`;
        for(var i=0;i<data.length;i++){
            out = out + `<tr>
                <td>`+data[i][0]+`</td>
                <td>`+data[i][1]+`</td>
                <td>`+data[i][2]+`</td>
                <td><input type="button" value="Delete" onclick="del(`+i+`)" ></td>
                <td><input type="button" value="Edit" onclick="openForm(`+i+`)" ></td>
                </tr>`;
        }
        out = out + "</table>";
        r.innerHTML = out;
    }
    display_list();
