import { useRef, useState, useEffect } from "react";
import PadCss from "./Pad.module.css";

import * as Tone from "tone";

import Instructions from "../instructions/Instructions.jsx";

const Pad = () => {
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [frequency, setFrequency] = useState(0);
	const [mousePositionY, setMousePositionY] = useState(0);

	const padRef = useRef(null);
	const cursorRef = useRef(null);
	const synthRef = useRef(null);
	const chorusRef = useRef(null);

	// create the synth object when the component mounts
	useEffect(() => {
		const gainNode = new Tone.Gain(0.3).toDestination();
		chorusRef.current = new Tone.Chorus(10, 5, 0).connect(gainNode).start();
		synthRef.current = new Tone.Synth().connect(chorusRef.current);
	}, []);

	const handleMouseDown = (e) => {
		const pad = padRef.current;

		if (!pad.contains(e.target)) {
			return;
		}

		setIsMouseDown(true);
		// Start the synth with current values and trigger a note
		synthRef.current.set({ detune: frequency });
		chorusRef.current.set({ depth: mousePositionY });
		synthRef.current.triggerAttack(440);
	};

	const handleMouseUp = () => {
		//stop synth on mouse up
		setIsMouseDown(false);
		synthRef.current.triggerRelease();
	};

	const handleMouseMove = (e) => {
		// math for titlt
		const pad = padRef.current;
		const padWidth = pad.offsetWidth;
		const padHeight = pad.offsetHeight;
		const centerX = pad.offsetLeft + padWidth / 2;
		const centerY = pad.offsetTop + padHeight / 2;
		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;
		const rotateX = (-15 * mouseY) / (padHeight / 2);
		const rotateY = (15 * mouseX) / (padWidth / 2);

		pad.style.setProperty("--x", `${rotateX}deg`);
		pad.style.setProperty("--y", `${rotateY}deg`);

		//set tilt
		const cursor = cursorRef.current;
		cursor.style.left = `${e.clientX}px`;
		cursor.style.top = `${e.clientY}px`;

		//Handle change on x-axis

		const clientX = e.clientX;
		const { left, right } = e.target.getBoundingClientRect();

		const positionX = Math.max(
			0,
			Math.min(1, (clientX - left) / (right - left))
		); // Calculate the position from 0 to 1

		const value = -2400 + positionX * 4800;

		setFrequency(value);
		synthRef.current.set({ detune: frequency });

		//handle change on Y-axis

		const clientY = e.clientY;
		const { top, bottom } = e.target.getBoundingClientRect();

		const position = Math.max(0, Math.min(1, (clientY - top) / (bottom - top)));

		setMousePositionY(position);
		chorusRef.current.set({ depth: mousePositionY });
	};

	const handleMouseLeave = () => {
		const pad = padRef.current;
		pad.style.setProperty("--x", 0);
		pad.style.setProperty("--y", 0);

		//hide cursor on mouse leave
		const cursor = cursorRef.current;
		cursor.style.display = "none";

		//stop synth on mouse leave
		synthRef.current.triggerRelease();
	};

	const onMouseEnter = () => {
		//show cursor on mouse enter
		const cursor = cursorRef.current;
		cursor.style.display = "block";
	};

	return (
		<div className={PadCss.padWrapper}>
			<Instructions></Instructions>
			<div
				className={PadCss.pad}
				ref={padRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseEnter={onMouseEnter}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			></div>
			<div className={PadCss.roundCursor} ref={cursorRef} />
		</div>
	);
};

export default Pad;
