document.addEventListener("DOMContentLoaded", start);

const costumerQueue = [];
costumerQueue.length = 8;

let queueJson;

function start() {
  getQueue();
}

async function getQueue(queueJson) {
  // console.log("hent json");
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  queueJson = await jsonData.json();

  // console.log(queueJson);
  // console.log(queueJson.queue.length);

  // document.querySelector("h1").textContent = "Costumers in queue:" + " " + queueJson.queue.length;

  // setHeights(queueJson);
  total(queueJson);
  setHeights(queueJson);
  addCostumer(queueJson);
  beerStorage(queueJson);
}

function total(queueJson) {
  let totalBeers = queueJson.storage.reduce((accum, item) => accum + item.amount, 0);

  console.log("total beers:" + totalBeers);

  let circle = document.querySelector(".circle");
  circle.style.setProperty("--stroke", totalBeers);

  document.querySelector(".percentage").textContent = totalBeers + "%";
}

/*** COSTUMER CHART ***/
function count(queueJson) {
  let height = queueJson.queue.length;

  costumerQueue.push(height);

  costumerQueue.shift();

  setTimeout(getQueue, 10000);
}

function setHeights(queueJson) {
  for (let i = 0; i < costumerQueue.length; i++) {
    let bar = document.querySelector(`#barParent > div:nth-child(${i + 1})`);

    bar.style.setProperty("--height", costumerQueue[i]);
  }

  count(queueJson);
}

/*** COSTUMER QUEUE IMAGES */

function addCostumer(getQueue) {
  let costumers = getQueue.queue.length;
  // console.log(costumers);

  for (let i = 0; i < costumerQueue.length; i++) {}
}

function beerStorage(queueJson) {
  for (let i = 0; i < queueJson.storage.length; i++) {
    console.log(queueJson.storage[i].amount);

    let beerBar = document.querySelector(`#storage_parent > div:nth-child(${i + 1}) > div.storage_bar`);

    beerBar.style.setProperty("--width", queueJson.storage[i].amount);
  }

  //   console.log(queueJson.storage.length);
}
