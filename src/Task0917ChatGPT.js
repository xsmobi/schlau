import React, { useState, useEffect } from "react"; // neu 0916
import DOMPurify from 'dompurify';
import { MathJaxContext, MathJax } from "better-react-mathjax";
import TextToSpeech from './TextToSpeech';
import Rectangle from "./components/Rectangle";
const style={
    taskheader:`text-center prose prose-lg`,
    tasktext: `prose prose-sm`,
    helptext: `prose prose-lg border-solid border-2 border-red-600 px-2 py-2 mb-2 rounded-md`,
    resulttext: `prose prose-lg`,
    explainertext: `prose prose-lg border-solid border-2 border-gray-400 px-2 my-2 rounded-md`,
    subheader: `prose prose-lg`,
    subheader2: `prose prose-2xl`,
    subheader3: `prose prose-2xl font-black`,
    bgyellow: `bg-yellow-50`
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


    // neu 0916 /////////////////////////////////

    const [currentStep, setCurrentStep] = useState(0);
    const [highlight, setHighlight] = useState(null);
    const duration = 2000; // Milliseconds
    //console.log(speakexplainer)
    
    /*
    useEffect(() => {
        if (speakexplainer && speakexplainer.length === 1) {
            // If there is only one element in speakexplainer, then just speak it as before and do not highlight anything.
            const synth = window.speechSynthesis;
            const u = new SpeechSynthesisUtterance(speakexplainer[0]);
            u.lang = "de-DE";
            synth.speak(u);
        } else if (speakexplainer && speakexplainer.length > 1) {
            // Otherwise, iterate through the elements of speakexplainer and speak the current one, while highlighting the corresponding div in explainer.
            for (let i = 0; i < speakexplainer.length; i++) {
                const divId = `t${i}`;
                if (explainer.includes(`id="${divId}"`)) {
                    // If the div with id divId exists in explainer, then highlight it.
                   
                    setHighlight(divId);
                    // Speak the corresponding element of speakexplainer.
                    const synth = window.speechSynthesis;
                    const u = new SpeechSynthesisUtterance(speakexplainer[i]);
                    u.lang = "de-DE";
                    synth.speak(u);
                    // Wait for the duration of the step before moving on to the next step.
                    setTimeout(() => {
                        setCurrentStep(i + 1);
                        setHighlight(null);
                    }, duration);
                    break;
                }
            }
        }

        const element = document.querySelector(`#${highlight}`);
        if (element) {
            element.classList.add(style.bgyellow);
            setTimeout(() => {
                element.classList.remove(style.bgyellow);
            }, duration);
        }

    }, [speakexplainer, explainer]);
    */

    // neu 0916 /////////////////////////////////

    const sanitizedExplainer = DOMPurify.sanitize(explainer);

    // neu 0917 Tutor

    //const [tutor, setTutor] = useState([]);
    const [tutor, setTutor] = useState(tutorArray || []);
    console.log(tutorArray)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (tutor && tutor.length > 0) {
      const intervalId = setInterval(() => {
        if (currentIndex < tutor.length) {
          const [line, spokenText] = tutor[currentIndex];
          setCurrentIndex(currentIndex + 1);
          TextToSpeech({ text: spokenText });
        }
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [tutor, currentIndex]);

  const handleSpeakTutor = () => {
    setCurrentIndex(0);
  };

    // neu 0917 Tutor
    
    return (
    <MathJaxContext>
    <div className="Task">

        <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic><span  dangerouslySetInnerHTML={{ __html: text }} /></MathJax></h3>
        {showHelp && <MathJax inline dynamic><div className={style.helptext} dangerouslySetInnerHTML={{ __html: helptxt }} /></MathJax>}
        {showResult && <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic><span  dangerouslySetInnerHTML={{ __html: answer }} /></MathJax></h3>}
        {showExplainer && <MathJax inline dynamic><div  className={style.explainertext} dangerouslySetInnerHTML={{ __html: sanitizedExplainer }} /></MathJax>}
        {/*  */}
        {showResult && speak && (<TextToSpeech text={speak} />)}
        {showHelp && speakhelp && (<TextToSpeech text={speakhelp} />)}
        {/*showExplainer && speakexplainer && (<TextToSpeech text={speakexplainer} />)*/}

        {showExplainer && speakexplainer && (
        <>
          <TextToSpeech text={speakexplainer} />
          {tutor && tutor.length > 0 && (
            <>
              <button onClick={handleSpeakTutor} className="speak-button">
                Speak Tutor
              </button>
              <div className="tutor-lines">
                {tutor.map(([line, spokenText], index) => (
                  <div key={index} className={currentIndex === index ? 'highlighted-line' : ''}>
                    {line}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}






        {showHelp && isreactangle && ( <Rectangle a={aa} b={bb} />)}
    </div>
    </MathJaxContext>
            
    );
}
export default Task;