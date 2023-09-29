import React, { useState, useEffect } from "react";
import { HiSpeakerWave } from "react-icons/hi2";

const style={
  btnspeak: `button text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center mt-2 mr-2 mb-2 mt-3 text-xl`,
}

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text); // ***** If this is commented out, and consequently setUtterance

    setUtterance(u); // *****

    return () => {
      synth.cancel();
    };
  }, [text]);
  
  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    //utterance.lang = "de-DE"; // *****
    //synth.speak(utterance); // *****
    if (!synth.speaking) {
      utterance.lang = "de-DE";
      synth.speak(utterance);
    }
    setIsPaused(false);
  };

  /*
  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };
 
  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };
 */
  
  return (
    <div className="buttons-container">
      <button onClick={handlePlay} className={style.btnspeak}><HiSpeakerWave size={20} /></button>
  </div>
  );

};

export default TextToSpeech;