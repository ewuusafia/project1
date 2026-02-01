"use strict";

// Cache screen elements
const screens = {
  landing: document.getElementById("landingScreen"),
  permission: document.getElementById("permissionScreen"),
  listening: document.getElementById("listeningScreen"),
  result: document.getElementById("resultScreen"),
  end: document.getElementById("endScreen"),
};

// Buttons & text elements
const startBtn = document.getElementById("startBtn");
const allowMicBtn = document.getElementById("allowMicBtn");
const continueBtn = document.getElementById("continueBtn");
const restartBtn = document.getElementById("restartBtn");

const micErrorEl = document.getElementById("micError");
const listeningTextEl = document.getElementById("listeningText");

// Listening text sequence
const listeningMessages = [
  "Hmm… sun rahi hoon 👂",
  "Acha… interesting 😏",
  "Tum thori zyada cute awaaz mein baat karti ho ya mujhe lag raha hai?",
  "Bas aik sentence bolo:\n‘Main bilkul innocent hoon’ 😇",
];

// Timers for sequence
let listeningTimeoutId = null;
let resultTimeoutId = null;

/* ------------ Screen handling ------------ */

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    if (key === name) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function resetTimers() {
  if (listeningTimeoutId) {
    clearTimeout(listeningTimeoutId);
    listeningTimeoutId = null;
  }
  if (resultTimeoutId) {
    clearTimeout(resultTimeoutId);
    resultTimeoutId = null;
  }
}

/* ------------ Microphone handling ------------ */

function requestMicrophone() {
  micErrorEl.classList.add("hidden");
  micErrorEl.textContent = "";

  // Basic feature detection
  if (
    !navigator.mediaDevices ||
    typeof navigator.mediaDevices.getUserMedia !== "function"
  ) {
    micErrorEl.textContent =
      "Lagta hai tumhara browser mic support nahi karta 😅\n" +
      "Latest Chrome / Edge / Firefox try karo, ya HTTPS pe open karo.";
    micErrorEl.classList.remove("hidden");
    allowMicBtn.disabled = true;
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // We only needed permission; stop tracks immediately.
      stream.getTracks().forEach((track) => track.stop());

      // Move to fake listening phase
      startListeningPhase();
    })
    .catch((err) => {
      console.error("Microphone error:", err);
      micErrorEl.textContent =
        "Mic ke bina maza nahi aata 😔\nRetry karo?";
      micErrorEl.classList.remove("hidden");
    });
}

/* ------------ Timing helper for messages ------------ */

/**
 * Har message kitni der screen pe rehna chahiye:
 * - Chota text: ~2 seconds
 * - Lamba text: length ke hisaab se extra time
 */
function getDisplayDuration(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const len = cleaned.length;

  const base = 2000;      // minimum 2 seconds
  const threshold = 35;   // itne characters tak sirf base time
  const extraPerChar = 60; // threshold ke baad har char pe 60ms extra
  const max = 6000;       // max 6 seconds tak cap

  if (len <= threshold) return base;

  const extra = (len - threshold) * extraPerChar;
  return Math.min(base + extra, max);
}

/* ------------ Fake listening flow ------------ */

function startListeningPhase() {
  resetTimers();
  showScreen("listening");
  showListeningMessage(0);
}

function showListeningMessage(index) {
  listeningTextEl.textContent = listeningMessages[index];

  const isLast = index === listeningMessages.length - 1;
  const duration = getDisplayDuration(listeningMessages[index]);

  if (!isLast) {
    // Current message ke length ke hisaab se next message delay
    listeningTimeoutId = setTimeout(() => {
      showListeningMessage(index + 1);
    }, duration);
  } else {
    // Last line: pehle padhne ka time, phir thoda extra "bolne" ka time
    resultTimeoutId = setTimeout(() => {
      showResultScreen();
    }, duration + 2000); // reading time + 2s extra
  }
}

function showResultScreen() {
  resetTimers();
  showScreen("result");
}

/* ------------ Restart logic ------------ */

function restartApp() {
  resetTimers();
  micErrorEl.textContent = "";
  micErrorEl.classList.add("hidden");
  allowMicBtn.disabled = false;

  showScreen("landing");
}

/* ------------ Event listeners ------------ */

// 1️⃣ Landing -> Permission
startBtn.addEventListener("click", () => {
  showScreen("permission");
});

// 2️⃣ Permission -> Request mic
allowMicBtn.addEventListener("click", () => {
  requestMicrophone();
});

// 4️⃣ Result -> End screen
continueBtn.addEventListener("click", () => {
  showScreen("end");
});

// 5️⃣ End -> Restart
restartBtn.addEventListener("click", () => {
  restartApp();
});