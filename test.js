// document.addEventListener("DOMContentLoaded", start);

// const costumerQueue = [];
// costumerQueue.length = 8;

// let myJson;

// function start() {
//   getQueue();
//   // subFunction();
// }

// async function getQueue(queueJson) {
//   // console.log("hent json");
//   let jsonData = await fetch("https://kristian-victor-foobar.herokuapp.com/");
//   queueJson = await jsonData.json();

//   // console.log(queueJson);
//   // console.log(queueJson.queue.length);

//   // document.querySelector("h1").textContent = "Costumers in queue:" + " " + queueJson.queue.length;

//   setHeights(queueJson);
// }

// // COSTUMER CHART
// function count(queueJson) {
//   let height = queueJson.queue.length;

//   costumerQueue.push(height);

// Queue bars
// function setHeights(queueJson) {
//   for (let i = 0; i < costumerQueue.length; i++) {
//     let bar = document.querySelector(`#barParent > div:nth-child(${i + 1})`);
//     document.querySelector(`#barParent > div:nth-child(${i + 1}) > p`).textContent = costumerQueue[i];

// //   setTimeout(getQueue, 10000);
// }

// // Queue bars
// function setHeights(queueJson) {
//   for (let i = 0; i < costumerQueue.length; i++) {
//     let bar = document.querySelector(`#barParent > div:nth-child(${i + 1})`);

//     bar.style.setProperty("--height", costumerQueue[i]);
//   }

//   count(queueJson);
// }

// // Settings button - open and close menu
// function openNav() {
//   document.getElementById("mySidepanel").style.width = "500px";
//   document.getElementById("mySidepanel").style.padding = "60px 20px 0 20px";
// }

// function closeNav() {
//   document.getElementById("mySidepanel").style.width = "0";
//   document.getElementById("mySidepanel").style.padding = "60px 0 0 0";
// }

// // FAKE LOGIN
// // function subFunction() {
// //   const form = document.querySelector("form");
// //   form.addEventListener("submit", (e) => {
// //     e.preventDefault();
// //     if (form.checkValidity()) {
// //       console.log("ready");
// //       valid();
// //     }
// //   });
// // }

// // JQuery fake login solution:
// $(document).ready(function () {
//   //$('#username').focus();

//   $("#submit").click(function () {
//     event.preventDefault(); // prevent PageReLoad

//     var ValidEmail = $("#username").val() === "test"; // User validate
//     var ValidPassword = $("#password").val() === "test"; // Password validate

//     if (ValidEmail === true && ValidPassword === true) {
//       // if ValidEmail & ValidPassword
//       $(".valid").css("display", "block");
//       $(".error").css("display", "none"); // show error msg
//       valid();
//     } else {
//       $(".error").css("display", "block"); // show error msg
//     }
//   });
// });

// function valid() {
//   document.querySelector("button p").classList.add("hidden");
//   document.querySelector(".loadContainer").style.display = "block";
//   setTimeout(displaySetting, 2000);
// }

// function displaySetting() {
//   console.log("push");
//   document.querySelector(".loadContainer").classList.add("hidden");
//   document.querySelector("form").classList.add("hidden");
//   document.querySelector("#settings").style.display = "block";
// }

// (function () {
//   function checkTime(i) {
//     return i < 10 ? "0" + i : i;
//   }

//   function startTime() {
//     var today = new Date(),
//       h = checkTime(today.getHours()),
//       m = checkTime(today.getMinutes()),
//       s = checkTime(today.getSeconds());
//     document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
//     t = setTimeout(function () {
//       startTime();
//     }, 500);
//   }
//   startTime();
// })();

// const fridayAfternoon = true;
// function snack() {
//   if (fridayAfternoon == true) {
//     alert("cheers mum");
//   } else {
//     alert(":(");
//   }
// }

$(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    // correct response
    if ($("input[name='username']").val() === "correctuser" && $("input[name='password']").val() === "correctpassword") {
      alert("Login successful!");
      $("form")[0].reset();
    } else {
      $(this)
        .addClass("shake")
        .delay(500)
        .queue(function () {
          $(this).removeClass("shake");
          $("input[name='password']").focus().select();
          $(this).dequeue();
        });
    }
  });
});
