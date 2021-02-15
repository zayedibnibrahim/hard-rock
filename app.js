const searchBtn = () => {
    const searchBox = document.getElementById("search-box").value;
    fetchSongInfo(searchBox);
}

const fetchSongInfo = async songName => {
    const apiBase = 'https://api.lrics.ovh/suggest/';
    const url = `${apiBase}${songName}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showSongResult(data);
    } catch (error) {
        errorMessage("Invalid Input");
    }
}
//error handler
const errorMessage = (error) => {
    const errorText = document.getElementById("error-message");
    errorText.style.display = "block";
    errorText.innerText = error;
}
const showSongResult = result => {
    // const errorText = document.getElementById("error-message");
    // errorText.style.display = "none";
    const allSong = result.data;
    const songContainer = document.getElementById("songs-container");
    songContainer.innerHTML = '';
    allSong.forEach(singleSong => {
        const songTitle = singleSong.title;
        const songArtist = singleSong.artist.name;
        const songPreview = singleSong.preview;
        const innerDiv = document.createElement("div")
        innerDiv.className = "single-result row align-items-center my-3 p-3"
        const songContent = `<div class="col-md-9">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album by <span>${songArtist}</span></p>
        <audio controls>
            <source src="${songPreview}">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="fetchLyrics('${songArtist}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
    </div>`
        innerDiv.innerHTML = songContent;
        songContainer.appendChild(innerDiv);
    });
}
const fetchLyrics = async (sArtist, sTitle) => {
    const lUrl = `https://api.lyrics.ovh/v1/${sArtist}/${sTitle}`;
    const lRes = await fetch(lUrl);
    const lData = await lRes.json();
    showLyrics(lData);
}
const showLyrics = sLyrics => {
    const lyricsContainer = document.getElementById("lyrics-container");
    const getLyrics = sLyrics.lyrics;
    lyricsContainer.innerText = getLyrics;
}