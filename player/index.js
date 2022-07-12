var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");
var badtime = document.getElementById("reloadBtn");
var unit = "s";
var x = document.getElementById("snackbar");
var elem = document.getElementById("fullscreenVideo");
var seekslider = document.getElementById("seekslider");
var curtimetext = document.getElementById("curtimetext");
var durtimetext = document.getElementById("durtimetext");
var sanssrc = document.getElementById("myVideo");
var name = document.getElementById("upload");
var controls = document.getElementById("controls");
var jsmediatags = window.jsmediatags;

var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? "onbeforeunload" : "beforeunload"; /// make IE7, IE8 compitable

myEvent(chkevent, function (e) {
  // For >=IE7, Chrome, Firefox
  var confirmationMessage = "Are you sure to leave the page?"; // a space
  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
});

$(".content").hide();

if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("This is running as standalone.");
  $("#footerModal").css("display", "none");
}

var mobile = window.innerHeight > window.innerWidth;
var pc = window.innerHeight < window.innerWidth;

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function settime() {
  if (video.played) console.log(video.currentTime);
  setInterval(function () {
    console.log(video.currentTime);
    document.getElementById("time").innerHTML =
      Math.round(video.currentTime) + unit;
  }, 1000);
}
const progress = document.getElementById("progress");
function progressLoop() {
  setInterval(function () {
    progress.value = Math.round((myVideo.currentTime / myVideo.duration) * 100);
  });
}

progressLoop();

function silentErrorHandler() {
  return true;
}
window.onerror = silentErrorHandler;

progress.addEventListener("click", seek);

function seek(e) {
  let percent = e.offsetX / this.offsetWidth;
  video.currentTime = percent * video.duration;
  e.target.value = Math.floor(percent / 100);
  e.target.innerHTML = progress.value + "% played";
}

function playPageTitle() {
  newPlayTitle = "Playing!";
  document.title = newPlayTitle;
}
function pausePageTitle() {
  newPauseTitle = "Paused!";
  document.title = newPauseTitle;
}
async function changePageTitle() {
  var name = document.getElementById("upload");
  await sleep(1000);
  newPageTitle = name.files.item(0).name;
  document.title = newPageTitle;
}

function musicTitle() {
  var name = document.getElementById("upload");
  if (src != "") {
    musicTitle = name.files.item(0).name;
    document.title = musicTitle;
  }
}

$(".menu-option").click(function () {
  boxplay();
});

if (navigator.userAgent.indexOf("Firefox") !== -1) {
  // Do Firefox-related activities
  document.getElementById("firefox").innerHTML =
    "[Space] or scroll ROLL button: Play/pause (In fullscreen: Scroll anywhere) <u>------------------------------------------------------------------------------</u> <b>Scroll in Firefox is unstable</b>";
}

