import { useCallback, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSimpleAudioRecognition = () => {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);

    const startListening = useCallback(() => {
        if (!listening) {
            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
            setIsListening(true);
        }
    }, [listening]);

    const stopListening = useCallback(() => {
        if (listening) {
            SpeechRecognition.stopListening();
            setIsListening(false);
        }
    }, [listening]);



    return { transcript, startListening, stopListening, isListening, resetTranscript };
};

export default useSimpleAudioRecognition;



