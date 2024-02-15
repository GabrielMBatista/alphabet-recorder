import React, { useRef, useState } from 'react';
import { FaExclamation, FaQuestion } from 'react-icons/fa6';
import { PiMusicNotesFill, PiSpeakerLowBold } from 'react-icons/pi';
import CustomTip from './CustomTip';
type TipType = 'notes' | 'speaker' | 'exclamation' | 'question';


interface HeaderMenuProps {
}

const HeaderMenu: React.FC<HeaderMenuProps> = () => {
  // Refs for each tip button
  const notesRef = useRef(null);
  const speakerRef = useRef(null);
  const exclamationRef = useRef(null);
  const questionRef = useRef(null);

  // State to manage which tip is open
  const [tipsOpen, setTipsOpen] = useState<{ [key in TipType]: boolean }>({
    notes: false,
    speaker: false,
    exclamation: false,
    question: false,
  });

  // Function to toggle tip visibility
  const toggleTip = (type: TipType) => {
    setTipsOpen(prev => {
      if (prev[type]) {
        return { ...prev, [type]: false };
      } else {
        const updatedTips: { [key in TipType]: boolean } = {
          notes: false,
          speaker: false,
          exclamation: false,
          question: false
        };
        Object.keys(prev).forEach(key => {
          updatedTips[key as TipType] = key === type;
        });
        return updatedTips;
      }
    });
  };

  return (
    <>
      <div className="bg-[#38a5c8] text-white w-full flex justify-between items-center px-4 py-3 border-b-2 border-white h-[10vh] shadow-[0_8px_8px_rgba(255,255,255,0.5)] z-20">
        <h1 className="text-3xl font-bold">Unit 1- Introduce yourself/ The alphabet in English</h1>
        <div className="mr-4 w-48 flex justify-between items-center ">
          <div ref={notesRef} className="bg-white text-[#004165]/75 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          //  onClick={() => toggleTip('notes')}
          >
            <PiMusicNotesFill />
          </div>
          <div ref={speakerRef} className="bg-white text-[#004165]/75 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          // onClick={() => toggleTip('speaker')}
          >
            <PiSpeakerLowBold />
          </div>
          <div ref={exclamationRef} className="bg-white text-[#004165]/75 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" onClick={() => toggleTip('exclamation')}>
            <FaExclamation />
          </div>
          <div ref={questionRef} className="bg-white text-[#004165]/75 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" onClick={() => toggleTip('question')}>
            <FaQuestion />
          </div>
        </div>
      </div>
      <CustomTip isOpen={tipsOpen.notes} type={'notes'} buttonRef={notesRef} setIsOpen={() => setTipsOpen({ ...tipsOpen, notes: false })} />
      <CustomTip isOpen={tipsOpen.speaker} type={'speaker'} buttonRef={speakerRef} setIsOpen={() => setTipsOpen({ ...tipsOpen, speaker: false })} />
      <CustomTip isOpen={tipsOpen.exclamation} type={'exclamation'} buttonRef={exclamationRef} setIsOpen={() => setTipsOpen({ ...tipsOpen, exclamation: false })} />
      <CustomTip isOpen={tipsOpen.question} type={'question'} buttonRef={questionRef} setIsOpen={() => setTipsOpen({ ...tipsOpen, question: false })} />
    </>
  );
};

export default HeaderMenu;
