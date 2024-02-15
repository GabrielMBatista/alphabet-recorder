import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import { ButtonMic, ButtonMicOn } from '../assets/images';
import useCorrectAudio from '../hooks/useCorrectionAudio'; // Verifique o caminho
import useSimpleAudioRecognition from '../hooks/useSimpleAudioRecognition'; // Verifique o caminho
import SvgComponent from './SvgComponent';

interface AudioRecorderProps {
    pageId: string;
    letter: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ pageId, letter }) => {
    const { transcript, startListening, stopListening, resetTranscript } = useSimpleAudioRecognition();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioLevel, setAudioLevel] = useState<number>(0);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const { correctAudio } = useCorrectAudio();
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // useEffect para controle da gravação e reconhecimento de voz
    useEffect(() => {
        if (isRecording) {
            startListening();
        } else {
            stopListening();
            if (transcript) {
                correctAudio(pageId, audioUrl);
            }
            resetTranscript();
        }
    }, [isRecording, startListening, stopListening, resetTranscript, transcript, correctAudio, audioUrl]);

    // useEffect dedicado para análise volume de áudio
    useEffect(() => {
        const startAudioAnalysis = () => {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
                audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                analyser.fftSize = 2048;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                intervalId = setInterval(() => {
                    if (analyser) {
                        analyser.getByteTimeDomainData(dataArray);
                        let sum = 0;
                        for (let i = 0; i < bufferLength; i++) {
                            const x = dataArray[i] / 128.0 - 1.0;
                            sum += x * x;
                        }
                        const rms = Math.sqrt(sum / bufferLength);
                        const level = Math.min(12, Math.floor(rms * 100));
                        setAudioLevel(level);
                    }
                }, 100);
            }).catch(error => {
                console.error('Error accessing the microphone', error);
            });
        };

        const stopAudioAnalysis = () => {
            if (intervalId) clearInterval(intervalId);
            if (audioContext) {
                audioContext.close().then(() => {
                    audioContext = null;
                    analyser = null;
                    microphone = null;
                });
            }
            setAudioLevel(0);
        };

        if (isRecording) {
            startAudioAnalysis();
        } else {
            stopAudioAnalysis();
        }

        return () => {
            stopAudioAnalysis();
        };
    }, [isRecording]);

    const toggleRecording = () => {
        setIsRecording(isRecording ? false : true);
    };

    const onStop = (recordedBlob: { blobURL: string }) => {
        setAudioUrl(recordedBlob.blobURL);
    };

    return (
        <div className={`w-4/6 h-50 flex flex-row items-center`}>
            <div hidden>
                <ReactMic
                    record={isRecording}
                    onStop={onStop}
                // noiseSuppression={true}
                />
            </div>
            <button
                onClick={toggleRecording}
                className={`flex items-center justify-center cursor-pointer font-bold text-2xl`}
                title={`Click to record ${letter}`}
                style={{
                    backgroundImage: `url(${!isRecording ? ButtonMic : ButtonMicOn})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100px',
                    height: '90px',
                    color: '#004165',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
            <div style={{
                width: '55%',
                height: '40%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <SvgComponent activeNumber={audioLevel} />
            </div>
        </div>
    );
};

export default AudioRecorder;
