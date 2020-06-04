"use strict";
document.addEventListener("DOMContentLoaded", start);
function start() {
  setInterval(() => {
    getJson();
  }, 1000);
}
async function getJson(myJson) {
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  myJson = await jsonData.json();
  queueSize(myJson);
  nextQueue(myJson);
  bartenderStatus(myJson);
  total(myJson);
  beerStorage(myJson);
}
function queueSize(myJson) {
  let tema = document.querySelector("body").dataset.theme;
  document.querySelector(".costumer_img").innerHTML = "";
  document.querySelector("h2").textContent = myJson.queue.length;
  for (let i = 0; i < myJson.queue.length; i++) {
    if (i < 5) {
      const costumerImg = document.createElement("img");
      costumerImg.src = "icons/" + tema + "/queueMan.png";
      document.querySelector(".costumer_img").appendChild(costumerImg);
    }
  }
  if (myJson.queue.length > 5) {
    const manyCostumers = document.createElement("p");
    manyCostumers.textContent = "+";
    document.querySelector(".costumer_img").appendChild(manyCostumers);
  }
}
function nextQueue(myJson) {
  const cloneList = document.querySelector(".queueList");
  const temp = document.querySelector(".nextOrder template");
  cloneList.innerHTML = "";
  if (myJson.queue[0]) {
    myJson.queue[0].order.forEach((order) => {
      const clone = temp.cloneNode(true).content;
      clone.querySelector("h3").textContent = order;
      cloneList.appendChild(clone);
    });
  }
}
function bartenderStatus(myJson) {
  const modtagerKloner = document.querySelector(".bartenderList");
  const skabelon = document.querySelector(".bartenderStatus template");
  modtagerKloner.innerHTML = "";
  if (modtagerKloner) {
    modtagerKloner.innerHTML = "";
    myJson.bartenders.forEach((bartender) => {
      const klon = skabelon.cloneNode(true).content;
      klon.querySelector("h2").textContent = bartender.name;
      if (bartender.status === "WORKING") {
        klon.querySelector("h3").textContent = "Working";
      } else {
        klon.querySelector("h3").textContent = "Waiting";
      }
      let tema = document.querySelector("body").dataset.theme;
      if (bartender.statusDetail === "pourBeer") {
        klon.querySelector("h4").textContent = "Pouring Beer";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/pouringBeer.png";
      }
      if (bartender.statusDetail === "receivePayment") {
        klon.querySelector("h4").textContent = "Recieving Payment";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/recivingPayment.png";
      }
      if (bartender.statusDetail === "replaceKeg") {
        klon.querySelector("h4").textContent = "Replacing Keg";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/changingKeg.png";
      }
      if (bartender.statusDetail === "reserveTap") {
        klon.querySelector("h4").textContent = "Reserving Tap";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/reserveTap.png";
      }
      if (bartender.statusDetail === "releaseTap") {
        klon.querySelector("h4").textContent = "Releasing Tap";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/releasingTap.png";
      }
      if (bartender.statusDetail === "startServing") {
        klon.querySelector("h4").textContent = "Starting Service";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/startingService.png";
      }
      if (bartender.statusDetail === "waiting") {
        klon.querySelector("h4").textContent = "Waiting";
        klon.querySelector(".icons>.smallIcon>.icon").src = "icons/" + tema + "/waiting.png";
      }
      modtagerKloner.appendChild(klon);
    });
  }
}
function total(myJson) {
  let totalBeers = myJson.storage.reduce((accum, item) => accum + item.amount, 0);
  console.log("total beers:" + totalBeers);
  let circle = document.querySelector(".circle");
  circle.style.setProperty("--stroke", totalBeers);
  document.querySelector(".percentage").textContent = totalBeers + "%";
}
function beerStorage(myJson) {
  for (let i = 0; i < myJson.storage.length; i++) {
    let beerBar = document.querySelector(`#storage_parent>div:nth-child(${i + 1})>div.barParrent>div.storage_bar`);
    beerBar.style.setProperty("--width", myJson.storage[i].amount);
  }
}
