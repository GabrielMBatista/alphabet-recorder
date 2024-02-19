import React, { useEffect, useState } from 'react';
import { BackgroundAbbreviations, ButtonRed } from '../assets/images'; // Substitua pelos caminhos corretos de suas imagens
import { useAppState } from '../contexts/AppStateContext';
import RetryMenu from '../components/RetryMenu';
import CustomAudioPlayer from '../components/CustomAudioPlayer';
import HeaderMenu from '../components/HeaderMenu';
import { FaHeadphones } from "react-icons/fa6";
import { BBC, BTS, CNN, DIY, DJ, HBO, MTV, USA, YMCA } from '../assets/sounds';
import useCorrectText from '../hooks/useCorrectionText';

const Page2: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [isRetryMenuOpen, setIsRetryMenuOpen] = useState(false);
  const [userEntries, setUserEntries] = useState<{ [key: string]: string }>({});
  const [activeItem, setActiveItem] = useState<string>('');
  const { checkAnswers } = useCorrectText();

  const handleCheckClick = () => {
    checkAnswers();
  };

  const handleAudioEnd = () => {
    setActiveItem(''); // 
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
  useEffect(() => {
    const allFilled = abbreviationLines.every(abbr => userEntries[abbr.name]);
    setIsRetryMenuOpen(allFilled);
  }, [userEntries, abbreviationLines]);


  const resetLocalState = () => {
    setUserEntries({});
    // Qualquer outro estado que precise ser limpo
  };
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
        <div className="page-container">
          <h1 className="page-title">Listen and write some famous abbreviations</h1>
          <div className="abbreviation-grid-container">
            {abbreviationLines.map((abbr) => (
              <div key={abbr.name} className="abbreviation-item">
                <CustomAudioPlayer
                  letter={abbr.name}
                  audioSrc={abbr.audioSrc}
                  onAudioEnd={handleAudioEnd}
                >
                  <button className="audio-player-button" onClick={() => setActiveItem(abbr.name)}>
                    <FaHeadphones className='audio-icon-button' color={activeItem === abbr.name ? "green" : "white"} />
                  </button>
                </CustomAudioPlayer>
                <input
                  className="abbreviation-input text-transform: uppercase rounded-lg"
                  value={userEntries[abbr.name] || ''}
                  onChange={(e) => handleInputChange(abbr.name, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
      <RetryMenu onReset={resetLocalState} pageId={'pagina2'} handleCheckClick={handleCheckClick} isOpen={isRetryMenuOpen} setIsOpen={setIsRetryMenuOpen} />
    </div>
  );
};

export default Page2;
