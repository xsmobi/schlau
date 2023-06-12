import React from "react";
import { MathJax } from "better-react-mathjax";
const style={
    taskheader:`text-center prose prose-2xl`,
    tasktext: `prose prose-sm`,
    subheader: `prose prose-lg font-semibold`
}

function Task({ task, showHelp, showResult, showExplainer }) {
    const { text, help, answer, explainer, headerclass } = task;
    const headerClassName = headerclass ? style[headerclass] : style.taskheader;
    //console.log(headerclass)
    //<h3 className={style.taskheader}>{text}</h3>
    // {showResult && <h3 className={style.taskheader}>{answer}</h3>}
    const num = 3000 // Test *************
    const den = 40000 // Test *************
    const aufgabe = `\\[\\frac{${num}}{${den}}\\]`; // Test *************
    console.log(aufgabe)
    console.log(text)
    const text1 = text

    //console.log(aufgabeGlobal)
    
    return (
   
    <div className="Task">

        <h3 className={headerClassName || style.taskheader}><MathJax>{text1}</MathJax></h3>
        <h3>{aufgabe}</h3>
        {showHelp && <div className={style.tasktext} dangerouslySetInnerHTML={{ __html: help }} />}
        {showResult && <h3 className={headerClassName || style.taskheader}>{answer}</h3>}
        {showExplainer && <div  className={style.tasktext} dangerouslySetInnerHTML={{ __html: explainer }} />}
    </div>

    );
}
export default Task;

/*
function MyComponent(x) {
    useEffect(() => {
      const typesetMath = async () => {
        await MathJax.typesetPromise();
        // MathJax typesetting is complete, you can perform additional actions here if needed
      };
  
      typesetMath();
    }, [x]);
  
    return (
      //<h3>
        <MathJax>x</MathJax>
      //</h3>
    );
  }
  */