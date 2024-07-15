function transalate() {
    let content = document.getElementById("input").value;
    let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=en-GB|te-IN`;
    let output = document.getElementById("output");
    fetch(transLINK)
        .then(response => response.json())
        .then(data => {
            output.value=data.responseData.translatedText
        });
    }