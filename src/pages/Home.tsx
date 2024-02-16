import React, { useEffect, useState } from 'react';
import { BackgroundLetters, ButtonMic, ButtonYellow, RecordCard } from '../assets/images';
import AlphabetRecorder from '../components/AlphabetRecorder';
import AudioRecorder from '../components/AudioRecorder';
import { useAppState } from '../contexts/AppStateContext';
import RetryMenu from '../components/RetryMenu';
import HeaderMenu from '../components/HeaderMenu';

const Home: React.FC = () => {
  const { state } = useAppState();
  const [isRetryMenuOpen, setIsRetryMenuOpen] = useState(false);
  console.log('state', state)
  // Verifica se todas as letras foram tentadas e corrigidas
  useEffect(() => {
    const allLettersAttempted = state.audioURLs.length === 1; // Assumindo 26 letras no alfabeto
    const allLettersCorrected = state.audioURLs.every(audioURL => audioURL.isCorrect !== null);
    if (allLettersAttempted && allLettersCorrected) {
      setIsRetryMenuOpen(true);
    }
  }, [state.audioURLs]);


  return (
    <div className=" flex h-screen w-screen max-w-full flex-col  overflow-hidden">
      <div className={`fixed bottom-24 right-0 z-50 ${isRetryMenuOpen ? 'hidden' : 'block'}`}>
        <button
          className="mr-4 mt-4 text-2xl text-blue-600"
          onClick={() => setIsRetryMenuOpen(!isRetryMenuOpen)}
        >
        </button>
      </div>
      <RetryMenu pageId={'pagina1'} isOpen={isRetryMenuOpen} setIsOpen={setIsRetryMenuOpen} />
      <div className="flex flex-1 flex-col">
        <HeaderMenu />
        <div className="flex flex-1 flex-container" >
          <div className="flex-container-svg" >
            <div className="alphabet-container"
            >
              <AlphabetRecorder />
            </div>
          </div>
          <div className="record-card-container">
            <div className='card-content'>
              Click on the buttons on the side
              <img src={ButtonYellow} alt="Button" className="inline-block h-10 w-10 align-middle mx-2" />
              and listen to the letter in English, and repeat by recording your voice by clicking the button
              <img src={ButtonMic} alt="Button" className="inline-block h-10 w-10 align-middle " />
              below
            </div>
            <div className="flex items-start justify-start font-bold text-2xl mb-2">
              <AudioRecorder pageId={'pagina1'} letter={state.currentLetter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
