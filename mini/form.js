"use strict";
document.addEventListener("DOMContentLoaded", init);
const beerURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";
const tapsURL = "https://kristian-victor-foobar.herokuapp.com/";
let cartArray = [];
let cartlist = document.querySelector(".cartlist");
let formCheck = document.querySelector("form");
let matches = [];
let totalAmount = [];
function init() {
  getBeers();
  if (cartlist) {
    displayCart();
  }
  if (formCheck) {
    postFunction();
  }
}
async function getBeers(minJson, myTaps, myType) {
  let jsonData = await fetch(beerURL);
  minJson = await jsonData.json();
  let tapsData = await fetch(tapsURL);
  myTaps = await tapsData.json();
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
      modtagerKloner.lastElementChild.querySelector(".info").addEventListener("click", () => {
        visSingle(beertype);
      });
    });
  }
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
    let beerObject = { name: beertype.name, amount: beerAmount };
    cartArray.push(beerObject);
  }
  console.log(cartArray);
  localStorage.setItem("order", JSON.stringify(cartArray));
}
function displayCart(cartArray) {
  const skabelon = document.querySelector("template");
  cartlist.innerHTML = "";
  let currentOrder = localStorage.getItem("order");
  if (currentOrder == null) {
    document.querySelector(".purchaseModal").style.display = "block";
    document.querySelector(".proceed").style.display = "none";
    document.querySelector(".continue").style.display = "none";
    document.querySelector(".total").style.display = "none";
  }
  let orderParse = JSON.parse(currentOrder);
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
  } else {
    console.log("test");
    document.querySelector(".purchaseModal").style.display = "block";
    document.querySelector(".proceed").style.display = "none";
    document.querySelector(".continue").style.display = "none";
    document.querySelector(".total").style.display = "none";
  }
}
function removeBeer(orderParse, order) {
  order.amount--;
  for (let i = 0; i < orderParse.length; i++) {
    let indexOf = orderParse.indexOf(orderParse[i]);
    if (orderParse[i].amount < 1) {
      orderParse.splice(indexOf, i);
      if (indexOf == 0) {
        orderParse.shift();
      }
    }
  }
  localStorage.setItem("order", JSON.stringify(orderParse));
  displayCart(orderParse);
}
function postFunction() {
  const form = document.querySelector("form");
  let currentOrder = localStorage.getItem("order");
  let orderParse = JSON.parse(currentOrder);
  console.log(orderParse);
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
function postBeer(orderParse) {
  console.log(orderParse);
  const postData = JSON.stringify(orderParse);
  console.log(postData);
  fetch("http://kristian-victor-foobar.herokuapp.com/order", { method: "post", headers: { "Content-Type": "application/json; charset=utf-8" }, body: postData })
    .then((res) => res.json())
    .then((orderParse) => console.log(orderParse));
  purchaseDone();
}
function purchaseDone() {
  document.querySelector("#form_wrap").style.display = "none";
  document.querySelector(".purchaseModal").style.display = "block";
  setInterval(() => {
    redirectURL();
  }, 4000);
}
function redirectURL() {
  window.location.replace("form_beer.html");
  localStorage.clear();
}
function addedToCart(orders) {
  document.querySelector("span > p").textContent = orders;
}
function visSingle(beertype) {
  document.querySelector("#popup").style.display = "block";
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
