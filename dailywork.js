function timecal() {
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;

    // Convert the time strings to Date objects
    var startTime = new Date('1970-01-01T' + stime + 'Z');
    var endTime = new Date('1970-01-01T' + etime + 'Z');

    // If the end time is earlier in the day than the start time, add 24 hours to end time
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate the difference in milliseconds
    var diff = endTime - startTime;

    // Convert milliseconds to hours and minutes
    var diffHours = Math.floor(diff / (1000 * 60 * 60));
    var diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Format the total time as HH:MM
    var totalTime = diffHours.toString().padStart(2, '0') + ':' + diffMinutes.toString().padStart(2, '0');

    // Calculate the total minutes and price
    var tmin = diffHours * 60 + diffMinutes;
    var pri = tmin * 20;

    document.getElementById("ttime").value = totalTime;
    document.getElementById("rate").value = pri;
}
function tripprice()
{
    var c1=document.getElementById("trips").value;
    var c2=parseInt(c1)*200;
    document.getElementById("rate").value=c2;
}
function removedone() {
    setTimeout(function () {
        var v7 = document.getElementById("done");
        v7.style.display = "none";
    }, 3000);
}

function addflow()
{
    var c=document.getElementById("worktype").value;
    if(c=="Hours")
        {
            document.getElementById("loading").style.display="none";
            document.getElementById("hours").style.display="block";
        }
        else
        {
            document.getElementById("hours").style.display="none";
            document.getElementById("loading").style.display="block";
        }

}
