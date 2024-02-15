import { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import CustomAudioPlayer from './CustomAudioPlayer';
import { ButtonOrange, ButtonYellow } from '../assets/images';

const AlphabetRecorder = () => {
    const { state } = useAppState();
    const [playingLetter, setPlayingLetter] = useState('');


    const alphabetLines = [
        ['A', 'B', 'C', 'D'],     // 4 letras, primeira linha
        ['E', 'F', 'G', 'H', 'I', 'J'], // 6 letras
        ['K', 'L', 'M', 'N', 'O', 'P'], // 6 letras
        ['Q', 'R', 'S', 'T', 'U', 'V'], // 6 letras
        ['W', 'X', 'Y', 'Z']     // 4 letras, última linha
    ];

    const handleLetterClick = (letter: string) => {
        setPlayingLetter(letter);
    };

    const handleAudioEnd = () => {
        setPlayingLetter(''); // Reseta a letra que estava tocando
    };

    return (
        <div className="font-sans flex flex-col justify-center items-center ">
            {alphabetLines.map((line, index) => (
                <div key={index} className="flex justify-center items-center p-5 mx-2">
                    {line.map((letter) => {
                        // Encontra o áudio registrado para a letra, se houver
                        const audioURLObject = state.audioURLs.find(audioURL => audioURL.label === letter);
                        const hasAudio = !!audioURLObject;

                        const isCorrect = String(audioURLObject?.isCorrect);
                        const isChecked = state.pageData['pagina1']?.check ?? false;
                        const colorMap: { [key: string]: string } = {
                            true: '#00ff00',
                            false: '#ff0000',
                        };

                        const audioSrc = audioURLObject?.audioBlobUrl; // Usado somente se hasAudio for verdadeiro
                        // Define a cor do botão com base na presença do áudio e na letra sendo tocada
                        const buttonImage = hasAudio || playingLetter === letter ? ButtonOrange : ButtonYellow;

                        return (
                            <CustomAudioPlayer key={letter} letter={letter} audioSrc={audioSrc} onAudioEnd={handleAudioEnd}>
                                <button
                                    onClick={() => handleLetterClick(letter)}
                                    className="relative flex items-center justify-center cursor-pointer font-bold text-4xl mx-4 mb-1"
                                    title={`Click to play ${letter}`}
                                    style={{
                                        backgroundImage: `url(${buttonImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        width: '80px',
                                        height: '70px',
                                        color: `${isChecked ? colorMap[isCorrect] : '#707676'} `,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {letter}
                                </button>
                            </CustomAudioPlayer>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default AlphabetRecorder;
