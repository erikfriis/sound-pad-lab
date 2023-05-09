import React, { useRef } from "react";

import CustomCursorCss from "./CustomCursor.module.css";

const CustomCursor = () => {
	const cursorRef = useRef(null);

	const onMouseMove = (e) => {
		const cursor = cursorRef.current;
		cursor.style.left = `${e.clientX}px`;
		cursor.style.top = `${e.clientY}px`;
	};

	const onMouseLeave = () => {
		const cursor = cursorRef.current;
		cursor.style.display = "none";
	};

	const onMouseEnter = () => {
		const cursor = cursorRef.current;
		cursor.style.display = "block";
	};

	return (
		<div
			className={CustomCursorCss.customCursor}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			onMouseEnter={onMouseEnter}
		>
			<div className={CustomCursorCss.roundCursor} ref={cursorRef} />
		</div>
	);
};

export default CustomCursor;
