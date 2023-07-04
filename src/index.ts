import "./styles.sass";
import { effect } from "@uwu/iota";
import { fullLength, stretchLength } from "./config.ts";
import {appState, BTNTXT, handleButtonClick, STATE_NAMES} from "./timer.ts";
import {btn, ftselect, main, stselect} from "./dom.ts";

// INIT BORING DOM STUFF HERE

effect(() => main.className = STATE_NAMES[appState()])

effect(() => (btn.textContent = BTNTXT[appState()]));
btn.onclick = handleButtonClick;

effect(() => (stselect.value = stretchLength().toString()));
effect(() => (ftselect.value = fullLength().toString()));
stselect.oninput = () => stretchLength(parseFloat(stselect.value));
ftselect.oninput = () => fullLength(parseFloat(ftselect.value));
