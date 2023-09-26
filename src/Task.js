import React, { useState, useEffect } from "react"; // neu 0916
import DOMPurify from 'dompurify';
import { MathJaxContext, MathJax } from "better-react-mathjax";
import TextToSpeech from './TextToSpeech';
import Rectangle from "./components/Rectangle";
import { HiSpeakerWave } from "react-icons/hi2";
const style={
    taskheader:`text-center prose prose-lg`,
    tasktext: `prose prose-sm`,
    helptext: `prose prose-lg border-solid border-2 border-red-600 px-2 py-2 mb-2 rounded-md`,
    speechtext: `prose prose-lg`,
    resulttext: `prose prose-lg`,
    explainertext: `prose prose-lg border-solid border-2 border-gray-400 px-2 my-2 rounded-md`,
    subheader: `prose prose-lg`,
    subheader2: `prose prose-2xl`,
    subheader3: `prose prose-2xl font-black`,
    bgyellow: `bg-yellow-50`,
    btnspeak: `button text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center mt-2 mr-2 mb-2 mt-3 text-xl`,
    center: `content-center`
}

function Task({ task, showHelp, showResult, showExplainer }) {
    const { text, help, answer, explainer, headerclass, menu, speak, speakhelp, speakexplainer, tutor: tutorArray } = task;
    const headerClassName = headerclass ? style[headerclass] : style.taskheader;
  
    let helptxt = help
    let aa = 1, bb = 1
    let isreactangle = false
    if (help && help.includes("///")) {
        let helparr = help.split("///")
        helptxt = help.replace("///", " mal ")
        helptxt = helptxt + " - Rechteck:"
        aa = helparr[0]
        bb = helparr[1]
        isreactangle = true
    }

    let menu_display = menu === "undefined" ? "" : menu
    menu_display = "" // klappte, aber jetzt neu über component TaskMenu

    const sanitizedExplainer = DOMPurify.sanitize(explainer);

    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);

    let isTutor
    tutorArray !== undefined && tutorArray.length > 0 ? isTutor = true : isTutor = false

    useEffect(() => {
        if (isTutor && isSpeaking) {
        const synth = window.speechSynthesis;
        //const utterance = new SpeechSynthesisUtterance(tutorArray[currentLineIndex][1]); // Get the spoken text for the current line
        const utterance = new SpeechSynthesisUtterance("das ist ein Test")
        utterance.lang = "de-DE";
        synth.speak(utterance);

        utterance.onend = () => {
          setIsSpeaking(false);

          // If we're not on the last line, increment the line index and start speaking the next line
          if (currentLineIndex < tutorArray.length - 1) {
            setCurrentLineIndex(currentLineIndex + 1);
            setIsSpeaking(true);
          } else {
            // If we're on the last line, reset the line index to the beginning and stop speaking
            setCurrentLineIndex(0);
          }
        };
      }
    }, [isSpeaking, currentLineIndex, tutorArray]);

const handlePlay = () => {
  setIsSpeaking(!isSpeaking);
};

const handleStop = () => {
  setIsSpeaking(false);
};
    
    return (
    <MathJaxContext>
    <div className="Task">

        <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic><span  dangerouslySetInnerHTML={{ __html: text }} /></MathJax></h3>
        {showHelp && <MathJax inline dynamic><div className={style.helptext} dangerouslySetInnerHTML={{ __html: helptxt }} /></MathJax>}
        {showResult && <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic><span  dangerouslySetInnerHTML={{ __html: answer }} /></MathJax></h3>}

        
        {showExplainer && isTutor && (
          <div>
            {tutorArray.slice(0, currentLineIndex + 1).map((line, index) => (
            //<div key={index} className={style.speechtext}>{line[0]}</div>
            
            <div key={index} className={style.speechtext} dangerouslySetInnerHTML={{ __html: line[0] }} />
            
            
            ))}
            <div className="buttons-container">
            <button className={style.btnspeak} onClick={handlePlay}><HiSpeakerWave size={20} /></button>

            </div>
          </div>
        )}
        
        {showExplainer && <MathJax inline dynamic><div  className={style.explainertext} dangerouslySetInnerHTML={{ __html: sanitizedExplainer }} /></MathJax>}
        {showResult && speak && (<TextToSpeech text={speak} />)}
        {showHelp && speakhelp && (<TextToSpeech text={speakhelp} />)}
        {showExplainer && speakexplainer && (<TextToSpeech text={speakexplainer} />)}
        {showHelp && isreactangle && ( <Rectangle a={aa} b={bb} />)}
    </div>
    </MathJaxContext>
            
    );
}
export default Task;