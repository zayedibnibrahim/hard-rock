const searchBtn = () => {
    const searchBox = document.getElementById("search-box").value;
    fetchSongInfo(searchBox);
}

const fetchSongInfo = async songName => {
    const apiBase = 'https://api.lyrics.ovh/suggest/';
    const url = `${apiBase}${songName}`;
    const res = await fetch(url);
    const data = await res.json();
    showSongResult(data);
}

const showSongResult = result => {
    const allSong = result.data;
    const songContainer = document.getElementById("songs-container");
    songContainer.innerHTML = '';
    allSong.forEach(singleSong => {
        const songTitle = singleSong.title;
        const songAlbum = singleSong.artist.name;
        const innerDiv = document.createElement("div")
        innerDiv.className = "single-result row align-items-center my-3 p-3"
        const songContent = `<div class="col-md-9">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album by <span>${songAlbum}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-success">Get Lyrics</button>
    </div>`
    innerDiv.innerHTML = songContent;
    songContainer.appendChild(innerDiv);
    });
}