document.addEventListener("DOMContentLoaded", init);

const beerURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";
let cartArray = [];
let cartlist = document.querySelector(".cartlist");

function init() {
  getBeers();
  if (cartlist) {
    displayCart();
  }
}

async function getBeers() {
  let jsonData = await fetch(beerURL);
  minJson = await jsonData.json();
  displayBeers(minJson);
}

function displayBeers(minJson) {
  const modtagerKloner = document.querySelector(".beerlist");
  const skabelon = document.querySelector("template");
  modtagerKloner.innerHTML = "";
  let taeller = 0;
  // console.log(minJson);

  if (modtagerKloner) {
    modtagerKloner.innerHTML = "";

    minJson.forEach((beertype) => {
      const klon = skabelon.cloneNode(true).content;
      klon.querySelector(".name").textContent = beertype.name;
      // klon.querySelector(".price").textContent = beer.price + "DKK";
      klon.querySelector("button").id = taeller;
      klon.querySelector("button").addEventListener("click", (event) => {
        beerCount(beertype, event);
      });
      taeller++;

      klon.querySelector("img").src = "images/" + beertype.label;
      // klon.querySelector("img").alt = beertype.label;
      modtagerKloner.appendChild(klon);
      // modtagerKloner.querySelector("button").addEventListener("click", () => {
      //   beerCount(beertype, this);
      // });
    });
  }
}

function beerCount(beertype, event) {
  let beerAmount = document.querySelectorAll(".quantity")[event.target.id].value;
  console.log(beerAmount);

  let beerObject = {
    name: beertype.name,
    amount: beerAmount,
  };

  cartArray.push(beerObject);
  console.log(cartArray);

  localStorage.setItem("order", JSON.stringify(beerObject));
}

function displayCart() {
  const skabelon = document.querySelector("template");
  cartlist.innerHTML = "";
  orderArray = [];

  let currentOrder = localStorage.getItem("order");

  let orderParse = JSON.parse(currentOrder);
  console.log(orderParse);

  orderArray.push(orderParse);

  console.log(orderArray);
  orderArray.forEach((order) => {
    const klon = skabelon.cloneNode(true).content;
    klon.querySelector("h1").textContent = order.name;
    klon.querySelector("h2").textContent = order.amount;
    cartlist.appendChild(klon);
  });
}
