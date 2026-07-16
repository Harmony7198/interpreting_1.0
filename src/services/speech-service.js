/**
 * src/services/speech-service.js
 */

let recognition = null;
let isRecording = false;

const LANGUAGE_MAP = {
    en: "en-US",
    fr: "fr-FR",
    vi: "vi-VN",
    ja: "ja-JP",
    zh: "zh-CN",
    ko: "ko-KR",
    de: "de-DE",
    es: "es-ES",
    it: "it-IT",
    pt: "pt-PT",
    ru: "ru-RU"
};

function getSpeechRecognition() {

    return (
        window.SpeechRecognition ||
        window.webkitSpeechRecognition
    );

}

function createRecognition(language) {

    const SpeechRecognition =
        getSpeechRecognition();

    if (!SpeechRecognition) {
        throw new Error(
            "This browser does not support Speech Recognition. Please use Google Chrome or Microsoft Edge."
        );
    }

    const engine = new SpeechRecognition();

    engine.lang =
        LANGUAGE_MAP[language] || "en-US";

    engine.continuous = true;

    engine.interimResults = true;

    engine.maxAlternatives = 1;

    return engine;

}

export function startSpeechRecognition({

    language = "en",

    onStart = () => {},

    onResult = () => {},

    onEnd = () => {},

    onError = () => {}

}) {

    if (isRecording) {
        return;
    }

    recognition =
        createRecognition(language);

    let transcript = "";

    recognition.onstart = () => {

        isRecording = true;

        onStart();

    };

recognition.onresult = (event) => {

    let transcript = "";

    let isFinal = false;

    for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
    ) {

        transcript +=
            event.results[i][0].transcript;

        if (event.results[i].isFinal) {
            isFinal = true;
        }

    }

    onResult(transcript, isFinal);

};

    recognition.onerror = (event) => {

        isRecording = false;

        onError(event.error);

    };

    recognition.onend = () => {

        isRecording = false;

        recognition = null;

        onEnd();

    };

    recognition.start();

}

export function stopSpeechRecognition() {

    if (
        recognition &&
        isRecording
    ) {

        recognition.stop();

    }

}

export function isSpeechRecognitionSupported() {

    return Boolean(
        getSpeechRecognition()
    );

}

export function getSupportedLanguages() {

    return Object.keys(
        LANGUAGE_MAP
    );

}