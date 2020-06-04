"use strict";

document.addEventListener("DOMContentLoaded", init);

const beerURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";
const tapsURL = "https://kristian-victor-foobar.herokuapp.com/";
// const typesURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";
let cartArray = [];
let cartlist = document.querySelector(".cartlist");
let formCheck = document.querySelector("form");
let matches = [];

let totalAmount = [];

// const endpoint = "http://kristian-victor-foobar.herokuapp.com/order";

function init() {
  getBeers();
  // kalder displayCart, hvis scriptet køres på form_cart.html
  if (cartlist) {
    displayCart();
  }
  // kalder postFunction, hvis scriptet køres på form_checkout.html
  if (formCheck) {
    postFunction();
  }
}

async function getBeers(minJson, myTaps, myType) {
  let jsonData = await fetch(beerURL);
  minJson = await jsonData.json();
  let tapsData = await fetch(tapsURL);
  myTaps = await tapsData.json();
  // let typeData = await fetch(beerURL);
  // myType = await typeData.json();
  displayBeers(minJson, myTaps);
}

function displayBeers(minJson, myTaps) {
  const modtagerKloner = document.querySelector(".beerlist");
  const skabelon = document.querySelector("template");
  let taeller = 0;
  let taellerPlus = 0;
  let taellerMinus = 0;

  if (modtagerKloner) {
    modtagerKloner.innerHTML = "";

    minJson.forEach((beertype) => {
      const klon = skabelon.cloneNode(true).content;

      const found = myTaps.taps.find((tap) => {
        return tap.beer == beertype.name;
      });
      const available = found ? true : false;

      if (available == false) {
        klon.querySelector(".unavailable").textContent = "Unavailable";
        klon.querySelector(".button").style.opacity = "20%";
      }

      klon.querySelector(".name").textContent = beertype.name;

      klon.querySelector(".add").id = taeller;
      klon.querySelector(".plus").id = taellerPlus;
      klon.querySelector(".minus").id = taellerMinus;

      if (available == true) {
        klon.querySelector(".minus").addEventListener("click", () => {
          beerMinus();
        });

        klon.querySelector(".plus").addEventListener("click", () => {
          beerPlus();
        });
        klon.querySelector(".add").addEventListener("click", (event) => {
          beerAdded(event);
          beerCount(beertype, event);
        });
      }
      taeller++;
      taellerPlus++;
      taellerMinus++;

      klon.querySelector("img").src = "image/" + beertype.label;
      klon.querySelector("img").alt = beertype.label;
      modtagerKloner.appendChild(klon);

      modtagerKloner.lastElementChild.querySelector(".name").addEventListener("click", () => {
        visSingle(beertype);
      });
    });
  }

  // const intersections = minJson.filter((name) => myTaps.taps.indexOf(name) !== -1);
  // console.log(intersections);
}

function beerMinus() {
  if (document.querySelectorAll(".quantity")[event.target.id].value > 1) {
    document.querySelectorAll(".quantity")[event.target.id].value--;
  }
}

function beerPlus() {
  if (document.querySelectorAll(".quantity")[event.target.id].value < 9) {
    document.querySelectorAll(".quantity")[event.target.id].value++;
  }
}

// laver flueben når man trykker på .add knappen
function beerAdded(event) {
  document.querySelectorAll(".add")[event.target.id].textContent = "✔";
  document.querySelector("span > p").classList.add("numberInCart");
  setTimeout(() => {
    document.querySelectorAll(".add")[event.target.id].textContent = "Add to cart";
    document.querySelector("span > p").classList.remove("numberInCart");
  }, 500);
}

function beerCount(beertype, event) {
  let beerAmount = document.querySelectorAll(".quantity")[event.target.id].value;

  totalAmount.push(beerAmount);

  // tæller det totale antal af bestillinger og kalder addedToCart
  let orders = 0;
  for (let i = 0; i < totalAmount.length; i++) {
    orders = +totalAmount[i] + orders;
  }
  addedToCart(orders);

  let currenntId = cartArray.findIndex((x) => x.name === beertype.name);
  console.log(currenntId);
  console.log(cartArray);
  if (currenntId !== -1) {
    cartArray[currenntId].amount = parseInt(beerAmount) + parseInt(cartArray[currenntId].amount);
  } else {
    let beerObject = {
      name: beertype.name,
      amount: beerAmount,
    };
    cartArray.push(beerObject);
    // addedToCart(beerAmount);
  }

  console.log(cartArray);
  // stringify'er cartArray og sætter localStorage til at være værdien af det.
  localStorage.setItem("order", JSON.stringify(cartArray));
}

