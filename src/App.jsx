import AppCss from "./App.module.css";
import PadContainer from "./components/padContainer/PadContainer.jsx";

function App() {
	return (
		<div className={AppCss.appContainer}>
			<PadContainer />
		</div>
	);
}

export default App;
