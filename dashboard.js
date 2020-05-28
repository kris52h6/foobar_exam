document.addEventListener("DOMContentLoaded", start);

// let costumerQueue = [];
// costumerQueue.length = 8;

function start() {
  setInterval(() => {
    getJson();
  }, 1000);
}

async function getJson(myJson) {
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
  myJson = await jsonData.json();

  //   console.log(myJson);
  //   console.log(myJson.queue.length);

  queueSize(myJson);
  bartenderStatus(myJson);
  nextQueue(myJson);

  //   beerStorage(myJson);
  // setHeights(myJson);
}

function queueSize(myJson) {
  let tema = document.querySelector("body").dataset.theme;

  document.querySelector(".costumer_img").innerHTML = "";
  document.querySelector("h2").textContent = +myJson.queue.length;

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

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.querySelector("body").setAttribute("data-theme", currentTheme);
  document.querySelector(".logo img").src = "icons/" + currentTheme + "/logo.png";

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.querySelector("body").setAttribute("data-theme", "dark");
    document.querySelector(".logo img").src = "icons/dark/logo.png";
    localStorage.setItem("theme", "dark");
  } else {
    document.querySelector("body").setAttribute("data-theme", "light");
    document.querySelector(".logo img").src = "icons/light/logo.png";
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// function count(myJson) {
//   let height = myJson.queue.length;

//   costumerQueue.push(height);

//   costumerQueue.shift();

//   setTimeout(getJson, 10000);
// }

// function setHeights(myJson) {
//   console.log(myJson);

//   for (let i = 0; i < costumerQueue.length; i++) {
//     let bar = document.querySelector(`#barParent > div:nth-child(${i + 1})`);

//     bar.style.setProperty("--height", costumerQueue[i]);
//   }

//   count(myJson);
// }
// const timestamp = require("time-stamp");
// console.log(timestamp("HHMM"));

function nextQueue(myJson) {
  const cloneList = document.querySelector(".queueList");
  const temp = document.querySelector(".nextOrder template");
  cloneList.innerHTML = "";
  myJson.queue.forEach((queue) => {
    const clone = temp.cloneNode(true).content;
    clone.querySelector("h3").textContent = queue.order[0];
    cloneList.appendChild(clone);
  });
}

function bartenderStatus(myJson) {
  //   console.log(myJson.bartenders[0].statusDetail);

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

      //   klon.querySelector("h3").textContent = bartender.status;
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

      //   klon.querySelector("h4").textContent = bartender.statusDetail;

      modtagerKloner.appendChild(klon);
    });
  }
}
