'use strict';

// Check for browser support
var supportMsg = document.getElementById('msg');

if (!'speechSynthesis' in window) {
	supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
}

// Get speech synthesis instance
var synth = window.speechSynthesis;

// Get the 'speak' button
var speakButton = document.querySelector('#button-speak');
// Get the text
var speechMsgInput = document.querySelector('#txt');
// Get the voice select element
var voiceSelect = document.querySelector('#voices');

var voices = [];

// Fetch the list of voices and populate the voice options.
function populateVoiceList() {
  // Fetch the available voices.
  voices = synth.getVoices();

  // remove old options
  voiceSelect.options.length = 0;

  // loop through all the voices and set them as options to the voice selector
  for(var i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

function speak(txt) {
  // Create a new utterance for the specified text and add it to the queue.
  var utterance = new SpeechSynthesisUtterance();
  // Set the text.
  utterance.text = txt;

  // If a voice has been selected, find the voice and set the utterance instance's voice attribute.
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(var i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterance.voice = voices[i];
    }
  }
  // Set the attributes.
  utterance.pitch = 1;
  utterance.rate = 1;

  // Queue utterance
  synth.speak(utterance);
}

// Load voices
populateVoiceList();

// Load the voices asynchronously
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Listen to speak button click
speakButton.onclick = function() {
  var textToSpeak = speechMsgInput.value
  if (textToSpeak.length > 0) {
    console.log('Speak:', textToSpeak)
    speak(textToSpeak);
	}
}