document.addEventListener("DOMContentLoaded", init);

const beerURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";

function init() {
  console.log("hep");
  getBeers();
}

async function getBeers() {
  let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/beertypes");
  minJson = await jsonData.json();
  displayBeers(minJson);
}

function displayBeers(minJson) {
  const modtagerKloner = document.querySelector(".beerlist");
  const skabelon = document.querySelector("template");
  modtagerKloner.innerHTML = "";
  console.log(minJson);

  if (modtagerKloner) {
    modtagerKloner.innerHTML = "";

    minJson.forEach((beertype) => {
      const klon = skabelon.cloneNode(true).content;
      klon.querySelector(".name").textContent = beertype.name;
      // klon.querySelector(".price").textContent = beer.price + "DKK";

      // beertype.photo = "images/" + beertype.name + ".png";
      // klon.querySelector("img").src = beertype.photo;

      klon.querySelector("img").src = "images/" + beertype.label;
      // klon.querySelector("img").alt = beertype.label;
      modtagerKloner.appendChild(klon);
    });
  }
}
