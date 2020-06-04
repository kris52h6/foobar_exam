"use strict";

document.addEventListener("DOMContentLoaded", start);

const costumerQueue = [];
costumerQueue.length = 11;

function start() {
  getQueue();
}

async function getQueue(queueJson) {
  console.log("hent json");
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  queueJson = await jsonData.json();

  setHeights(queueJson);
}

// sets height of queue bar
function setHeights(queueJson) {
  for (let i = 0; i < costumerQueue.length; i++) {
    let bar = document.querySelector(`#barParent > div:nth-child(${i + 1})`);
    document.querySelector(`#barParent > div:nth-child(${i + 1}) > p`).textContent = costumerQueue[i];

    bar.style.setProperty("--height", costumerQueue[i]);
  }

  count(queueJson);
}

// pushes bar to array
function count(queueJson) {
  let height = queueJson.queue.length;

  costumerQueue.push(height);

  costumerQueue.shift();

  setTimeout(getQueue, 10000); // makes it opdate every 10 sec
}
