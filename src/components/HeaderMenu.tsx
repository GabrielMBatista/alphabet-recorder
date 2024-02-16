import React, { useRef, useState } from 'react';
import { FaExclamation, FaQuestion } from 'react-icons/fa6';
import { PiMusicNotesFill, PiSpeakerLowBold } from 'react-icons/pi';
import CustomTip from './CustomTip';
type TipType = 'notes' | 'speaker' | 'exclamation' | 'question';

const HeaderMenu: React.FC = () => {
  const [tipsOpen, setTipsOpen] = useState<{ [key in TipType]: boolean }>({
    notes: false,
    speaker: false,
    exclamation: false,
    question: false,
  });
  // Refs for each tip button
  const notesRef = useRef<HTMLDivElement>(null);
  const speakerRef = useRef<HTMLDivElement>(null);
  const exclamationRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const toggleTip = (type: TipType) => {
    setTipsOpen(prev => ({
      ...prev,
      [type]: !prev[type],
      ...(Object.keys(prev).filter(k => k !== type) as TipType[]).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
    }));
  };

  return (
    <>
      <div className="bg-[#38a5c8] text-white w-full flex flex-wrap justify-between items-center px-4 py-3 border-b-2 border-white shadow-[0_8px_8px_rgba(255,255,255,0.5)] z-20">
        <h1 className="text-xl md:text-3xl font-bold flex-1">Unit 1- Introduce yourself/ The alphabet in English</h1>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end items-center mt-2 md:mt-0">
          <div ref={notesRef} className="bg-white text-[#004165]/75 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer" >
            <PiMusicNotesFill />
          </div>
          <div ref={speakerRef} className="bg-white text-[#004165]/75 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer" >
            <PiSpeakerLowBold />
          </div>
          <div ref={exclamationRef} className="bg-white text-[#004165]/75 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer" onClick={() => toggleTip('exclamation')}>
            <FaExclamation />
          </div>
          <div ref={questionRef} className="bg-white text-[#004165]/75 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer" onClick={() => toggleTip('question')}>
            <FaQuestion />
          </div>
        </div>
      </div>
      <CustomTip isOpen={tipsOpen.notes} type={'notes'} setIsOpen={() => setTipsOpen({ ...tipsOpen, notes: false })} buttonRef={notesRef} />
      <CustomTip isOpen={tipsOpen.speaker} type={'speaker'} setIsOpen={() => setTipsOpen({ ...tipsOpen, speaker: false })} buttonRef={speakerRef} />
      <CustomTip isOpen={tipsOpen.exclamation} type={'exclamation'} setIsOpen={() => setTipsOpen({ ...tipsOpen, exclamation: false })} buttonRef={exclamationRef} />
      <CustomTip isOpen={tipsOpen.question} type={'question'} setIsOpen={() => setTipsOpen({ ...tipsOpen, question: false })} buttonRef={questionRef} />
    </>
  );
};

export default HeaderMenu;
