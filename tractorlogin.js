window.onload=function()
{
    var t1=document.getElementById('digit1');
    t1.focus();
    
}
function text1()
{
    var t1=document.getElementById('digit2');
    t1.focus();
}
function text2()
{
    var t1=document.getElementById('digit3');
    t1.focus();
}
function text3()
{
    var t1=document.getElementById('digit4');
    t1.focus();
}
function verify()
{
    var s=""
    var t1=document.getElementById('digit1').value;
    var t2=document.getElementById('digit2').value;
    var t3=document.getElementById('digit3').value;
    var t4=document.getElementById('digit4').value;
    s+=t1
    s+=t2
    s+=t3
    s+=t4
    if(s==='3071')
    {
        localStorage.setItem('session',1);
        window.location.href = 'dummy tractor.html';
    }
    else
    {
        alert("Invalid OTP...")
    }

}
