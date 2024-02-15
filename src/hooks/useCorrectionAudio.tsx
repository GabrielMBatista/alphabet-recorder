import { useCallback, useContext, useEffect, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { AppStateContext } from '../contexts/AppStateContext';
import postProcessTranscript from './postProcessTranscript';
// import postProcessTranscript from './postProcessTranscript';

// const ALPHABET_SIZE = 26;
const ALPHABET_SIZE = 1;

const useCorrectAudio = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [page, setPage] = useState('');
    const { state, dispatch } = useContext(AppStateContext);

    // const analyzeTranscript = (transcript: string) => {
    //     // Example function to demonstrate post-processing
    //     // This could be a place to implement a basic mapping or analysis,
    //     // such as searching for specific phonetic patterns or sounds in the text.
    //     console.log("Original Transcript: ", transcript);

    //     // Simple example: Extract vowels from the transcript
    //     const vowels = transcript.match(/[aeiou]/gi) || [];
    //     console.log("Extracted Vowels: ", vowels.join(''));
    // };

    const correctAudio = useCallback((pageId: string, audioBlobUrl: string) => {
        setPage(pageId)
        if (!transcript) return;
        // analyzeTranscript(transcript)
        const processedTranscript = postProcessTranscript(transcript);
        console.log('transcript', transcript)
        console.log('processedTranscript', processedTranscript)
        const currentLetter = state.currentLetter.toUpperCase();
        const isCorrect = processedTranscript.includes(currentLetter);
        // const isCorrect = currentLetter === transcript;

        dispatch({ type: 'SET_AUDIO_URL', payload: { label: currentLetter, audioBlobUrl, isCorrect } });

        resetTranscript();
    }, [transcript, state.currentLetter, dispatch, resetTranscript]);

    const calculatePoints = useCallback(() => {
        if (state.audioURLs.length === ALPHABET_SIZE) {
            const correct = state.audioURLs.filter(url => url.isCorrect).length;
            const accuracy = (correct / ALPHABET_SIZE) * 100;

            let points = 0;
            if (accuracy === 100) {
                points = 10;
            } else if (accuracy >= 60) {
                points = 5;
            }
            dispatch({
                type: 'SET_PAGE_DATA',
                payload: {
                    pageId: page,
                    data: {
                        isCorrected: true,
                        score: points,
                        check: false,
                    },
                },
            });
        }
    }, [state.audioURLs, dispatch]);

    useEffect(() => {
        calculatePoints();
    }, [state.audioURLs, calculatePoints]);

    return { correctAudio, resetTranscript };
};

export default useCorrectAudio;
