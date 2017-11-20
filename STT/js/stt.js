'use strict';

// try to get SpeechRecognition
try {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;
}
catch(err) {
  console.error("Starting Web Speech API Error:", err.message);
  var SpeechRecognition = null;
}

// event handler
function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener)
      elem.addEventListener (eventType, handler, false);
  else if (elem.attachEvent)
      elem.attachEvent ('on' + eventType, handler); 
}

// languages
var langs ={
  "Afrikaans": "af-ZA",
  "Bahasa Indonesia": "id-ID",
  "Bahasa Melayu": "ms-MY",
  "Català": "ca-ES",
  "Čeština": "cs-CZ",
  "Dansk": "da-DK",
  "Deutsch": "de-DE",
  "English (Australia)": "en-AU",
  "English (Canada)": "en-CA",
  "English (India)": "en-IN",
  "English (New Zealand)": "en-NZ",
  "English (South Africa)": "en-ZA",
  "English (United Kingdom)": "en-GB",
  "English (United States)": "en-US",
  "Español Argentina": "es-AR",
  "Español Bolivia": "es-BO",
  "Español Chile": "es-CL",
  "Español Colombia": "es-CO",
  "Español Costa Rica": "es-CR",
  "Español Ecuador": "es-EC",
  "Español El Salvador": "es-SV",
  "Español España": "es-ES",
  "Español Estados Unidos": "es-US",
  "Español Guatemala": "es-GT",
  "Español Honduras": "es-HN",
  "Español México": "es-MX",
  "Español Nicaragua": "es-NI",
  "Español Panamá": "es-PA",
  "Español Paraguay": "es-PY",
  "Español Perú": "es-PE",
  "Español Puerto Rico": "es-PR",
  "Español República Dominicana": "es-DO",
  "Español Uruguay": "es-UY",
  "Español Venezuela": "es-VE",
  "Euskara": "eu-ES",
  "Filipino": "fil-PH",
  "Français": "fr-FR",
  "Galego": "gl-ES",
  "Hrvatski": "hr_HR",
  "IsiZulu": "zu-ZA",
  "Íslenska": "is-IS",
  "Italiano (Italia)": "it-IT",
  "Italiano (Svizzera)": "it-CH",
  "Lietuvių": "lt-LT",
  "Magyar": "hu-HU",
  "Nederlands": "nl-NL",
  "Norsk bokmål": "nb-NO",
  "Polski": "pl-PL",
  "Português (Brasil)": "pt-BR",
  "Português (Portugal)": "pt-PT",
  "Română": "ro-RO",
  "Slovenščina": "sl-SI",
  "Slovenčina": "sk-SK",
  "Suomi": "fi-FI",
  "Svenska": "sv-SE",
  "Tiếng Việt": "vi-VN",
  "Türkçe": "tr-TR",
  "Ελληνικά": "el-GR",
  "български": "bg-BG",
  "Pусский": "ru-RU",
  "Српски": "sr-RS",
  "Українська": "uk-UA",
  "한국어": "ko-KR",
  "普通话 (中国大陆)": "cmn-Hans-CN",
  "普通话 (香港)": "cmn-Hans-HK",
  "中文 (台灣)": "cmn-Hant-TW",
  "粵語 (香港)":"yue-Hant-HK",
  "日本語": "ja-JP",
  "हिन्दी": "hi-IN",
  "ภาษาไทย": "th-TH"
};

