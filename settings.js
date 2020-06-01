// Settings button - open and close menu
function openNav() {
  document.getElementById("mySidepanel").style.width = "500px";
  document.getElementById("mySidepanel").style.padding = "60px 20px 0 20px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
  document.getElementById("mySidepanel").style.padding = "60px 0 0 0";
}

// JQuery fake login solution:
$(document).ready(function () {
  $("#submit").click(function () {
    event.preventDefault(); // prevent PageReLoad

    var ValidEmail = $("#username").val() === "test"; // User validate
    var ValidPassword = $("#password").val() === "test"; // Password validate

    if (ValidEmail === true && ValidPassword === true) {
      // if ValidEmail & ValidPassword
      $(".valid").css("display", "block");
      $(".error").css("display", "none");
      valid();
    } else {
      $(".error").css("display", "block"); // show error msg
    }
  });
});

function valid() {
  document.querySelector("button p").classList.add("hidden");
  document.querySelector(".loadContainer").style.display = "block";
  setTimeout(displaySetting, 2000);
}

function displaySetting() {
  console.log("push");
  document.querySelector(".loadContainer").classList.add("hidden");
  document.querySelector("form").classList.add("hidden");
  document.querySelector("#settings").style.display = "block";
}

// DISPLAYING TIME
(function () {
  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  function startTime() {
    var today = new Date(),
      h = checkTime(today.getHours()),
      m = checkTime(today.getMinutes()),
      s = checkTime(today.getSeconds());
    document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function () {
      startTime();
    }, 500);
  }
  startTime();
})();

// THEME SWITCHER
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

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

// Saves theme in local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.querySelector("body").setAttribute("data-theme", currentTheme);
  document.querySelector(".logo img").src = "icons/" + currentTheme + "/logo.png";

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}