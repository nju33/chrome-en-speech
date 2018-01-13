let voice;

function getVoice() {
  return window.speechSynthesis.getVoices()
    .find(voice => voice.name === 'Google US English');
}

window.speechSynthesis.onvoiceschanged = () => {
  voice = getVoice();
};

chrome.omnibox.onInputStarted.addListener(() => {
  voice = getVoice();
});

chrome.omnibox.onInputEntered.addListener(text => {
  const uttr = new window.SpeechSynthesisUtterance();
  uttr.text = text;
  uttr.voice = voice;
  window.speechSynthesis.speak(uttr);
});
