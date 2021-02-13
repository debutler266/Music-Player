function _(query){
  return document.querySelector(query);
}

function _all(query){
  return document.querySelectorAll(query);
}

// Song List

let songList = [
  {
    thumbnail:"cover1.jpg",
    audio:"song1.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },
  {
    thumbnail:"cover2.jpg",
    audio:"song2.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover3.jpg",
    audio:"song3.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover4.jpg",
    audio:"song4.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover5.jpg",
    audio:"song5.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover6.jpg",
    audio:"song6.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover7.jpg",
    audio:"song7.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover8.jpg",
    audio:"song8.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover9.jpg",
    audio:"song9.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },

  {
    thumbnail:"cover10.jpg",
    audio:"song10.mp3",
    songtitle:"Title",
    artistname:"My Name"
  },
];

// song index count

let currentSongIndex = 0;

let player = _(".player"),
  toggleSongList = _(".player .toggle-list");

  let main = {
    audio:_(".player .main audio"),
    thumbnail:_(".player .main img"),
    seekbar:_(".player .main input"),
    songtitle:_(".player .main .details h2"),
    artistname:_(".player .main .details p"),
    prevControl:_(".player .main .control .prev-control"),
    playPauseControl:_(".player .main .control .play-pause-control"),
    nextControl:_("player .main .control .next-control")
  }

  toggleSongList.addEventListener("click", function(){
    player.classList.toggle("activeSongList");
  });

  _(".player .player-list .list").innerHTML = (songList.map(function(song){
    return `

    <div class="item">
      <div class="thumbnail">
        <img src="img/${song.thumbnail}">
      </div>
      <div class="details">
        <h2>${song.songtitle}</h2>
        <p>${song.artistname}</p>
      </div>
    </div>
    `;
  }).join(""));

  let songListItems = _all(".player .player-list .list .item");
  for(let i=0;i<songListItems.length;i++){
    songListItems[i].addEventListener("click", function(){
      currentSongIndex = songListItems[i].getAttribute("songIndex");
      loadSong(currentSongIndex);
      player.classList.remove("activeSongList");
    });
  }

  //load song after clicked
  function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src", "img/"+song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("img/${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";
  main.songtitle.innerText = song.songtitle;
  main.artistname.innerText = song.artistname;
  main.audio.setAttribute("src", "./audio/"+song.audio);
  main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
  main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
    main.seekbar.setAttribute("max",parseInt(main.audio.duration));
  })
};
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);