function home() {
  // location.reload(true);
  // return false;
  window.close();
  if (window.closed) {
    window.open("/player/");
  }
}
var volumeRange = 1.0;
var fadeOutVolume = 0.1;
function checkVideoMuted() {
  if (document.getElementById("vol-control").value == "0") {
    fadeOutVolume = 0;
  } else {
    fadeOutVolume = 0.1;
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function playVideo() {
  $("video").animate({ volume: volumeRange }, 500, "linear");
  video.play();
  btn.innerHTML =
    '<span><b style="color: black" id="loopText">ROLL (⏸️)</b></span>';
  playPageTitle();
  changePageTitle();
  $("#myBtn").notify("Playing!", {
    style: "happyblue",
    className: "superblue",
    position: "top center",
  });
  if (mobile) {
    console.log("Freeze");
  } else if (pc) {
    $("#myVideo").css(
        "background-image",
        "url('https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/7HHu.gif?v=1646408754070')"
      );
  }
}
function pauseVideo() {
  checkVideoMuted();
  $("video").animate({ volume: fadeOutVolume }, 500, "linear", function () {
    video.pause();
    pausePageTitle();
  changePageTitle();
  });
  // video.pause();
  btn.innerHTML =
    '<span><b style="color: black" id="loopText">ROLL (▶)</b></span>';
  $("#myBtn").notify("Paused!", {
    style: "happyblue",
    className: "superblue",
    position: "top center",
  });
  if (mobile) {
    console.log("Freeze");
  } else if (pc) {
    $("#myVideo")
      .fadeTo(0, 0.1, function () {
        $(this).css(
          "background-image",
          'url("https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/7HHu.png?v=1655397503815")'
        );
      })
      .delay(100)
      .fadeTo(400, 1);
  }
}
function toggleLoop() {
  var loopText = document.getElementById("loopText");
  var attr = $(video).attr("loop");
  if (typeof attr !== "undefined" && attr !== false) {
    document.getElementsByTagName("video")[0].removeAttribute("loop");
    loopText.innerHTML = "LOOP: OFF";
    setTimeout(function () {
      loopText.innerHTML = "ROLL";
    }, 1000);
  } else {
    document.getElementsByTagName("video")[0].setAttribute("loop", "true");
    loopText.innerHTML = "LOOP: ON";
    setTimeout(function () {
      loopText.innerHTML = "ROLL";
    }, 1000);
  }
}

function bpControl() {
  var name = document.getElementById("upload");
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
}

function boxplay() {
  var boxurl = prompt(
    "[UNSTABLE] Paste clean Youtube link - Use at your own risk",
    "amogus"
  );
  $("#src").attr(
    "src",
    "https://yt.rmxgrp.dev/download?url=" + boxurl + "&format=video"
  );
  $("#uploadform").hide();
  document.getElementById("myVideo").load();
  if (boxurl === null) {
    alert("Ok!");
    $("#uploadform").show();
    return; //break out of the function early
  } else if (boxurl === "") {
    alert("Ok!");
    $("#uploadform").show();
    return;
  } else if (boxurl === "amogus") {
    alert("Ok amogus!");
    $("#src").attr(
      "src",
      "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/y2mate.com%20-%20amogus_1080p.mp4?v=1649084678121"
    );
    document.getElementById("myVideo").load();
    document.title = "YOU SUS. NOW RELOAD THIS PAGE";
  }
}

// Menu

const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = (command) => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", (e) => {
  if (menuVisible) toggleMenu("hide");
});

menuOption.addEventListener("click", (e) => {
  console.log("mouse-option", e.target.innerHTML);
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target == elem) {
    const origin = {
      left: e.pageX,
      top: e.pageY,
    };
    setPosition(origin);
    return false;
  } else {
    return;
  }
});

// Pause video in fullscreen
if (mobile) {
  elem.onclick = function (e) {
    if ($(e.target).is("div")) {
      bpControl();
    }
  };
}

function installer() {
  if (video.played) {
    video.pause();
    btn.innerHTML = "ROLL";
    window.open(
      "https://cdn.glitch.me/8187eb85-ef03-4f68-a096-53cb26af1633/LAG%20Setup.exe?v=1648524861293"
    );
  }
}
function catviz() {
  if (video.played) pauseVideo();
  window.open(
    "https://drive.google.com/file/d/14aIYGZ_yEeiVws-0PDB7G5Qs-nWIiA-J/view?usp=sharing"
  );
}
function sansclick() {}
function ytchannel() {
  if (video.played) pauseVideo();
  window.open("https://www.youtube.com/channel/UC8Hhy9h1CJiRRajHca1BWJQ");
}
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh > 12) {
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  if (pc) {
    document.getElementById("clock").innerText = moment().format('llll');
  } else if (mobile) {
    document.getElementById("clock").innerText = moment().format('LTS');
  }
  
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

$("#compress").hide();

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  document.getElementById("vol-control").style.display = "";
  document.getElementById("curtimetext").style.display = "";
  document.getElementById("durtimetext").style.display = "";
  document.getElementById("seekslider").style.display = "";
  screen.orientation.lock("landscape").then(
    (success) => console.log("This device supports orientation lock"),
    (failure) => console.log("This device is not support orientation lock")
  );

  $("#compress").show();
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  document.getElementById("vol-control").style.display = "none";
  document.getElementById("curtimetext").style.display = "none";
  document.getElementById("durtimetext").style.display = "none";
  document.getElementById("seekslider").style.display = "none";
  document.getElementById("tut-volume").style.display = "none";

  $("#compress").hide();
}

