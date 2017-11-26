var breakMins = 5;
var sessionMins = 25;
var secs = 60 * sessionMins;
var timeLeft = sessionMins;
var ticToc = false;
var id = "session:";

function timeRemaining(t) {
  t = Number(t);
  var h = Math.floor(t / 3600);
  var m = Math.floor(t % 3600 / 60);
  var s = Math.floor(t % 3600 % 60);
  return (
    (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
  );
}

function sessionLength(time) {
  if (!ticToc) {
    if (id === 'session:') {
      sessionMins += time;
      if (sessionMins < 1) {
        sessionMins = 1;
      }
      document.getElementById("session").innerHTML = sessionMins;
      secs = 60 * sessionMins;
      timeLeft = timeRemaining(secs);
      document.getElementById("ticker").innerHTML = timeLeft;

    }
  }
}

function breakLength(time) {
  if (!ticToc) {
    breakMins += time;
    if (breakMins < 1) {
      breakMins = 1;
    }
    document.getElementById("break").innerHTML = breakMins;
    if (id === 'break!') {
      secs = 60 * breakMins;
      timeLeft = timeRemaining(secs);
      document.getElementById("ticker").innerHTML = timeLeft;
    }
  }
}

function toggleTicToc() {
  if (!ticToc) {
    updateTicker();
    ticToc = setInterval(updateTicker, 1000);
  } else {
    clearInterval(ticToc);
    ticToc = false;
  }
}

function updateTicker() {
  secs -= 1;
  if (secs < 0) {
    var audio = new Audio('https://www.freesfx.co.uk/rx2/mp3s/9/10604_1376407711.mp3');
    audio.play();
    
     if (id === 'break!') {
        id = 'session:';
        timeLeft = 60 * sessionMins;
        secs = 60 * sessionMins;
      } else {
        id = 'break!';
        timeLeft = 60 * breakMins;
        secs = 60 * breakMins;
      }
document.getElementById("id").innerHTML = id;
  } else {
    timeLeft = timeRemaining(secs);
    document.getElementById("ticker").innerHTML = timeLeft;
  }
}

function resetTicker() {
  clearInterval(ticToc);
  ticToc = false;
  id = 'session:'
  secs = sessionMins * 60;
  timeLeft = timeRemaining(secs);
  document.getElementById("ticker").innerHTML = timeLeft;
  document.getElementById("id").innerHTML = id;    
}

resetTicker();
document.getElementById("id").innerHTML = id;
document.getElementById("session").innerHTML = sessionMins;
document.getElementById("break").innerHTML = breakMins;