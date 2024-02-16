import { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import CustomAudioPlayer from './CustomAudioPlayer';
import { ButtonOrange, ButtonYellow } from '../assets/images';

const AlphabetRecorder = () => {
    const { state } = useAppState();
    const [playingLetter, setPlayingLetter] = useState('');

    const alphabetLines = [
        ['A', 'B', 'C', 'D'],
        ['E', 'F', 'G', 'H', 'I', 'J'],
        ['K', 'L', 'M', 'N', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U', 'V'],
        ['W', 'X', 'Y', 'Z']
    ];

    const handleLetterClick = (letter: string) => {
        setPlayingLetter(letter);
    };

    const handleAudioEnd = () => {
        setPlayingLetter(''); // Reset the letter that was playing
    };

    return (
        <div className="alphabet-recorder font-sans flex flex-col items-center justify-center w-full">
            {alphabetLines.map((line, index) => (
                <div key={index} className="flex flex-wrap justify-center items-center">
                    {line.map((letter) => {
                        const audioURLObject = state.audioURLs.find(audioURL => audioURL.label === letter);
                        const hasAudio = !!audioURLObject;
                        const buttonImage = hasAudio || playingLetter === letter ? ButtonOrange : ButtonYellow;
                        const isCorrect = String(audioURLObject?.isCorrect);
                        const isChecked = state.pageData['pagina1']?.check ?? false;
                        const colorMap: { [key: string]: string } = {
                            true: '#00ff00',
                            false: '#ff0000',
                            default: '#707676',
                        };
                        const audioSrc = audioURLObject?.audioBlobUrl;
                        return (
                            <CustomAudioPlayer key={letter} letter={letter} audioSrc={audioSrc} onAudioEnd={handleAudioEnd}>
                                <button
                                    onClick={() => handleLetterClick(letter)}
                                    className="letter-button m-2 p-2 text-lg bg-cover bg-center bg-no-repeat flex items-center justify-center cursor-pointer font-bold"
                                    style={{ backgroundImage: `url(${buttonImage})`, color: isChecked ? colorMap[isCorrect] || colorMap.default : colorMap.default }}
                                    title={`Click to play ${letter}`}
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