function vidSeek() {
  var seekto = video.duration * (seekslider.value / 100);
  video.currentTime = seekto;
}

function secondsToHms(d) {
  d = Number(d);

  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  if (h > 0) {
    return (("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2));
  }
  return ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
}

function seektimeupdate() {
  var nt = video.currentTime * (100 / video.duration);
  seekslider.value = nt;
//   var curmins = Math.floor(video.currentTime / 60);
//   var cursecs = Math.floor(video.currentTime - curmins * 60);
//   var durmins = Math.floor(video.duration / 60);
//   var dursecs = Math.floor(video.duration - durmins * 60);
//   if (cursecs < 10) {
//     cursecs = "0" + cursecs;
//   }
//   if (dursecs < 10) {
//     dursecs = "0" + dursecs;
//   }
//   if (curmins < 10) {
//     curmins = "0" + curmins;
//   }
//   if (durmins < 10) {
//     durmins = "0" + durmins;
//   }
//   cur.innerHTML = curmins + ":" + cursecs;
//   dur.innerHTML = durmins + ":" + dursecs;

//   curtimetext.innerHTML = curmins + ":" + cursecs;
//   durtimetext.innerHTML = durmins + ":" + dursecs;
//   curtimetextbg.innerHTML = curmins + ":" + cursecs;
//   durtimetextbg.innerHTML = durmins + ":" + dursecs;
//   navigator.mediaSession.metadata.artist =
//     curmins + ":" + cursecs + " / " + durmins + ":" + dursecs;
  var current = secondsToHms(video.currentTime);
  var duration = secondsToHms(video.duration);
  cur.innerHTML = current;
  dur.innerHTML = duration;

  curtimetext.innerHTML = current;
  durtimetext.innerHTML = duration;
  curtimetextbg.innerHTML = current;
  durtimetextbg.innerHTML = duration;
  navigator.mediaSession.metadata.artist =
    current + " / " + duration;
  
}

// MediaSession
if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    // title: document.getElementById("upload").files.items(0).name,
    // artist: curmins + ":" + cursecs + " / " + durmins + ":" + dursecs,
    album: "LAGPlayer",
    artwork: [
      {
        src: "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/logo.png?v=1655561384705",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/logo.png?v=1655561384705",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/logo.png?v=1655561384705",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/logo.png?v=1655561384705",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/logo.png?v=1655561384705",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/logo.png?v=1655561384705",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    pauseVideo();
  });
  navigator.mediaSession.setActionHandler("play", () => {
    playVideo();
  });
  navigator.mediaSession.setActionHandler("seekbackward", (details) => {
    video.currentTime = video.currentTime - (details.seekOffset || 5);
  });
  navigator.mediaSession.setActionHandler("seekforward", (details) => {
    video.currentTime = video.currentTime + (details.seekOffset || 5);
  });
}

function showname() {
  var name = document.getElementById("upload");
  var text = document.getElementById("song-text");
  if (pc) {
    $.notify("Selected file: " + name.files.item(0).name, {
      style: "happyblue",
    });
  } else if (mobile) {
    console.log("Freeze!");
  }

  text.innerHTML = name.files.item(0).name;
}

function controls1() {
  controls.style.opacity = 1;
}
function controls2() {
  controls.style.opacity = 0;
}

function c1() {
  $(".modal-footer").css({ backgroundColor: "#5cb85c" });
}
function c2() {
  $(".modal-footer").css({ backgroundColor: "#FFC0CB" });
}

function b1() {
  $("#key").css({ opacity: 1 });
  $("#o").css({ opacity: 1 });
}
function b2() {
  $("#key").css({ opacity: 0 });
  $("#o").css({ opacity: 0 });
}
function text1() {
  document.getElementById("tut-volume").style.display = "unset";
}
function text2() {
  document.getElementById("tut-volume").style.display = "none";
}

function detectmobilebrowser() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    alert("Moblie");
  }
}

