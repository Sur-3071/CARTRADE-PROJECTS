var a = document.getElementById("bookcount");
var i = 0
var f = 10000;
function count() {
    a.innerHTML =i;
    i++;
    let l = i + "px";
    a.style.left=l;
    if(i==1230)
    {
        return 0;
    }
    if (i < f) {
        if(i<300)
        {
        setTimeout(count, 1);
        }
        else 
        {
            if(i>300 && i<800)
            {
            setTimeout(count, 10);
            }
            else
            {
                setTimeout(count, 1);
            }
        }
    }
}
count();

