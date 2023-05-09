import { useRef } from "react";
import PadCss from "./Pad.module.css";

const Pad = () => {
	const padRef = useRef(null);
	const cursorRef = useRef(null);

	const handleMouseMove = (e) => {
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

		//handle curosr on mouse move
		const cursor = cursorRef.current;
		cursor.style.left = `${e.clientX}px`;
		cursor.style.top = `${e.clientY}px`;
	};

	const handleMouseLeave = () => {
		const pad = padRef.current;
		pad.style.setProperty("--x", 0);
		pad.style.setProperty("--y", 0);

		//handle cursor on mouse leave
		const cursor = cursorRef.current;
		cursor.style.display = "none";
	};

	const onMouseEnter = () => {
		const cursor = cursorRef.current;
		cursor.style.display = "block";
	};

	return (
		<div>
			<div
				className={PadCss.pad}
				ref={padRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseEnter={onMouseEnter}
			></div>
			<div className={PadCss.roundCursor} ref={cursorRef} />
		</div>
	);
};

export default Pad;