function displayCart(cartArray) {
  const skabelon = document.querySelector("template");
  cartlist.innerHTML = "";
  // henter ordren fra localStorage på "cart" siden
  let currentOrder = localStorage.getItem("order");

  // hvis der ingen ordre er, fjerner den evnen til at gå videre til checkout
  if (currentOrder == null) {
    document.querySelector(".purchaseModal").style.display = "block";
    document.querySelector(".proceed").style.display = "none";
    document.querySelector(".continue").style.display = "none";
    document.querySelector(".total").style.display = "none";
  }

  let orderParse = JSON.parse(currentOrder);

  // regner total prisen på ordren ud og displayer prisen
  let orderPrice = 0;
  for (let i = 0; i < orderParse.length; i++) {
    orderPrice = +orderParse[i].amount + orderPrice;
  }

  document.querySelector("body > div.total > h2").textContent = orderPrice * 49 + " DKK";

  orderParse.forEach((order) => {
    const klon = skabelon.cloneNode(true).content;
    klon.querySelector("h1").textContent = order.name;
    klon.querySelector("h2").textContent = order.amount;

    klon.querySelector(".remove").addEventListener("click", () => {
      removeBeer(orderParse, order);
    });
    cartlist.appendChild(klon);
  });

  if (orderParse.length >= 1) {
    console.log(orderParse.length);
    document.querySelector(".proceed").addEventListener("click", () => {
      window.location.replace("form_checkout.html");
    });
  } // fjerner hele cart displayet, hvis længden af orderparse er under 1
  else {
    console.log("test");
    document.querySelector(".purchaseModal").style.display = "block";
    document.querySelector(".proceed").style.display = "none";
    document.querySelector(".continue").style.display = "none";
    document.querySelector(".total").style.display = "none";
  }
}

// fjerner øl fra kurven
function removeBeer(orderParse, order) {
  order.amount--;

  for (let i = 0; i < orderParse.length; i++) {
    let indexOf = orderParse.indexOf(orderParse[i]);
    // fjerner øllen fra array'et afhængig af hvilket nummer den man trykker på har i array'et
    if (orderParse[i].amount < 1) {
      orderParse.splice(indexOf, i);
      // hvis øllen prøver at fjerne er indexOf == 0, fjerner den den første øl fra array'et
      if (indexOf == 0) {
        orderParse.shift();
      }
    }
  }

  // sætter ordrende i localStorage til at være det nye antal øl
  localStorage.setItem("order", JSON.stringify(orderParse));

  // kalder displayCart igen, for at visuelt opdatere det antal øl man har i kurven
  displayCart(orderParse);
}

// henter ordren fra local storage, og tilføjer click på accept knappen, som kalder postBeer
function postFunction() {
  const form = document.querySelector("form");
  let currentOrder = localStorage.getItem("order");
  let orderParse = JSON.parse(currentOrder);
  console.log(orderParse);
  // document.querySelector("body > div.proceed.checkout").addEventListener("click", () => {
  // form.setAttribute("novalidate", true);

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   if (form.checkValidity()) {
  //     console.log("ready");
  //     postBeer(orderParse);
  //   }
  // });

  const pristine = new Pristine(form);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = pristine.validate();

    if (valid) {
      console.log("valid");
      postBeer(orderParse);
    } else {
      console.log("invalid");
    }
  });
}

// poster data fra localStorage (som er kundens køb)
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

// når brugeren trykker "accept" i formen, bliver .purchaseModal vist, som siger tak for købet
// og kalder funktionen som redirecter dem tilbage til forsiden
function purchaseDone() {
  document.querySelector("#form_wrap").style.display = "none";
  document.querySelector(".purchaseModal").style.display = "block";

  setInterval(() => {
    redirectURL();
  }, 4000);
}

// redirecter tilbage til forsiden
function redirectURL() {
  window.location.replace("form_beer.html");
  localStorage.clear();
}

// viser antal bestillinger i kuren, på beer.html
function addedToCart(orders) {
  document.querySelector("span > p").textContent = orders;
}

// POPUP

function visSingle(beertype) {
  document.querySelector("#popup").style.display = "block";

  document.querySelector("#popup .luk").addEventListener("click", lukBeer);

  // console.log(minJson);

  document.querySelector(".singleBeer .beerImage").src = "image/" + beertype.label;

  document.querySelector(".singleBeer h1").textContent = beertype.name;
  document.querySelector(".singleBeer h2").textContent = beertype.category;
  document.querySelector(".singleBeer .alc").textContent = "Alc: " + beertype.alc + "%";
  document.querySelector(".singleBeer .aroma").textContent = beertype.description.aroma;
  document.querySelector(".singleBeer .apperance").textContent = beertype.description.appearance;

  document.querySelector(".singleBeer .flavor").textContent = beertype.description.flavor;
  document.querySelector(".singleBeer .mouthFeel").textContent = beertype.description.mouthfeel;
  document.querySelector(".singleBeer .overall").textContent = beertype.description.overallImpression;

  function lukBeer() {
    document.querySelector("#popup").style.display = "none";
  }
}
function closeNav() {
  document.querySelector("#popup").style.display = "none";
}
