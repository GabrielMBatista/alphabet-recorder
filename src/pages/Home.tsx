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
        <div className="flex flex-1  overflow-auto" style={{ background: 'linear-gradient(5deg, #34f1fe 5%, #39aacf 90%)' }}>
          <div className="w-2/6 p-4 flex items-center" >
            <div className="p-4" style={{
              minHeight: '50vh',
              minWidth: '60vw',
              backgroundImage: `url(${RecordCard})`,
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
              <div className="text-white text-3xl p-7 flex-1  w-2/3" style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div>
                  Click on the buttons on the side <img src={ButtonYellow} alt="Button" style={{ height: '4vh', width: '4vw', display: 'inline-block', verticalAlign: 'middle', margin: '10px 0' }} /> and listen to the letter in English, and repeat by recording your voice by clicking the button <img src={ButtonMic} alt="Button" style={{ height: '4vh', width: '4vw', display: 'inline-block', verticalAlign: 'middle', margin: '10px 0' }} /> below
                </div>
              </div>
              <div className="w-5/6 h-3/6 flex items-start justify-start font-bold text-2xl  p-7">
                <AudioRecorder pageId={'pagina1'} letter={state.currentLetter} />
              </div>
            </div>
          </div>
          <div className="w-4/6 p-4 flex justify-end" style={{
            backgroundImage: `url(${BackgroundLetters})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          >
            <AlphabetRecorder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
