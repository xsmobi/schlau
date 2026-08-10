import "./App.css";
import { React, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Task from "./Task";
import CreateTask from "./CreateTask";
import taskTypes from "./taskTypes";
import { init as initRewards, recordPlusClick, recordHelp, recordExplainer, recordSolution } from "./lib/rewards/accumulator";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineQuestion} from 'react-icons/ai'
import {CgMathEqual} from 'react-icons/cg'
import {AiOutlineZoomIn} from 'react-icons/ai'
import {AiOutlineClockCircle} from 'react-icons/ai'
//import prozent from './components/prozent';



const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2 notranslate`,
  //subheading: `text-1xl font-bold text-center text-gray-800 p-2`,
  subheading: `prose prose-xl p-2`,
  subheadingbold: `prose prose-xl p-2 font-bold`,
  btnadd: `button text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnhelp: `button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-justify mr-2 mb-2`,
  btnresult: `button text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnexplainer: `button text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-lime-gray hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  //taskbuttons: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
  taskbuttons:      `my-3 h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`,
  taskbuttonactive: `my-3 h-12 text-black-900 ring-4 ring-blue-500 bg-red hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-500 font-small font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 focus:ring-1 focus:ring-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`,
  sel: `p-2 text-sm w-full`
}

// Anti-spam cooldowns (Phase 4). "+" is only ever soft-throttled (dimmed,
// still clickable) so a genuine "let me check the solution then move on"
// student is never blocked; clicking through it early is what triggers the
// harder, shorter cooldown on "=" for the next task. Help/explainer only
// cooldown on a direct self-close click, not on being closed as a side
// effect of opening a different panel - moving between them stays frictionless.
const PLUS_SOFT_COOLDOWN_MS = 4000;
const RESULT_HARD_COOLDOWN_MS = 2000;
const HELP_HARD_COOLDOWN_MS = 2000;
const EXPLAINER_HARD_COOLDOWN_MS = 2000;

// Separate, independent rate limit on reward-earning itself: rapid "+"
// spamming still loads a new task instantly every time, but no unit is
// recorded while this is active. Distinct from PLUS_SOFT_COOLDOWN_MS above,
// which is about the "=" -> "+" interaction, not raw click rate.
const PLUS_REWARD_COOLDOWN_MS = 1500;

// Same reward-only rate limit as PLUS_REWARD_COOLDOWN_MS, mirrored onto "="
// itself: mass-clicking "=" still toggles the result every time, but no
// unit is recorded while this is active. Independent of - and composes
// alongside - the existing "=" -> "+" hard-lock state machine above
// (PLUS_SOFT_COOLDOWN_MS / RESULT_HARD_COOLDOWN_MS), which is about that
// specific interaction, not raw "=" click rate.
const RESULT_REWARD_COOLDOWN_MS = 1500;

function App({ type, subtype }) {
  //const [filterType, setFilterType] = useState('')

  const router = useRouter();

  const [currentTask, setCurrentTask] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const [plusCoolingDown, setPlusCoolingDown] = useState(false);
  const [resultDisabled, setResultDisabled] = useState(false);
  const [helpDisabled, setHelpDisabled] = useState(false);
  const [explainerDisabled, setExplainerDisabled] = useState(false);
  const [plusRewardCoolingDown, setPlusRewardCoolingDown] = useState(false);
  const [resultRewardCoolingDown, setResultRewardCoolingDown] = useState(false);

  const plusTimeoutRef = useRef(null);
  const resultTimeoutRef = useRef(null);
  const helpTimeoutRef = useRef(null);
  const explainerTimeoutRef = useRef(null);
  const plusRewardTimeoutRef = useRef(null);
  const resultRewardTimeoutRef = useRef(null);

  const startCooldown = (setFlag, timeoutRef, durationMs) => {
    setFlag(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFlag(false);
      timeoutRef.current = null;
    }, durationMs);
  };

  useEffect(() => {
    return () => {
      [plusTimeoutRef, resultTimeoutRef, helpTimeoutRef, explainerTimeoutRef, plusRewardTimeoutRef, resultRewardTimeoutRef].forEach((ref) => {
        if (ref.current) clearTimeout(ref.current);
      });
    };
  }, []);

  let i = taskTypes.findIndex(item => item.type === type)
  let filter = taskTypes[i].hasFilter ? true : false

  const [submenu, setSubmenu] = useState("")

  const getRandomTask = () => {
    const task = { type, subtype };
    const processedTask = CreateTask(task);
    setSubmenu(processedTask.menu);
    setCurrentTask(processedTask);
    setShowHelp(false);
    setShowResult(false);
    setShowExplainer(false);
    handleStop1();
};
//console.log(submenu)

const handleStop1 = () => {
  const synth = window.speechSynthesis;

  synth.cancel();

};

useEffect(() => {
  getRandomTask();
}, [type, subtype]) // eslint-disable-line react-hooks/exhaustive-deps

