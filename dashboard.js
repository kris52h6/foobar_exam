document.addEventListener("DOMContentLoaded", start);

let costumerQueue = [];

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

  document.querySelector("h1").textContent = "Costumers in queue:" + " " + myJson.queue.length;

  bartenderStatus(myJson);
}

function bartenderStatus(myJson) {
  //   console.log(myJson.bartenders[0].statusDetail);

  const modtagerKloner = document.querySelector(".bartenderList");
  const skabelon = document.querySelector("template");
  modtagerKloner.innerHTML = "";

  if (modtagerKloner) {
    modtagerKloner.innerHTML = "";

    myJson.bartenders.forEach((bartender) => {
      const klon = skabelon.cloneNode(true).content;
      klon.querySelector("h2").textContent = bartender.name;

      klon.querySelector("h3").textContent = bartender.status;

      if (bartender.statusDetail === "pourBeer") {
        klon.querySelector("h4").textContent = "Pouring Beer";
      }
      if (bartender.statusDetail === "receivePayment") {
        klon.querySelector("h4").textContent = "Recieving Payment";
      }
      if (bartender.statusDetail === "replaceKeg") {
        klon.querySelector("h4").textContent = "Replacing Keg";
      }
      if (bartender.statusDetail === "reserveTap") {
        klon.querySelector("h4").textContent = "Reserving Tap";
      }
      if (bartender.statusDetail === "releaseTap") {
        klon.querySelector("h4").textContent = "Releasing Tap";
      }
      if (bartender.statusDetail === "startServing") {
        klon.querySelector("h4").textContent = "Starting Service";
      }

      if (bartender.statusDetail === "waiting") {
        klon.querySelector("h4").textContent = "Waiting";
      }

      //   klon.querySelector("h4").textContent = bartender.statusDetail;

      modtagerKloner.appendChild(klon);
    });
  }
}
