const defaultData = {

  songs: [

    {
      title: "Perfect",
      artist: "Ed Sheeran",
      url: "https://www.youtube.com/results?search_query=Ed+Sheeran+Perfect",
      vibes: [
        "romantic",
        "warm",
        "nostalgic",
        "calm"
      ]
    },

    {
      title: "Until I Found You",
      artist: "Stephen Sanchez",
      url: "https://www.youtube.com/results?search_query=Stephen+Sanchez+Until+I+Found+You",
      vibes: [
        "romantic",
        "warm",
        "nostalgic"
      ]
    },

    {
      title: "A Thousand Years",
      artist: "Christina Perri",
      url: "https://www.youtube.com/results?search_query=Christina+Perri+A+Thousand+Years",
      vibes: [
        "romantic",
        "emotional",
        "calm"
      ]
    },

    {
      title: "Photograph",
      artist: "Ed Sheeran",
      url: "https://www.youtube.com/results?search_query=Ed+Sheeran+Photograph",
      vibes: [
        "warm",
        "nostalgic",
        "calm"
      ]
    }

  ],

  photos: []

};


const data = JSON.parse(
  localStorage.getItem("ourVibeData") ||
  JSON.stringify(defaultData)
);


const used = JSON.parse(
  localStorage.getItem("ourVibeHistory") ||
  "{}"
);


const today =
  new Date().toISOString().slice(0, 10);


if (!used[today]) {
  used[today] = [];
}


const $ = id =>
  document.getElementById(id);


let stream = null;

let current = null;



async function startCamera() {

  try {

    stream =
      await navigator.mediaDevices.getUserMedia({

        video: {
          facingMode: "user"
        },

        audio: false

      });

    $("camera").srcObject = stream;

  }

  catch (e) {

    $("cameraMsg").textContent =
      "Camera access is needed for the experience. You can still use the demo if your browser blocks it.";

  }

}



function show(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen =>
      screen.classList.remove("active")
    );

  $(id).classList.add("active");

}



function pickVibes() {

  const vibes = [

    "romantic",
    "warm",
    "nostalgic",
    "calm",
    "happy",
    "chill",
    "energetic",
    "emotional"

  ];


  const a =
    vibes[
      Math.floor(
        Math.random() * vibes.length
      )
    ];


  const b =
    vibes[
      Math.floor(
        Math.random() * vibes.length
      )
    ];


  return [
    ...new Set([a, b])
  ];

}



function chooseSong(vibes) {

  const pool =
    data.songs.filter(song =>

      song.vibes.some(v =>
        vibes.includes(v)
      )

      &&

      !used[today].includes(
        song.title
      )

    );


  const fallback =
    data.songs.filter(song =>
      !used[today].includes(
        song.title
      )
    );


  const candidates =
    pool.length
      ? pool
      : fallback;


  if (!candidates.length) {

    used[today] = [];

    return data.songs[
      Math.floor(
        Math.random() *
        data.songs.length
      )
    ];

  }


  return candidates[
    Math.floor(
      Math.random() *
      candidates.length
    )
  ];

}



function render() {

  const vibes =
    pickVibes();


  current =
    chooseSong(vibes);


  if (!current) {
    return;
  }


  used[today].push(
    current.title
  );


  localStorage.setItem(
    "ourVibeHistory",
    JSON.stringify(used)
  );


  $("vibeText").textContent =
    vibes
      .map(
        v =>
          v[0].toUpperCase() +
          v.slice(1)
      )
      .join(" · ");


  $("songTitle").textContent =
    current.title;


  $("songArtist").textContent =
    current.artist || "";


  $("songArt").style.backgroundImage =
    current.image
      ? `url("${current.image}")`
      : "";


  show("resultScreen");

}



$("continueBtn").onclick =
  render;


$("againBtn").onclick =
  render;


$("playBtn").onclick = () => {

  if (current) {

    window.open(
      current.url,
      "_blank",
      "noopener"
    );

  }

};



$("photosBtn").onclick = () => {

  $("photos").innerHTML = "";


  (data.photos || []).forEach(
    photo => {

      const d =
        document.createElement("div");

      d.className = "photo";


      d.innerHTML =
        `<img src="${photo.url}" alt="">`;


      $("photos").appendChild(d);

    }
  );


  show("photosScreen");

};



$("backBtn").onclick = () =>
  show("cameraScreen");


startCamera();
