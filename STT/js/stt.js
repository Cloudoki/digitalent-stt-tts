'use strict';

// try and define to get SpeechRecognition
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

function startSpeechRecognier(auto){
  // state used to to start and stop the detection
  var state = {
    "listening": false
  };

  // ## Initialize recognizer


  // ## recognizer settings
  

  // ## recognizer functionality
  

  // ## Interactions
  
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