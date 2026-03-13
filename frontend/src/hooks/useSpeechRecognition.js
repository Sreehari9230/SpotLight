import { useRef, useState } from "react";

export const useSpeechRecognition = () => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const recognitionRef = useRef(null);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = true;

        recognition.onstart = () => {
            console.log("🎙 Mic started listening");
            setListening(true);
        };

        recognition.onspeechstart = () => {
            console.log("🗣 Speech detected");
        };

        recognition.onresult = (event) => {
            let interim = "";
            let final = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPiece = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    final += transcriptPiece;
                } else {
                    interim += transcriptPiece;
                }
            }

            console.log("Interim:", interim);
            console.log("Final:", final);

            setTranscript(final || interim);
        };

        recognition.onspeechend = () => {
            console.log("🔇 Speech ended");
        };

        recognition.onend = () => {
            console.log("⏹ Recognition stopped");
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error("❌ Speech recognition error:", event.error);
        };

        recognition.start();

        recognitionRef.current = recognition;
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    return { listening, transcript, startListening, stopListening };
};