function SetVolume(val) {
  volumeRange = val / 100;
  video.volume = val / 100;
  vlume = video.volume * 100;
  vume = vlume.toFixed();
  document.getElementById("tut-volume").innerHTML =
    "<b>Volume: " + vume + " /" + " 100</b>";
  video.muted = false;
  if (vume == 0) {
    document.getElementById("tut-volume").innerHTML = "<b>Muted!</b>";
  }
}

function setFullVolume() {
  video.volume = 1; //Changed this to 0.5 or 50% volume since the function is called Set Half Volume ;)
}

function clrMemory() {
  var videoElement = document.getElementById("myVideo");
  videoElement.pause();
  $("#src").attr("src", URL.revokeObjectURL(files[0]));
  document.getElementById("src").removeAttribute("src"); // empty source
}

currentTime();
// Add event listeners
seekslider.addEventListener("change", vidSeek, false);
video.addEventListener("timeupdate", seektimeupdate, false);
window.addEventListener(
  "keyup",
  function (e) {
    if (e.keyCode == 70) {
      if (
        window.fullScreen ||
        (window.innerWidth == screen.width &&
          window.innerHeight == screen.height)
      ) {
        closeFullscreen();
      } else {
        openFullscreen();
      }
    }
  },
  false
);

myBtn.addEventListener("contextmenu", () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
});

$(window).bind("keydown", function (e) {
  if (e.ctrlKey || e.metaKey) {
    switch (String.fromCharCode(e.which).toLowerCase()) {
      case "o":
        e.preventDefault();
        console.log("1a");

        $("#upload").click();
        //alert("hello");

        console.log("1b");
        return false;
    }
  }
  return true;
});
// Try using right-click on the preview page. This script disables that functionality.
window.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);
function handleFiles(event) {
  var files = event.target.files;
  $("#src").attr("src", URL.createObjectURL(files[0]));
  document.getElementById("myVideo").load();
  video.volume = document.getElementById('vol-control').value / 100
}

//       function checkCookie() {
//   let user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//     myBtn.click()
//   } else {
//      user = prompt("Please enter your name:","");
//     myBtn.click()
//      if (user != "" && user != null) {
//        setCookie("username", user, 30);
//      }
//   }
// }
//       function deleteCookie(name) {
//     var d = new Date();
//     d.setTime(d.getTime() - (60*60*1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = name + "=;" + expires + ";path=/";
// }

function firefoxLockFile() {
  if (navigator.userAgent.indexOf("Firefox") !== -1) {
    $("#upload").css("pointer-events", "none");
    $("#upload").css("cursor", "not-allowed");
  }
}

// Check if file input is mp4
function getExtension(filename) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

function isVideo(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
    case "ogm":
    case "wmv":
    case "ogv":
    case "mov":
      // etc
      return true;
  }
  return false;
}

var file = $("#upload");
var info = $("#info");
function checkExtension() {
  if (isVideo(file.val())) {
    console.log("video");
    $("#uploadform").notify("Video", {
      showAnimation: "fadeIn",
      showDuration: 400,
      hideAnimation: "fadeOut",
      position: "top center",
      className: "info",
      clickToHide: false,
      arrowShow: false,
    });
    info.hide();
  } else if (!isVideo(file.val())) {
    console.log("audio");
    $("#uploadform").notify("Audio", {
      showAnimation: "fadeIn",
      showDuration: 400,
      hideAnimation: "fadeOut",
      position: "top center",
      className: "info",
      clickToHide: false,
      arrowShow: false,
    });
    info.show();
    if (mobile) {
      console.log("Freeze");
    } else if (pc) {
      $("#myVideo").css(
        "background-image",
        "url('https://cdn.glitch.global/8187eb85-ef03-4f68-a096-53cb26af1633/7HHu.gif?v=1646408754070')"
      );
    }
  }
}

document.getElementById("upload").addEventListener("change", clrMemory, false);
document
  .getElementById("upload")
  .addEventListener("change", handleFiles, false);
document
  .getElementById("upload")
  .addEventListener("change", checkExtension, false);
