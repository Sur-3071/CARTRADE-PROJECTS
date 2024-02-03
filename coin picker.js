// Sample array
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
var p = [];
var k=0;
function getRandomElement(array) {
    k++;
    const randomIndex = Math.floor(Math.random() * array.length);
    var v = array[randomIndex];
    a.splice(randomIndex, 1);
    var val1 = document.getElementById('coin');
    val1.innerHTML = v;
    var val2 = document.getElementById('result');
    if (a.length % 10 == 0) {
        val2.innerHTML += v + '===>' + `<br>`;
    }
    else {
        val2.innerHTML += v + '===>';
    }
    p.push(v)
    if (a.length == 0) {
        alert("game over")
        location.reload();
        a = b;
        p = [];
        k=0;
        val1.innerHTML = v;
        val2.innerHTML = "";
    }
    coin_done();
}
function coin_done() {
    c1 = document.getElementById("done");
    c1.innerHTML = "";
    var c = 0;
    var c2 = ""
    for (var i = 0; i < 9; i++) {
        c2 += `<div class='row'>`
        for (var j = 0; j < 10; j++) {
            if (p.includes(b[c])) {
                c2 += `<div class='col'>` + b[c] + `</div>`;
            }
            else {
                c2 += `<div class='col1'>` + b[c] + `</div>`;
            }
            c++;
        }
        c2 += `</div>`;
    }
    c1.innerHTML = c2;
    c2 = "";
}
function coin() {
    var sec=document.getElementById('speed').value
    console.log(sec)
    getRandomElement(a);
    var v = document.getElementById('auto');
    if(a.length>0 && v.checked){
        k++;
    setTimeout(coin,sec)
    }
}
function Auto() {
    var v = document.getElementById('auto');
    if (v.checked) {
        coin();
        
    }

}
coin_done()
