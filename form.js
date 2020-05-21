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

  localStorage.setItem("order", JSON.stringify(cartArray));
}

function displayCart(cartArray) {
  const skabelon = document.querySelector("template");
  cartlist.innerHTML = "";
  orderArray = [];

  let currentOrder = localStorage.getItem("order");

  let orderParse = JSON.parse(currentOrder);
  console.log(orderParse);

  // forsøg på at lave price count /
  // console.log(orderParse[0].amount);
  // orderPrice = +orderParse[0].amount + +orderParse[1].amount;
  // console.log((orderPrice *= 50));
  // document.querySelector("body > div.total > h2").textContent = orderPrice + " DKK";

  // console.log(orderArray);
  orderParse.forEach((order) => {
    const klon = skabelon.cloneNode(true).content;
    klon.querySelector("h1").textContent = order.name;
    klon.querySelector("h2").textContent = order.amount;

    // evt bruges til at fjerne øl
    // klon.querySelector("h2").addEventListener("click", () => {
    //   removeBeer(order);
    // });
    cartlist.appendChild(klon);
  });
}

// start til at fjerne øl
// function removeBeer(order) {
//   console.log(order);
//   order.amount--;

//   console.log(order.amount);

// }
