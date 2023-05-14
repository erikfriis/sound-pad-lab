import AppCss from "./App.module.css";
import PadContainer from "./components/padContainer/padContainer";

function App() {
	return (
		<div className={AppCss.appContainer}>
			<PadContainer />
		</div>
	);
}

export default App;