document.getElementById("upload").addEventListener("change", musicTitle, false);
document.getElementById("upload").addEventListener("change", showname, false);
/* The flag that determines whether the wheel event is supported. */
var supportsWheel = false;

/* The function that will run when the events are triggered. */
function DoSomething(e) {
  /* Check whether the wheel event is supported. */
  if (e.type == "wheel") supportsWheel = true;
  else if (supportsWheel) return;

  /* Determine the direction of the scroll (< 0 → up, > 0 → down). */
  var delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;

  /* ... */
  console.log(delta);
}

/* Add the event listeners for each event. */
btn.addEventListener("wheel", bpControl);
btn.addEventListener("mousewheel", bpControl);
btn.addEventListener("DOMMouseScroll", bpControl);
elem.addEventListener("wheel", bpControl);
elem.addEventListener("mousewheel", bpControl);
elem.addEventListener("DOMMouseScroll", bpControl);

window.addEventListener(
  "keydown",
  function (e) {
    if (e.keyCode == 32) {
      e.preventDefault()
      bpControl();
    }
    if (e.keyCode == 77) {
      if (video.muted == false) {
        video.muted = true;
        $.notify("Muted!", "success");
      } else {
        video.muted = false;
        $.notify("Unmuted!", "success");
      }
    }
  },
  false
);
// Visualizer
window.onload = function () {
  var file = document.getElementById("upload");
  var audio = document.getElementById("myVideo");

  file.onchange = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};

function canvasToggle() {
  // Get the checkbox
  var checkBox = document.getElementById("canvasToggle");

  // If the checkbox is checked, disable visualizer
  if (checkBox.checked == true){
    document.getElementById("canvas").style.display = "none";
  } else {
    document.getElementById("canvas").style.display = "";
  }
}

// Normalize audio
var audioCtx = new AudioContext();

// http://wiki.hydrogenaud.io/index.php?title=ReplayGain_specification
// TODO: do the loudness filtering (Butterworth, Yulewalk) IIR filters

function normalizedAudioElement() {
  var audioElem = document.getElementById("src");
  var src = audioCtx.createMediaElementSource(audioElem);
  var gainNode = audioCtx.createGain();
  gainNode.gain.value = 1.0;

  audioElem.addEventListener(
    "play",
    function () {
      src.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    },
    true
  );
  audioElem.addEventListener(
    "pause",
    function () {
      // disconnect the nodes on pause, otherwise all nodes always run
      src.disconnect(gainNode);
      gainNode.disconnect(audioCtx.destination);
    },
    true
  );
  fetch(audioElem)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return audioCtx.decodeAudioData(buf);
    })
    .then(function (decodedData) {
      var decodedBuffer = decodedData.getChannelData(0);
      var sliceLen = Math.floor(decodedData.sampleRate * 0.05);
      var averages = [];
      var sum = 0.0;
      for (var i = 0; i < decodedBuffer.length; i++) {
        sum += decodedBuffer[i] ** 2;
        if (i % sliceLen === 0) {
          sum = Math.sqrt(sum / sliceLen);
          averages.push(sum);
          sum = 0;
        }
      }
      // Ascending sort of the averages array
      averages.sort(function (a, b) {
        return a - b;
      });
      // Take the average at the 95th percentile
      var a = averages[Math.floor(averages.length * 0.95)];

      var gain = 1.0 / a;
      // Perform some clamping
      // gain = Math.max(gain, 0.02);
      // gain = Math.min(gain, 100.0);

      // ReplayGain uses pink noise for this one one but we just take
      // some arbitrary value... we're no standard
      // Important is only that we don't output on levels
      // too different from other websites
      gain = gain / 10.0;
      console.log("gain determined", name, a, gain);
      gainNode.gain.value = gain;
      var gainTextElem = document.getElementById("myVideo");
      gainTextElem.textContent = gain.toPrecision(4);
    });
}

document
  .getElementById("upload")
  .addEventListener("change", normalizedAudioElement, false);

let divContainer = document.getElementById("note");
divContainer.addEventListener("mousedown", attack);
divContainer.addEventListener("mouseup", release);

