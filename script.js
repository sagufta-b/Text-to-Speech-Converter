let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

//Call this function to fill the dropdown
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return; // not ready yet, wait

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });

    speech.voice = voices[0]; // set default voice
}

loadVoices();
window.speechSynthesis.onvoiceschanged = loadVoices;
voiceSelect.addEventListener("change", () => {
    window.speechSynthesis.cancel(); //stops when voice changed
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
// Stop when user clicks or types in textarea with delay
document.querySelector("textarea").addEventListener("click", () => {
    setTimeout(() =>window.speechSynthesis.cancel(), 300);
});

document.querySelector("textarea").addEventListener("keydown", () => {
    setTimeout(() => window.speechSynthesis.cancel(), 300);
});

// Stop button
document.querySelector("#stop-btn").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});

