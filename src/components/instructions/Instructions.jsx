import InstructionsCss from "./Instructions.module.css";

const Instructions = () => {
	return (
		<div className={InstructionsCss.container}>
			<div className={InstructionsCss.text}>
				CLICK THE SQUARE AND DRAG YOUR MOUSE TO MANIPULATE THE SOUND
			</div>
		</div>
	);
};

export default Instructions;
