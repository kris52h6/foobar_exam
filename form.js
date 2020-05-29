document.addEventListener("DOMContentLoaded", init);

const beerURL = "https://kristian-victor-foobar.herokuapp.com/beertypes";
let cartArray = [];
let cartlist = document.querySelector(".cartlist");
let testCheck = document.querySelector("form");
let totalAmount = [];

const element = document.querySelector(".cart_right");

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
  let taellerPlus = 0;
  let taellerMinus = 0;
  // console.log(minJson);

  if (modtagerKloner) {
    modtagerKloner.innerHTML = "";

    minJson.forEach((beertype) => {
      const klon = skabelon.cloneNode(true).content;
      klon.querySelector(".name").textContent = beertype.name;

      klon.querySelector(".add").id = taeller;
      klon.querySelector(".plus").id = taellerPlus;
      klon.querySelector(".minus").id = taellerMinus;

      klon.querySelector(".minus").addEventListener("click", () => {
        beerMinus();
      });

      klon.querySelector(".plus").addEventListener("click", () => {
        beerPlus();
      });
      klon.querySelector(".add").addEventListener("click", (event) => {
        beerPurchased(event);
        beerCount(beertype, event);
      });
      taeller++;
      taellerPlus++;
      taellerMinus++;

      klon.querySelector("img").src = "image/" + beertype.label;
      klon.querySelector("img").alt = beertype.label;
      modtagerKloner.appendChild(klon);
    });
  }
}

function beerMinus() {
  if (document.querySelectorAll(".quantity")[event.target.id].value > 1) {
    document.querySelectorAll(".quantity")[event.target.id].value--;
  } else {
  }
}

function beerPlus() {
  document.querySelectorAll(".quantity")[event.target.id].value++;
}

function beerPurchased(event) {
  document.querySelectorAll(".add")[event.target.id].textContent = "✔";

  setTimeout(() => {
    document.querySelectorAll(".add")[event.target.id].textContent = "Add to cart";
    console.log("test");
  }, 500);
}

function beerCount(beertype, event) {
  let beerAmount = document.querySelectorAll(".quantity")[event.target.id].value;
  console.log(beerAmount);

  totalAmount.push(beerAmount);
  console.log(totalAmount);

  // tæller det totale antal af bestillinger og kalder addedToCart
  let orders = 0;
  for (let i = 0; i < totalAmount.length; i++) {
    orders = +totalAmount[i] + orders;
  }
  addedToCart(orders);

  let beerObject = {
    name: beertype.name,
    amount: beerAmount,
  };
  cartArray.push(beerObject);
  // addedToCart(beerAmount);

  localStorage.setItem("order", JSON.stringify(cartArray));
}

function displayCart(cartArray) {
  const skabelon = document.querySelector("template");
  cartlist.innerHTML = "";
  let currentOrder = localStorage.getItem("order");
  console.log(cartArray);

  if (currentOrder == null) {
    document.querySelector(".purchaseModal").style.display = "block";
    document.querySelector(".proceed").style.display = "none";
    document.querySelector(".continue").style.display = "none";
    document.querySelector(".total").style.display = "none";
  }

  let orderParse = JSON.parse(currentOrder);

  // console.log(orderParse);

  // console.log(orderParse);

  let orderPrice = 0;
  for (let i = 0; i < orderParse.length; i++) {
    orderPrice = +orderParse[i].amount + orderPrice;
  }
  totalPrice = orderPrice * 49;
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

  // console.log(orderParse.length);
  // if (orderParse.length < 1) {
  //   document.querySelector(".proceed").style.opacity = "50%";
  if (orderParse.length >= 1) {
    console.log(orderParse.length);
    document.querySelector(".proceed").addEventListener("click", () => {
      window.location.replace("form_checkout.html");
    });
  } else {
    // document.querySelector(".proceed").removeEventListener("click");
    console.log("test");
    document.querySelector(".purchaseModal").style.display = "block";
    document.querySelector(".proceed").style.display = "none";
    document.querySelector(".continue").style.display = "none";
    document.querySelector(".total").style.display = "none";
  }
}

// start til at fjerne øl
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
  // document.querySelector("body > div.proceed.checkout").addEventListener("click", () => {
  // form.setAttribute("novalidate", true);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      console.log("ready");
      postBeer(orderParse);
    }
  });

  // document.querySelector("#subscribe_form > form > div > input[type=submit]").addEventListener("click", () => {
  //   postBeer(orderParse);
  // });
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

// viser antal bestillinger i kuren, på beer.html
function addedToCart(orders) {
  document.querySelector("span").textContent = orders;
}
