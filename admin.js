const key = "ourVibeData";

const historyKey =
  "ourVibeHistory";


const data =
  JSON.parse(
    localStorage.getItem(key) ||

    JSON.stringify({
      songs: [],
      photos: []
    })

  );



function save() {

  localStorage.setItem(
    key,
    JSON.stringify(data)
  );

  render();

}



function addSong() {

  const title =
    document
      .getElementById("title")
      .value
      .trim();


  const artist =
    document
      .getElementById("artist")
      .value
      .trim();


  const url =
    document
      .getElementById("url")
      .value
      .trim();


  const image =
    document
      .getElementById("image")
      .value
      .trim();


  const vibes =
    document
      .getElementById("vibes")
      .value
      .split(",")

      .map(
        x =>
          x
            .trim()
            .toLowerCase()
      )

      .filter(Boolean);



  if (!title || !url) {

    return alert(
      "Title and YouTube URL are required."
    );

  }



  data.songs.push({

    title,

    artist,

    url,

    image,

    vibes

  });



  save();



  [
    "title",
    "artist",
    "url",
    "image",
    "vibes"

  ].forEach(
    id =>
      document
        .getElementById(id)
        .value = ""
  );

}



function addPhoto() {

  const url =
    document
      .getElementById("photo")
      .value
      .trim();


  if (!url) {
    return;
  }


  data.photos.push({
    url
  });


  save();


  document
    .getElementById("photo")
    .value = "";

}



function delSong(i) {

  data.songs.splice(
    i,
    1
  );

  save();

}



function delPhoto(i) {

  data.photos.splice(
    i,
    1
  );

  save();

}



function render() {

  document
    .getElementById("songs")
    .innerHTML =

      data.songs

        .map(
          (s, i) =>

            `<div class="item">

              <b>${s.title}</b>
              — ${s.artist || ""}

              <div class="tag">
                ${s.vibes.join(" · ")}
              </div>

              <button
                onclick="delSong(${i})"
              >
                Delete
              </button>

            </div>`

        )

        .join("")

      ||

      "<p class='note'>No songs yet.</p>";



  document
    .getElementById("photos")
    .innerHTML =

      data.photos

        .map(
          (p, i) =>

            `<div class="item">

              ${p.url}

              <button
                onclick="delPhoto(${i})"
              >
                Delete
              </button>

            </div>`

        )

        .join("")

      ||

      "<p class='note'>No photos yet.</p>";

}



function resetHistory() {

  localStorage.removeItem(
    historyKey
  );

  alert(
    "Today's history reset."
  );

}



render();
