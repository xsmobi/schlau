import { React, useState, useEffect } from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
import templates from "./components/_templates";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineQuestion} from 'react-icons/ai'
// import {AiOutlineExclamation} from 'react-icons/ai'
import {CgMathEqual} from 'react-icons/cg'
import {AiOutlineZoomIn} from 'react-icons/ai'

const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  //subheading: `text-1xl font-bold text-center text-gray-800 p-2`,
  subheading: `prose prose-xl p-2`,
  //taskbuttons: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
  taskbuttons: `my-3 h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
}

function App() {
  const [currentTask, setCurrentTask] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  //const [disabled, setDisabled] = useState(true);
  //const types = ['add', 'addsub', 'lin1', 'type1', 'type2', 'type3'];
  
  const types = [
    {typ: "add",    btn: "+ / -",       txt: "Plus und Minus auf dem Zahlenstrahl"},
    {typ: "addsub", btn: "-(-+)",       txt: "Plus und Minus mit Klammern"},
    {typ: "frac",   btn: "4/6 2/3",     txt: "Brüche kürzen"},
    {typ: "lin1",   btn: "ax + b",   txt: "Lineare Funktionen"},
    {typ: "lin2",   btn: "y = ax + b",   txt: "Lineare Gleichungen"},
    {typ: "inhalt", btn: "a * b * c",   txt: "Strecke, Fläche, Volumen"},
    {typ: "brac",   btn: "( (...) )",   txt: "Klammerregeln"},
 
    
    {typ: "frac2",  btn: "1/2 + 1/3",   txt: "Brüche add/sub & mal/geteilt"},
    {typ: "terme1", btn: "x + a",       txt: "Terme 1: Plus-Minus-Terme umstellen"},
    {typ: "terme2", btn: "Terme */:",   txt: "Terme 2: Mal-Geteilt-Terme umstellen"},
    {typ: "power",  btn: "a^(n+m)",     txt: "Potenzen"},
    {typ: "prop",   btn: "y = a * x",   txt: "Proportionalität, Anteil, Prozent"},
    {typ: "terme3", btn: "Terme */:",   txt: "Terme 2: Terme umstellen + - * / ^n"},
    {typ: "zoom",   btn: "Zoom",        txt: "Strahlensatz, Ähnlichkeit, Zoom"},
    {typ: "drei",   btn: "ABCabc",      txt: "Dreiecke, Pythagoras"},
    
    {typ: "lin3",   btn: "I = II",    txt: "Lineare Gleichungssysteme"},
    {typ: "quad",   btn: "( )^2",       txt: "Quadratische Funktionen"},
    {typ: "sincos", btn: "sin&cos",     txt: "Sinus, Cosinus, Tangens"},
    {typ: "sincos2", btn: "sin(a)/a",    txt: "Sinussatz, Cosinussatz"},
    {typ: "type1",  btn: "Test 1",      txt: "Test 1"},
    {typ: "type2",  btn: "Test 2",      txt: "Test 2"},
    {typ: "type3",  btn: "Test 3",      txt: "Test 3"},
  ]
  
  const [selectedType, setSelectedType] = useState('addsub');

  useEffect(() => {
    getRandomTask();
  }, [selectedType]);

  const getRandomTask = () => {
    const filteredTasks = templates.filter((task) => task.type === selectedType);
    if (filteredTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredTasks.length);
      const task = filteredTasks[randomIndex];
      const processedTask = CreateTask(task);
      // console.log(processedTask)
      setCurrentTask(processedTask);
      setShowHelp(false);
      setShowResult(false);
      setShowExplainer(false);
      //setDisabled(false);
    }
};

const toggleShowHelp = () => {
setShowHelp(!showHelp);
};

const toggleShowResult = () => {
setShowResult(!showResult);
};

const toggleShowExplainer = () => {
setShowExplainer(!showExplainer);
setShowHelp(false);
setShowResult(false);
};

const handleTypeSelection = (type) => {
setSelectedType(type);
};

return (

<div className={style.bg}>
    <div className={style.container}>
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                  <div>
                      <a href="https://mathbydoing.app" className="my-1 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
                        <img className="mr-2 h-12 w-12" src="https://mathbydoing.app/apple-touch-icon.png" alt="schlau.app Logo" loading="lazy" />
                        <span className={style.heading}>schlau.app</span>
                      </a>
                  </div>
              </div>
        </nav>

        <h4 id="typedesc" className={style.subheading}>Auswahl: {selectedType ? types.find((type) => type.typ === selectedType).txt : 'Practice Math and Boost Your Brainpower!'}</h4>
            
        <main>
            <div className="buttons-container">
              <button  type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={getRandomTask}><AiOutlinePlus size={30} /></button>
              <button  type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={toggleShowHelp}><AiOutlineQuestion size={30} /></button>
              <button  type="button" className="text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={toggleShowResult}><CgMathEqual size={30} /></button>
              <button  type="button" className="text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-lime-gray hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={toggleShowExplainer}><AiOutlineZoomIn size={30} /></button>
            </div>

            {currentTask && (
              <Task
                key={currentTask.name}
                task={currentTask}
                showHelp={showHelp}
                toggleShowHelp={toggleShowHelp}
                showResult={showResult}
                toggleShowResult={toggleShowResult}
                showExplainer={showExplainer}
                toggleShowExplainer={toggleShowExplainer}
              />
            )}


            <MathJaxContext><MathJax>
            <div className="types">
                {types.map((type) => (
                  <button  type="button" className={style.taskbuttons}
                    key={type.typ}
                    onClick={() => handleTypeSelection(type.typ)}
                    //disabled={selectedType === type.typ}
                    style={{ backgroundColor: selectedType === type ? 'lightgreen' : '' }}
                  >
                    {type.btn}
                  </button>
                ))}
            </div>
            </MathJax></MathJaxContext>
        </main>

        <footer className="mt-12  text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-0 text-center text-neutral-700 dark:text-neutral-200">
              Mathe macht schlau
            </div>
        </footer>
    </div>
</div>
);
}

export default App;