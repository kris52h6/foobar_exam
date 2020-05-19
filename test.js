document.addEventListener("DOMContentLoaded", start);

let costumerQueue = [];

function start() {
  getJson();
}

async function getJson(myJson) {
  console.log("hent json");
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  myJson = await jsonData.json();

  console.log(myJson);
  console.log(myJson.queue.length);

  document.querySelector("h1").textContent = "Costumers in queue:" + " " + myJson.queue.length;
  // prepData(myJson);
}
