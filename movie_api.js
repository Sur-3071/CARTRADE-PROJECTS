const con=document.querySelector('.container');
function search()
{
    var movie_name=document.getElementById("movie_name").value;
    console.log(movie_name)
    fetchdata(movie_name)
}
async function fetchdata(movie)
{
    const req=await fetch(`https://api.tvmaze.com/search/shows?q=${movie}`)
    const res=await req.json()
    console.log(res)
    movie_images(res)
}
function movie_images(res)
{
    con.innerHTML=""
    console.log(res)
    for(let m of res)
    {
        let s=m.show.image.medium;
        const img=document.createElement('img');
        img.src=s;
        con.appendChild(img)
        // break
    }
}