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
    const { text, help, answer, explainer, headerclass, menu, speak, speakhelp, speakexplainer } = task;
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
    const [highlightedDiv, setHighlightedDiv] = useState(null);
    const duration = 2000; // Milliseconds
    //const divs = Array.from(new DOMParser().parseFromString(explainer, 'text/html').querySelectorAll("div[id^='t']"));
    const divs = document.querySelectorAll("div[id^='t']");
    //const divs = ["id0", "id1", "id2"]
    //console.log(divs)
    useEffect(() => {
      const speakExplainer = Array.isArray(speakexplainer) ? speakexplainer : [speakexplainer];
      //const divs = document.querySelectorAll("div[id^='t']");
      //console.log(divs.length)
      const interval = setInterval(() => {
        if (currentStep < divs.length && currentStep < speakExplainer.length) {
          const currentDiv = divs[currentStep];
          
          //currentDiv.classList.add(style.bgyellow);//////////////////////////////
          setHighlightedDiv(currentDiv);
          
          const textToSpeak = speakExplainer[currentStep];
  
          // Update the TextToSpeech component to speak the text
          TextToSpeech.speak(textToSpeak);


        // Remove the highlight from the previous div
        /*
        if (currentStep > 0) {
            const previousDiv = divs[currentStep - 1];
            previousDiv.classList.remove(style.bgyellow);
          }
        */
        
          setCurrentStep(currentStep + 1);
        } else {
          clearInterval(interval);
        }
      }, duration);
  
      return () => {
        clearInterval(interval);
      };
    }, [currentStep, duration, speakexplainer]);

    // neu 0916 /////////////////////////////////

    const sanitizedExplainer = DOMPurify.sanitize(explainer);

    
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
        {showExplainer && speakexplainer && (<TextToSpeech text={speakexplainer} />)}
        {showHelp && isreactangle && ( <Rectangle a={aa} b={bb} />)}
    </div>
    </MathJaxContext>
            
    );
}
export default Task;