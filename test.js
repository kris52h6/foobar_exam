document.addEventListener("DOMContentLoaded", start);

function start() {
  getJson();
}

async function getJson(myJson) {
  console.log("hent json");
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  myJson = await jsonData.json();

  console.log(myJson);

  prepData(myJson);
}