useEffect(() => {
  initRewards();
}, [])

const handlePlusClick = () => {
  if (plusCoolingDown) {
    startCooldown(setResultDisabled, resultTimeoutRef, RESULT_HARD_COOLDOWN_MS);
  }
  setPlusCoolingDown(false);
  if (plusTimeoutRef.current) {
    clearTimeout(plusTimeoutRef.current);
    plusTimeoutRef.current = null;
  }
  getRandomTask();
  if (!plusRewardCoolingDown) {
    recordPlusClick(subtype != null ? `${type}${subtype}` : type);
    startCooldown(setPlusRewardCoolingDown, plusRewardTimeoutRef, PLUS_REWARD_COOLDOWN_MS);
  }
};

const toggleShowHelp = () => {
if (showHelp) {
  startCooldown(setHelpDisabled, helpTimeoutRef, HELP_HARD_COOLDOWN_MS);
}
setShowHelp(!showHelp);
setShowResult(false);
setShowExplainer(false);
recordHelp();
};

const toggleShowResult = () => {
setShowResult(!showResult);
setShowHelp(false);
setShowExplainer(false);
if (!resultRewardCoolingDown) {
  recordSolution();
  startCooldown(setResultRewardCoolingDown, resultRewardTimeoutRef, RESULT_REWARD_COOLDOWN_MS);
}
startCooldown(setPlusCoolingDown, plusTimeoutRef, PLUS_SOFT_COOLDOWN_MS);
};

const toggleShowExplainer = () => {
if (showExplainer) {
  startCooldown(setExplainerDisabled, explainerTimeoutRef, EXPLAINER_HARD_COOLDOWN_MS);
}
setShowExplainer(!showExplainer);
setShowHelp(false);
setShowResult(false);
recordExplainer();
};


return (


<div className={style.bg}>


    <div className={style.container}>
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3 bg-red-white">
                  <div>
                      <a href="https://schlau.app" className="my-1 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
                        <img className="mr-2 h-12 w-12 rounded-md" src="https://mathbydoing.app/apple-touch-icon.png" alt="schlau.app Logo" loading="lazy" />
                        <span className={style.heading} translate="no">schlau.app</span>
                      </a>
                  </div>
              </div>
        </nav>

        <h4 id="typedesc" className={style.subheadingbold}>{taskTypes.find((t) => t.type === type).txt}</h4>
            
        <main>
            <div className="buttons-container">
              <button title="New task - Key: alt + '+'" type="button" accessKey="+"
                className={`${style.btnadd} ${plusCoolingDown ? 'opacity-50' : ''}`}
                onClick={handlePlusClick}><AiOutlinePlus size={20} /></button>
              <button title="Help - Key: alt + '?'" type="button" accessKey="?"
                className={`${style.btnhelp} ${helpDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={toggleShowHelp} disabled={helpDisabled}><AiOutlineQuestion size={20} /></button>
              <button title="Result - Key: alt + '='" type="button" accessKey="="
                className={`${style.btnresult} ${resultDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={toggleShowResult} disabled={resultDisabled}><CgMathEqual size={20} /></button>
              <button title="Explainer - Key: alt + '0'" type="button" accessKey="0"
                className={`${style.btnexplainer} ${explainerDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={toggleShowExplainer} disabled={explainerDisabled}><AiOutlineZoomIn size={20} /></button>
              {(plusRewardCoolingDown || resultRewardCoolingDown) && (
                <span className="inline-flex items-center text-gray-400" title="Punkte sammeln kurz pausiert">
                  <AiOutlineClockCircle size={18} />
                </span>
              )}
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
                //filterx={3}
              />
            )}

              {filter && submenu && (
                  <div className="mt-4">
                    <select
                      value={subtype ?? 0}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        router.push(val === 0 ? `/${type}` : `/${type}/${val}`);
                      }}
                      className={style.sel}
                    >
                      <option value={0}>alle Einzelthemen</option>
                      {submenu.map((item) => (
                        <option key={item.nr} value={item.nr}>{item.title}</option>
                      ))}
                    </select>
                  </div>
              )}
            

            <div className="types">
                {taskTypes.map((t) => (
                  <Link
                    key={t.type}
                    href={`/${t.type}`}
                    accessKey = {t.kbd}
                    className={type === t.type ? style.taskbuttonactive : style.taskbuttons}
                    title={t.txt + ' Key: alt + '+ t.kbd}
                  >
                    {t.btn}
                  </Link>
                ))}
            </div>

        </main>

        <footer className="mt-12  text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-0 text-center text-neutral-700 dark:text-neutral-200">
              <Link href="/impressum">Impressum</Link> | <Link href="/datenschutz">Datenschutz</Link> | <a href="https://docs.schlau.app">Docs</a>
            </div>
        </footer>
    </div>

</div>



);

}

export default App;



