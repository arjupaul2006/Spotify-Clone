
//logic for hamburger button
document.getElementById("hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "0"
})

//logic of close button
document.getElementById("close").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-100%"
})

let currentSong = new Audio()

//put songs as global variable
var songs
var folder;
let next = document.getElementById("next")
let previous = document.getElementById("previous")
let play = document.getElementById("play")

async function getSongs(folder) {
    
    
    //To fetch all songs from api
    let songsApi = await fetch(`${folder}/`)
    let response = await songsApi.text()
    // console.log(response)

    //Create a div where all songs are stored
    let div = document.createElement('div')
    div.innerHTML = response
    // console.log(div)

    //Fetch all anchore tag from the songs api
    let anchor = div.getElementsByTagName('a')
    console.log(anchor)

    //Put all songs into song array
    songs = []
    for (let index = 0; index < anchor.length; index++) {
        const element = anchor[index];
        if(element.href.endsWith('.mp3')){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    console.log(songs)
    
    let ul = document.querySelector('.songList').getElementsByTagName('ul')[0]

    ul.innerHTML = ""

    for (const element of songs) {
        ul.innerHTML = ul.innerHTML + `<li class="flex"> 

                                <img class="invert" src="image/music.svg" >
                                
                                <div class="info">
                                    <div class="songName">${element.replaceAll("%20"," ").split("-")[0]}</div>
                                    <div class="artist">${element.replaceAll("%20"," ").replace(".mp3","").split("-")[1]}</div>
                                </div>

                                <div class="playNow flex item-center">
                                    <p>Play Now</p>
                                    <img class="invert" src="image/pauseButton.svg" alt="#">
                                </div>

         </li><br>`
    }

    playMusic(songs[0].replaceAll("%20"," ").split("-")[0], songs[0].replaceAll("%20"," ").replace(".mp3","").split("-")[1], false, folder)

    //add event listener to all song
    Array.from(ul.getElementsByTagName("li")).forEach(e => {
        // console.log(e)
        e.addEventListener("click",()=>{
            // console.log(e)
            document.querySelector("#seekbar").value = '0'
            document.getElementById("play").src = "image/playButton.svg"
            document.querySelector(".songTime").innerHTML = `00:00 / 00:00`
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim(),e.querySelector(".info").querySelector(".artist").innerHTML,false, folder)
        })
    })

     
}

//play the all songs
const playMusic = (track1, track2, pause, folder) =>{
    
    document.getElementById("play").src = "image/playButton.svg"
    console.log(track1 + " " + track2)
    currentSong.src = `/${folder}/` + track1 + "-" + track2 + ".mp3"
    console.log(currentSong.src)
    if(!pause){
        currentSong.play()
    }
    document.querySelector(".songInfo").innerHTML = `<marquee>${decodeURI(track1 + "-" + track2)}</marquee>`
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

//function to change the seconds to minutes:seconds
function formatTime(seconds) {

    if(isNaN(seconds)){
        return "00:00"
    }

    const totalSeconds = Math.round(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

//add event listener to previous
previous.addEventListener("click", ()=>{

    document.getElementById("play").src = "image/playButton.svg"

    console.log("Previous is clicked")

    let currentFile = currentSong.src.split("/").slice(-1)[0];
    console.log("Current file:", currentFile);

    let index = songs.findIndex(song => song === currentFile);
    console.log("Index is:", index);

    if((index - 1) == -1) {
        playMusic(songs[songs.length-1].replaceAll("%20"," ").split("-")[0], songs[songs.length-1].replaceAll("%20"," ").replace(".mp3","").split("-")[1], false, folder)
    }
    else{
        playMusic(songs[index - 1].replaceAll("%20", " ").split("-")[0], songs[index - 1].replaceAll("%20", " ").replace(".mp3", "").split("-")[1], false, folder)
    }
})
    
//add event listener to next
next.addEventListener("click", ()=>{

    document.getElementById("play").src = "image/playButton.svg"

    console.log("next is clicked")
    console.log(currentSong.src.split("/").slice(-1)[0])

    let currentFile = currentSong.src.split("/").slice(-1)[0];
    console.log("Current file:", currentFile);

    let index = songs.findIndex(song => song === currentFile);
    console.log("Index is:", index);

    if((index + 1) == songs.length) {
        playMusic(songs[0].replaceAll("%20"," ").split("-")[0], songs[0].replaceAll("%20"," ").replace(".mp3","").split("-")[1], false,folder)
    }
    else{
        playMusic(songs[index + 1].replaceAll("%20", " ").split("-")[0], songs[index + 1].replaceAll("%20", " ").replace(".mp3", "").split("-")[1], false, folder)
    }
})

// async function displayAlbum() {
//     // let albumApi = await fetch(`/songs/`)
//     // let response = await albumApi.text()
//     let albumApi = await fetch("albums.json")
//     let response = await albumApi.json()
//     // console.log(response)

//     //Create a div where all songs are stored
//     let div = document.createElement('div')
//     div.innerHTML = response
//     // console.log(div)

//     //fetch all anchor tag
//     let anchor = div.getElementsByTagName("a")
//     // console.log(anchor)
    
//     //put the singer name in the album array
//     let album = []
//     Array.from(anchor).forEach(e=>{
//         // console.log(e)
//         if(e.href.includes("/songs/")){
//             console.log(e, e.querySelector(".name").innerHTML)
//             album.push(e.querySelector(".name").innerHTML)
//         }
//     })

//     console.log(album)

//     //show all the album on browser
//     let albumClass = document.querySelector(".card-container")
//     for (const element of album) {
//         albumClass.innerHTML = albumClass.innerHTML + `<div class="card flex flex-column justify-center border-radius m-10px">

//                         <img id="card-image" src="image/${element}.png">
//                         <a class="song-name" href="">${element}</a>
                        

//                     </div>`
//     }

//     //To list the songs
//     Array.from(document.querySelectorAll(".card")).forEach(e => {
//         console.log("All card:", e);
//         e.addEventListener("click", async() => {
//             console.log("Card clicked:", e);
//             folder = "songs/" + e.querySelector(".song-name").innerHTML.replaceAll(" ","%20")
//             console.log(folder)
//             await getSongs(folder);
//         });
//     });
// }

async function displayAlbum() {
    let albumApi = await fetch("albums.json")
    let album = await albumApi.json()

    let albumClass = document.querySelector(".card-container")
    for (const element of album) {
        albumClass.innerHTML += `<div class="card flex flex-column justify-center border-radius m-10px">
            <img id="card-image" src="image/${element}.png">
            <a class="song-name" href="#">${element}</a>
        </div>`
    }

    Array.from(document.querySelectorAll(".card")).forEach(e => {
        e.addEventListener("click", async () => {
            folder = "songs/" + e.querySelector(".song-name").innerHTML.replaceAll(" ", "%20")
            await getSongs(folder)
        })
    })
}




async function main() {
    //display all album
    displayAlbum()

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "image/playButton.svg"
        }
        else{
            currentSong.pause()
            play.src = "image/pauseButton.svg"
        }
    })

    //Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        // console.log(`${formatTime(currentSong.currentTime)},${formatTime(currentSong.duration)}`)
        document.querySelector(".songTime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`

        // document.querySelector(".seekBar").getElementsByTagName("input")[0].value = (currentSong.currentTime / currentSong.duration) * 100
        document.getElementById("seekbar").value = (currentSong.currentTime / currentSong.duration) * 100
        
    })

    

    //add event listener to volume
    document.querySelector(".time-vol").getElementsByTagName("input")[0].addEventListener("input",(e)=>{
        console.log(e, e.target, e.target.value)
        console.log(document.querySelector(".time-vol").getElementsByTagName("input")[0].value)
        currentSong.volume = e.target.value / 100
        if(e.target.value === '0'){
            document.getElementById("volume").src = "image/mute.svg"
        }
        else{
            document.getElementById("volume").src = "image/volumn.svg"
        }
    })


    document.getElementById("volume").addEventListener("click",(e)=>{
        if(document.querySelector(".volume").getElementsByTagName("input")[0].value === "0"){
            document.getElementById("volume").src = "image/volumn.svg"
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 50
            currentSong.volume = 0.5
        }
        else{
            document.getElementById("volume").src = "image/mute.svg"
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0
            currentSong.volume = 0
        }
        
    })

    
    currentSong.addEventListener('ended', () => {
        console.log('Song has ended');
        play.src = "image/pauseButton.svg"
        // You can add code to play the next song automatically
    });

}

main()

//add event listener to seekBar
document.querySelector(".seekBar").getElementsByTagName("input")[0].addEventListener("input",(e)=>{
    console.log(e.target.value)
    currentSong.currentTime = currentSong.duration * (e.target.value / 100)
    // if()
        
    })
