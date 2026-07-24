import add from './components/add';
import addtxt from './components/addtxt';
import addsub from './components/addsub';
import times from './components/times';
import lin1 from './components/lin1';
import prop from './components/prop';
import lin3 from './components/lin3';
import lin2 from './components/lin2';
import frac from './components/frac';
import prozent from './components/prozent';
import linfun from './components/linfun';
import quad from './components/quad';
import potenzen from './components/potenzen';

// Single source of truth for task types: UI metadata (button label, keyboard
// shortcut, description, hasFilter) plus how to invoke each generator.
// Adding a new type means adding one entry here instead of touching App.js,
// CreateTask.js, and _templates.js separately (migration plan step 2, see
// CLAUDE.md).
//
// generate() call args intentionally mirror the pre-registry CreateTask.js
// switch exactly, including its pre-existing quirks: lin3/lin2/frac receive
// hardcoded values that their own generator signatures largely ignore, and
// quad ignores the filter argument despite hasFilter being true. These are
// known follow-ups, not fixed here.
const taskTypes = [
    { type: "add",      btn: "-a + b",       kbd: "a", txt: "Plus Minus & Zahlenstrahl",             generate: () => add() },
    { type: "addtxt",   btn: "+- EUR",       kbd: "q", txt: "Kontostand, Einzahlung, Auszahlung",    generate: () => addtxt() },
    { type: "addsub",   btn: "a - (-+b)",    kbd: "b", txt: "Plus Minus & Klammern",                 generate: () => addsub() },
    { type: "times",    btn: "1 x EINS",     kbd: "p", txt: "Kleines Einmaleins mit Variationen",    hasFilter: true, generate: (filter) => times(filter) },
    { type: "lin1",     btn: "x + a = b",    kbd: "c", txt: "Plus-Minus-Gleichungen",                 generate: () => lin1() },
    { type: "prop",     btn: "PROP",         kbd: "g", txt: "Proportionalität & Dreisatz",           hasFilter: true, generate: (filter) => prop(filter) },
    { type: "lin3",     btn: "a * x = b",    kbd: "j", txt: "Mal-Geteilt-Gleichungen",                 generate: () => lin3(2, 20) },
    { type: "lin2",     btn: "ax + b = c",   kbd: "k", txt: "Lineare Gleichungen",                     generate: () => lin2(5, 15) },
    { type: "frac",     btn: "x / y",        kbd: "l", txt: "Brüche kürzen",                           generate: () => frac(20, 20) },
    { type: "prozent",  btn: "PROZENT",      kbd: "g", txt: "Anteile & Prozent",                      hasFilter: true, generate: (filter) => prozent(filter) },
    { type: "linfun",   btn: "LINEAR y(x)",  kbd: "m", txt: "Lineare Funktionen",                      generate: () => linfun() },
    { type: "quad",     btn: "QUAD y(x)",    kbd: "n", txt: "Quadratische Funktionen",                hasFilter: true, generate: () => quad() },
    { type: "potenzen", btn: "POWERs",       kbd: "o", txt: "Potenzrechnung",                         hasFilter: true, generate: (filter) => potenzen(filter) },
]

export default taskTypes;