/**
* Initialize the Speech Recognition functions
* @param {boolean} auto - Automatically start to listen after loading
*/
function startSpeechRecognier(auto){
  // state used to to start and stop the detection
  var state = {
    "listening": false
  };

  var recognizer = new SpeechRecognition();

  // set recognizer to be continuous
  if (recognizer.continuous) {
    recognizer.continuous = true;
  }
  recognizer.interimResults = true; // we want partial result
  recognizer.lang = 'en-US'; // set language
  recognizer.maxAlternatives = 5; // number of alternatives for the recognized text

  recognizer.onstart = function() {
    // listening started
    console.log("onstart");
    document.querySelector('#icon').className = "green-text";
  };

  recognizer.onend = function() {
    // listening ended
    console.log("onend");
    document.querySelector('#icon').className = "red-text";
    if(state.listening) {
      recognizer.start();
    }
  };

  recognizer.onerror = function(error) {
    // an error occurred
    console.log("onerror:", error);
  };

  recognizer.onspeechstart = function() {
    // detected sound that looks like speech
    console.log('onspeechstart: Speech has been detected');
  };

  recognizer.onspeechend = function() {
    // stopped detecting speech
    console.log('onspeechend: Speech has stopped being detected');
  };


  recognizer.onresult = function(event) {
    // got results
    // the event holds the results
    if (typeof(event.results) === 'undefined') {
        //Something went wrong...
        recognizer.stop();
        return;
    }

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if(event.results[i].isFinal) {
        // get all the final detected text into an array
        var finalText = [], list = [], bestResult = "";
        for(var j = 0; j < event.results[i].length; ++j) {
          // how confidente (between 0 and 1) is the service that the translation correct
          var confidence = event.results[i][j].confidence.toFixed(4);
          var transcript = event.results[i][j].transcript;
          list.push({"confidence": confidence, "text":transcript});
        }
        // get the best result baased on the confidence value
        finalText = list;
        bestResult = sortByConfidence(list)[0]

        // send the final results to the page
        showResult(bestResult);
        console.log("Final result:", finalText);
        document.querySelector('#partials').innerHTML = "...";
      } else {
        // got partial result, show them
        document.querySelector('#partials').innerHTML = event.results[i][0].transcript;
        console.log("Partial:", event.results[i][0].transcript, event.results[i].length);
      }
    }
  };

  // start/stop button
  var start = document.querySelector('#button-start');
  var stop = document.querySelector('#button-stop');

  // liste to button click event
  start.onclick = function() {
    try {
      state.listening = true;
      recognizer.start();
      this.className = "";
      stop.className = "button-primary";
    } catch(ex) {
      console.log('Recognition error: ' + ex.message);
    }
  };
  stop.onclick = function () {
    state.listening = false;
    recognizer.stop();
    start.className = "button-primary";
    this.className = "";
  };

  // auto start listening
  if(auto) {
    play.click();
  }

  // add change listener to update language
  var select = document.querySelector("#langs");
  addEventHandler(select, 'change', function() {
    recognizer.lang = this.value;
    console.log('Language changed to:', this.value);
  });
}

/**
* Add the results to the page.
* @param {string} result - The results to show.
*/
function showResult(result) {
  // show the result in the page
  var finals = document.querySelector('#finals');
  finals.innerHTML += '<li>' + result + '</li>';
  // scroll to bottom after adding the text
  finals.scrollTop = finals.scrollHeight;
}

/**
* Load the languages into the select options.
*/
function loadLanguages() {
  // add the languages to the page
  var select = document.querySelector("#langs");
  for (var lang in langs) {
    if (langs.hasOwnProperty(lang)) {
      var option = document.createElement("option");
      if(lang == "English (United States)") option.selected = true;
      option.text = lang;
      option.value = langs[lang];
      select.add(option);
    }
  }
}

/**
* Returns an list ordered by confidence values, descending order.
* @param {array} list - A list of objects containing the confidence and transcript values.
* @return array - Ordered list
*/
function sortByConfidence(list) {
  list.sort(function(a, b) {
    return a.confidence - b.confidence;
  }).reverse();
  var sortedResult = list.map(function(obj) {
    return obj.text;
  });
  return sortedResult;
}

// ----------------- INIT -------------------------

/**
* Call to initialize SpeechRecognition if supported.
*/
function init() {
  // initialize speechRecognition if supported
  if(SpeechRecognition === null){
    alert("Web Speech API is not supported. Try this in https://www.google.co.uk/intl/en/chrome/browser/canary.html");
  } else {
    startSpeechRecognier(false);
  }
}

window.addEventListener('load', function() {
  loadLanguages();
  init();
}, false);