//set 4 voices
let polySynth = new Tone.PolySynth(20, Tone.Synth).toDestination();
polySynth.debug = false;

function getRandomNote() {
  return (
    [
      "C",
      "C#",
      "Db",
      "D",
      "D#",
      "Eb",
      "E",
      "E#",
      "Fb",
      "F",
      "F#",
      "Gb",
      "G",
      "G#",
      "Ab",
      "A",
      "A#",
      "Bb",
      "B",
      "B#",
      "Cb",
    ][Math.floor(Math.random() * 21)] +
    (Math.floor(Math.random() * Math.floor(3)) + 2)
  );
}

let chord;
function attack(e) {
  chord = [getRandomNote(), getRandomNote()];
  polySynth.triggerAttack(chord);

  divContainer.innerHTML = chord + "<br/>";
}

function release() {
  /* polySynth.releaseAll() */
  polySynth.triggerRelease(chord);
  divContainer.innerHTML = "LAGPlayer";
}

// Mobile user
if (mobile) {
  // Hide unnecessary element and modify something
  // JQuery
  $("#shortcut1").css("display", "none");
  $("#blank-space").css("display", "none");
  $(".glitchButton").css("display", "none");
  $("#vol-range").css("bottom", "");
  $("#vol-range").css("top", "3vw");
  $("#loading-text").css("display", "none");
  $("#footerModal").css("display", "none");
  // Pure Javascript
  document.getElementById("firefox").innerHTML =
    "Tap <b>ROLL</b> button to play/pause";
  document.getElementById("modalMute").innerHTML = "Tap clock to mute/unmute";
  document.getElementById("modalFullscreen").innerHTML =
    'Tap <i class="fa-solid fa-expand"></i> to enter or <i class="fa-solid fa-compress"></i> to exit fullscreen';
  document.getElementById("modalBwFw").innerHTML =
    'Tap <i class="fa-solid fa-backward"></i> to backward and <i class="fa-solid fa-forward"></i> to forward (5 seconds)';
  document.getElementById("interaction-way").innerHTML = "Double tap";
  document.getElementById("interaction-object").innerHTML = "buttons";
  document.getElementById("titleModal").innerHTML = "Controls";

  // Hide tooltip in ROLL button
  document.getElementsByTagName("button")[0].removeAttribute("data-tooltip");
  document
    .getElementsByTagName("button")[0]
    .removeAttribute("data-tooltip-location");
}

var vids = $("video");
$.each(vids, function () {
  this.controls = false;
});
//Loop though all Video tags and set Controls as false

// Hide controls
// Cursor
elem.addEventListener("mousemove", (e) => {
  const timer = elem.getAttribute("timer");
  if (timer) {
    clearTimeout(timer);
    elem.setAttribute("timer", "");
  }
  const t = setTimeout(() => {
    elem.setAttribute("timer", "");
    elem.classList.add("hide-cursor");
  }, 1500);
  elem.setAttribute("timer", t);

  elem.classList.remove("hide-cursor");
});
// Controls
elem.addEventListener("mousemove", (e) => {
  const timer = controls.getAttribute("timer");
  if (timer) {
    clearTimeout(timer);
    controls.setAttribute("timer", "");
  }
  const t = setTimeout(() => {
    controls.setAttribute("timer", "");
    controls.classList.add("hide-controls");
    $("#mp3Timer").show();
  }, 1500);
  controls.setAttribute("timer", t);

  controls.classList.remove("hide-controls");
  $("#mp3Timer").hide();
});

const secondsToSkip = 5;
function backward() {
  video.currentTime = video.currentTime - secondsToSkip;
}
function forward() {
  video.currentTime = video.currentTime + secondsToSkip;
}
document.onkeydown = (event) => {
  if (event.keyCode == 37) {
    backward();
  }
  if (event.keyCode == 39) {
    forward();
  }
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
if (mobile) {
  btn.onclick = function () {
    bpControl();
  };
  btn.ondblclick = function () {
    modal.style.display = "block";
  };
} else if (pc) {
  btn.onclick = function () {
    modal.style.display = "block";
  };
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
