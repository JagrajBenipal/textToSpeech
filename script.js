const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/happyBirthday.png",
    text: "Wrapped Gift",
  },
  {
    image: "./img/netflix.png",
    text: "Netflix",
  },
  {
    image: "./img/happyMusic.png",
    text: "Happy Music",
  },
  {
    image: "./img/podcast.png",
    text: "Podcast",
  },
  {
    image: "./img/electricCar.png",
    text: "Electric Car",
  },
  {
    image: "./img/snowman.png",
    text: "Snowman",
  },
  {
    image: "./img/teacher.png",
    text: "Teacher",
  },

  {
    image: "./img/relaxing.png",
    text: "Relaxing",
  },
  {
    image: "./img/yacht.png",
    text: "Yacht",
  },
  {
    image: "./img/camping.png",
    text: "Camping",
  },
  {
    image: "./img/breakfast.png",
    text: "Breakfast",
  },
  {
    image: "./img/doctor.png",
    text: "Doctor",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", buttonReader);
window.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    buttonReader();
  }
});

function buttonReader() {
  setTextMessage(textarea.value);
  speakText();
}

getVoices();
