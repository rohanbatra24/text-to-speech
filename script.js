("use strict");

const button = document.getElementById("button");

const audioElement = document.getElementById("audio");

//disable/enable button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "6ce2a050142847f6bb64b1430a9bfdca",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const getJokes = async () => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any");

    const joke = await response.json();

    const text = joke.setup ? `${joke.setup}... ${joke.delivery}` : joke.joke;

    //text to speech
    tellMe(text);

    //disable button
    toggleButton();
  } catch (error) {
    console.log(`error`, error);
  }
};

console.log(`voiceRSS`, VoiceRSS);

//Event listeners

button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
