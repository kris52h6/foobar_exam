document.addEventListener("DOMContentLoaded", init);

const beerURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";
let cartArray = [];
let cartlist = document.querySelector(".cartlist");
let testCheck = document.querySelector("body > div.proceed.checkout");
// const endpoint = "http://kristian-victor-foobar.herokuapp.com/order";

function init() {
  getBeers();
  if (cartlist) {
    displayCart();
  }

  if (testCheck) {
    postFunction();
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
  // console.log(orderParse);
  console.log(orderParse[0].name);
  console.log(orderParse[0].amount);

  // document.querySelector("body > div.proceed.checkout").addEventListener("click", () => {
  //   console.log("test");
  // });
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

function postFunction() {
  let currentOrder = localStorage.getItem("order");
  let orderParse = JSON.parse(currentOrder);
  console.log(orderParse);

  document.querySelector("body > div.proceed.checkout").addEventListener("click", () => {
    // postBeer([
    //   {
    //     name: orderParse[1].name,
    //     amount: orderParse[1].amount,
    //   },
    // ]);
    postBeer(orderParse);
  });
}

function postBeer(orderParse) {
  console.log(orderParse);
  const postData = JSON.stringify(orderParse);
  // console.log(postData);
  console.log(postData);

  fetch("http://kristian-victor-foobar.herokuapp.com/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((orderParse) => console.log(orderParse));

  purchaseDone();
}

function purchaseDone() {
  document.querySelector("body > div.proceed.checkout > a").style.display = "none";
  document.querySelector("#form_wrap").style.display = "none";
  document.querySelector(".purchaseModal").style.display = "block";
  document.querySelector(".purchaseComplete").style.display = "block";

  setInterval(() => {
    redirectURL();
  }, 4000);
}

function redirectURL() {
  window.location.replace("/form_beer.html");
}

// start til at fjerne øl
// function removeBeer(order) {
//   console.log(order);
//   order.amount--;

//   console.log(order.amount);

// }

// function post(data) {
//   //   showSubmit(data);
//   const postData = JSON.stringify(data);
//   fetch(endpoint, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "x-apikey": apiKey,
//       "cache-control": "no-cache",
//     },
//     body: postData,
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }
