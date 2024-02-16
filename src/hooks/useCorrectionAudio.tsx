import { useCallback, useContext, useEffect, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { AppStateContext } from '../contexts/AppStateContext';
import postProcessTranscript from './postProcessTranscript';

// const ALPHABET_SIZE = 26;
const ALPHABET_SIZE = 1;

const useCorrectAudio = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [page, setPage] = useState('');
    const { state, dispatch } = useContext(AppStateContext);


    const correctAudio = useCallback((pageId: string, audioBlobUrl: string) => {
        setPage(pageId)
        if (!transcript) return;
        const processedTranscript = postProcessTranscript(transcript);
        const currentLetter = state.currentLetter.toUpperCase();
        const isCorrect = processedTranscript.includes(currentLetter);

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
