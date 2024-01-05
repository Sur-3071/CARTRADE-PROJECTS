 function fetchdata()
 {
            var input = document.getElementById("fname");
            var strText = input.value;
                try
                {
                    let result = eval(strText);
                    input.value = result;
                    
                }
                catch(err)
                {
                    var s=" Synatx Error"
                    input.value=s
                }                      
 }
 i=0
 var s1="Calculator"
 function strappend()
 {
    document.getElementById("cal1").innerHTML+=s1.charAt(i);
    i++;
    setTimeout(strappend,100);
 }
 function backslash()
 {
    var input = document.getElementById("fname");
    var newstring = input.value.slice(0,input.value.length-1);
    input.value = newstring;
 }
 strappend();
