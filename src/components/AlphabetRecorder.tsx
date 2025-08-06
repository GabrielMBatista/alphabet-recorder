import { useState } from "react";
import { useAppState } from "../contexts/AppStateContext";
import CustomAudioPlayer from "./CustomAudioPlayer";
import { ButtonOrange, ButtonYellow } from "../assets/images";
import { getLetterMapping } from "../utils/resolutions";

const AlphabetRecorder = () => {
  const { state } = useAppState();
  const [playingLetter, setPlayingLetter] = useState("");

  // Obtenha as linhas do alfabeto de acordo com a resolução
  const alphabetLines = getLetterMapping().rows;

  const handleLetterClick = (letter: string) => {
    setPlayingLetter(letter);
  };

  const handleAudioEnd = () => {
    setPlayingLetter("");
  };

  return (
    <div
      className="alphabet-recorder font-sans flex flex-col items-center justify-center w-full"
      style={{ overflowY: "auto" }}
    >
      {alphabetLines.map((line, index) => (
        <div key={index} className="flex flex-wrap justify-center items-center">
          {line.map((letter) => {
            const audioURLObject = state.audioURLs.find(
              (audioURL) => audioURL.label === letter.letter
            );
            const hasAudio = !!audioURLObject;
            const buttonImage =
              hasAudio || playingLetter === letter.letter
                ? ButtonOrange
                : ButtonYellow;
            const isCorrect = String(audioURLObject?.isCorrect);
            const isChecked = state.pageData["pagina1"]?.check ?? false;
            const colorMap: { [key: string]: string } = {
              true: "#00ff00",
              false: "#ff0000",
              default: "#707676",
            };
            const audioSrc = audioURLObject?.audioBlobUrl;
            return (
              <CustomAudioPlayer
                key={letter.letter}
                letter={letter.letter}
                audioSrc={audioSrc}
                onAudioEnd={handleAudioEnd}
              >
                <button
                  onClick={() => handleLetterClick(letter.letter)}
                  className="letter-button m-2 p-2 text-lg bg-cover bg-center bg-no-repeat flex items-center justify-center cursor-pointer font-bold"
                  style={{
                    backgroundImage: `url(${buttonImage})`,
                    color: isChecked
                      ? colorMap[isCorrect] || colorMap.default
                      : colorMap.default,
                  }}
                  title={`Click to play ${letter.letter}`}
                >
                  {letter.letter}
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
