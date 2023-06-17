import "./App.css";
import { React, useState, useEffect } from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
import templates from "./components/_templates";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineQuestion} from 'react-icons/ai'
// import {AiOutlineExclamation} from 'react-icons/ai'
import {CgMathEqual} from 'react-icons/cg'
import {AiOutlineZoomIn} from 'react-icons/ai'
//import {MdLinearScale} from 'react-icons/md'

const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  //subheading: `text-1xl font-bold text-center text-gray-800 p-2`,
  subheading: `prose prose-xl p-2`,
  subheadingbold: `prose prose-xl p-2 font-bold`,
  btnadd: `button text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnhelp: `button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-justify mr-2 mb-2`,
  btnresult: `button text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnexplainer: `button text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-lime-gray hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  //taskbuttons: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
  taskbuttons:      `my-3 h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`,
  taskbuttonactive: `my-3 h-12 text-black-900 ring-4 ring-blue-500 bg-red hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-500 font-small font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 focus:ring-1 focus:ring-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`
}

function App() {
 
  const [currentTask, setCurrentTask] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const types = [
    {typ: "add",    btn: "-a + b",       txt: "Plus und Minus auf dem Zahlenstrahl"},
    {typ: "addsub", btn: "a- (-+b)",     txt: "Plus und Minus mit Klammern"},
    {typ: "lin1",   btn: "x + a = b",     txt: "Plus-Minus-Gleichungen nach x auflösen"},
    {typ: "prop",   btn: "Döner & Co",     txt: "Proportionalität und Dreisatz"},
    {typ: "prozent", btn: "Prozent %",     txt: "Anteile und Prozent"},
    {typ: "lin3",   btn: "x * a = b",     txt: "Mal-Geteilt-Gleichungen nach x auflösen"},
    {typ: "lin2",   btn: "ax + b = c",    txt: "Lineare Gleichungen auflösen"},
    {typ: "frac",   btn: "x / y",         txt: "Brüche kürzen"},
    /*
    {typ: "linfun", btn: "y = a * x + b", txt: "Lineare Funktionen"},    
    {typ: "quad1",   btn: "(x-a)^2 + b",    txt: "Quadratische Funktionen, Scheitelpunktform"},
    {typ: "quad2",   btn: "x^2 + px + q",    txt: "Quadratische Funktionen, Normalform, p-q-Formel"},
    {typ: "proba1",  btn: "Zufall!",       txt: "Einfache Wahrscheinlichkeiten"},
    {typ: "power",  btn: "a^n",           txt: "Potenzen"},
    {typ: "inhalt", btn: "abc",           txt: "Strecke, Fläche, Volumen"},
    {typ: "brac",   btn: "( (...) )",   txt: "Klammerregeln"},
    {typ: "frac2",  btn: "1/2 + 1/3",   txt: "Brüche add/sub & mal/geteilt"},
    {typ: "terme3", btn: "Terme xyz^n", txt: "Komplexe Terme umstellen"},
    {typ: "zoom",   btn: "Zoom",        txt: "Strahlensatz, Ähnlichkeit, Zoom"},
    {typ: "drei",   btn: "ABCabc",      txt: "Dreiecke, Pythagoras"}, 
    {typ: "lin3",   btn: "I = II",    txt: "Lineare Gleichungssysteme"},

    {typ: "sincos", btn: "sin&cos",     txt: "Sinus, Cosinus, Tangens"},
    {typ: "sincos2", btn: "sin(a)/a",    txt: "Sinussatz, Cosinussatz"},
    {typ: "type1",  btn: "Test 1",      txt: "Test 1"},
    {typ: "type2",  btn: "Test 2",      txt: "Test 2"},
    {typ: "type3",  btn: "Test 3",      txt: "Test 3"},
    */
  ]

  const [selectedType, setSelectedType] = useState('prozent');

 
  
  const getRandomTask = () => {
    const filteredTasks = templates.filter((task) => task.type === selectedType);
    if (filteredTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredTasks.length);
      const task = filteredTasks[randomIndex];
      const processedTask = CreateTask(task);
      setCurrentTask(processedTask);
      setShowHelp(false);
      setShowResult(false);
      setShowExplainer(false);
      //setDisabled(false);
    }
};


// Damit GetRandomTask auch bei Typ-Wechsel
useEffect(() => {
  getRandomTask();
}, [selectedType]) // eslint-disable-line react-hooks/exhaustive-deps


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
                      <a href="https://schlau.app" className="my-1 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
                        <img className="mr-2 h-12 w-12" src="https://mathbydoing.app/apple-touch-icon.png" alt="schlau.app Logo" loading="lazy" />
                        <span className={style.heading}>schlau.app</span>
                      </a>
                  </div>
              </div>
        </nav>

        <h4 id="typedesc" className={style.subheadingbold}>{selectedType ? types.find((type) => type.typ === selectedType).txt : 'Practice Math and Boost Your Brainpower!'}</h4>
            
        <main>
            <div className="buttons-container">
              <button title="New task" type="button" className={style.btnadd}
                onClick={getRandomTask}><AiOutlinePlus size={20} /></button>
              <button title="Help" type="button" className={style.btnhelp}
                onClick={toggleShowHelp}><AiOutlineQuestion size={20} /></button>
              <button title="Result" type="button" className={style.btnresult}
                onClick={toggleShowResult}><CgMathEqual size={20} /></button>
              <button title="Explainer" type="button" className={style.btnexplainer}
                onClick={toggleShowExplainer}><AiOutlineZoomIn size={20} /></button>
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



            <div className="types">
                {types.map((type) => (
                  <button  type="button"
                    key={type.typ}
                    onClick={() => handleTypeSelection(type.typ)}
                    //disabled={selectedType === type.typ}
                    //style={{ backgroundColor: selectedType === type.typ ? '#00b7eb' : '' }}
                    className={selectedType === type.typ ? style.taskbuttonactive : style.taskbuttons}
                  >
                    {type.btn}
                  </button>
                ))}
            </div>

        </main>

        <footer className="mt-12  text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-0 text-center text-neutral-700 dark:text-neutral-200">
              Mathe macht schlau | <a target="_blank" rel="noreferrer" href="https://mathbydoing.app/mathe-arbeitsblaetter-uebungen/">mehr üben</a> | <a href="https://www.youtube.com/@mathbydoing" target="_blank" rel="noreferrer">YouTube</a> | <a href="https://www.linkedin.com/in/internetpartnership/" target="_blank" rel="noreferrer">About</a>
            </div>
        </footer>
    </div>
</div>

);

}

export default App;



