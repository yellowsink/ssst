import {sig} from "@uwu/iota";
import {goalremaining, keepstretching, maintimer, sofar1, sofar2, stretchgoal} from "./dom.ts";
import {fullLength, stretchLength} from "./config.ts";

export enum States {
	Setup,
	Timing,
	Paused,
}

export const STATE_NAMES: Record<States, string> = {
	[States.Setup]: "setup",
	[States.Timing]: "timing",
	[States.Paused]: "paused",
}

export const BTNTXT: Record<States, string> = {
	[States.Setup]: "Start",
	[States.Timing]: "Pause",
	[States.Paused]: "Continue",
};

export const appState = sig(States.Setup);

const timePreviouslyStretched = sig(0);

const formatTime = (ms: number) => `${~~(ms / (1000 * 60))}:${(~~((ms / 1000) % 60)).toString().padStart(2, "0")}`;

let cancelTimer = () => {};

function startTimer() {
	cancelTimer();
	const startTime = Date.now();

	let cancel = false;
	cancelTimer = () => {
		cancel = true;
	};

	const loop = () => {
		const timedSoFar = Date.now() - startTime;

		if (cancel) {
			if (appState() !== States.Timing) {
        timePreviouslyStretched(
          timePreviouslyStretched() + timedSoFar
        );

				sofar2.textContent = formatTime(timePreviouslyStretched());
      }
      return;
    }


		maintimer.textContent = formatTime(timedSoFar);
		sofar1.textContent = formatTime(timedSoFar + timePreviouslyStretched());

		keepstretching.textContent = timedSoFar > (1000 * stretchLength())
				? `Don't push yourself too hard! You're ${formatTime(timedSoFar - (1000 * stretchLength()))} over your target`
			  : `Keep going for now, take a break in ${formatTime((1000 * stretchLength()) - timedSoFar)}...`;

		stretchgoal.textContent = (timedSoFar + timePreviouslyStretched()) > (1000 * fullLength())
			? `Nice work! You've exceeded your total goal by ${formatTime((timedSoFar + timePreviouslyStretched()) - (1000 * fullLength()))}`
			: `Keep it up, ${formatTime((1000 * fullLength()) - (timedSoFar + timePreviouslyStretched()))} left in total`;

		goalremaining.textContent = formatTime((1000 * fullLength()) - (timePreviouslyStretched()));

		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);
}

export function handleButtonClick() {
	appState(appState() === States.Timing ? States.Paused : States.Timing);

	// noinspection JSIgnoredPromiseFromCall
	startTimer();
}