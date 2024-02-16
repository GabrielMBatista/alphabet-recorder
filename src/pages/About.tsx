import React, { useEffect, useState } from 'react';
import { BackgroundAbbreviations, ButtonRed } from '../assets/images'; // Substitua pelos caminhos corretos de suas imagens
import { useAppState } from '../contexts/AppStateContext';
import RetryMenu from '../components/RetryMenu';
import CustomAudioPlayer from '../components/CustomAudioPlayer';
import HeaderMenu from '../components/HeaderMenu';
import { FaHeadphones } from "react-icons/fa6";
import { BBC, BTS, CNN, DIY, DJ, HBO, MTV, USA, YMCA } from '../assets/sounds';
import useCorrectText from '../hooks/useCorrectionText';

const About: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [isRetryMenuOpen, setIsRetryMenuOpen] = useState(false);
  const [userEntries, setUserEntries] = useState<{ [key: string]: string }>({});
  const { checkAnswers } = useCorrectText();

  const handleCheckClick = () => {
    checkAnswers();
  };

  const abbreviationLines = [
    { name: 'BBC', audioSrc: BBC },
    { name: 'CNN', audioSrc: CNN },
    { name: 'DIY', audioSrc: DIY },
    { name: 'DJ', audioSrc: DJ },
    { name: 'HBO', audioSrc: HBO },
    { name: 'MTV', audioSrc: MTV },
    { name: 'USA', audioSrc: USA },
    { name: 'BTS', audioSrc: BTS },
    { name: 'YMCA', audioSrc: YMCA },
  ];
  console.log('state', state)
  useEffect(() => {
    const allFilled = abbreviationLines.every(abbr => userEntries[abbr.name]);
    setIsRetryMenuOpen(allFilled);
  }, [userEntries, abbreviationLines]);

  const handleInputChange = (abbreviation: string, value: string) => {
    const trimmedValue = value.trim();
    setUserEntries(prevEntries => ({
      ...prevEntries,
      [abbreviation]: trimmedValue,
    }));
    const existingEntryIndex = state.userEntries.findIndex((entry: { abbreviation: string; }) => entry.abbreviation === abbreviation);

    if (existingEntryIndex >= 0) {
      const updatedUserEntries = [...state.userEntries];
      updatedUserEntries[existingEntryIndex] = { abbreviation, userEntry: trimmedValue };
      dispatch({ type: 'UPDATE_USER_ENTRIES', payload: updatedUserEntries });
    } else {
      const newUserEntry = { abbreviation, userEntry: trimmedValue };
      dispatch({ type: 'ADD_USER_ENTRY', payload: newUserEntry });
    }
  };

  return (
    <div className="h-screen w-screen max-w-full max-h-full ">
      <HeaderMenu />
      <div className="flex flex-col h-full overflow-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BackgroundAbbreviations})`,
        }}>
        <div className="h-[6vh] text-white shadow-[5px_5px_8px_rgba(0,0,0,5)] rounded-bl-lg opacity-100" style={{ backgroundColor: 'rgb(255 255 255 / 50%)' }}>
          <h1 className="text-3xl text-red-600 text-center w-full items-center p-2">Listen and write some famous abbreviations</h1>
        </div>
        <div className="w-full p-4 flex justify-center">
          <div className="flex h-3/4 w-2/3 flex-col mt-8">
            <div className="grid grid-cols-2 gap-2 w-full h-full max-w-1xl">
              {abbreviationLines.map((abbr) => (
                <div key={abbr.name} className="relative flex items-center justify-center cursor-pointer font-bold text-xl">
                  <CustomAudioPlayer letter={abbr.name} audioSrc={abbr.audioSrc} onAudioEnd={() => { /* Função  */ }}>
                    <button
                      className="flex items-center justify-center cursor-pointer font-bold text-xl mx-4 mb-2 p-4"
                      title={`Click to play ${abbr.name}`}
                      style={{
                        backgroundImage: `url(${ButtonRed})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '50px',
                        height: '50px',
                        color: '#004165',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FaHeadphones style={{ color: 'white', fontSize: '24px' }} />
                    </button>
                  </CustomAudioPlayer>
                  <input
                    className="h-[40px] w-1/3 text-3xl text-red-600 text-center border-b-2 shadow-[5px_5px_8px_rgba(0,0,0,5)] rounded-lg uppercase"
                    value={userEntries[abbr.name] || ''}
                    onChange={(e) => handleInputChange(abbr.name, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RetryMenu pageId={'pagina2'} handleCheckClick={handleCheckClick} isOpen={isRetryMenuOpen} setIsOpen={setIsRetryMenuOpen} />
    </div>
  );
};

export default About;
