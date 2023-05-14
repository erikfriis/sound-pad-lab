import Pad from "../pad/Pad";

import padContainerCss from "./PadContainer.module.css";

const PadContainer = () => {
	return (
		<div className={padContainerCss.padContainer}>
			<Pad />
		</div>
	);
};

export default PadContainer;
