document.addEventListener("DOMContentLoaded", start);

const costumerQueue = [];
costumerQueue.length = 8;

let myQueue;

function start() {
  getJson();
}

async function getJson(myJson) {
  console.log("hent json");
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  myJson = await jsonData.json();

  console.log(myJson);
  console.log(myJson.queue.length);

  // document.querySelector("h1").textContent = "Costumers in queue:" + " " + myJson.queue.length;

  setHeights(myJson);
}

function count(myJson) {
  let height = myJson.queue.length;

  costumerQueue.push(height);

  costumerQueue.shift();

  setTimeout(getJson, 10000);
}

function setHeights(myJson) {
  console.log(myJson);

  for (let i = 0; i < costumerQueue.length; i++) {
    let bar = document.querySelector(`#barParent > div:nth-child(${i + 1})`);

    bar.style.setProperty("--height", costumerQueue[i]);
  }

  count(myJson);
}
