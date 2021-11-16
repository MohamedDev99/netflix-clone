import { Jumbotron } from "./components";
import jumboData from "./fixtures/jumbo.json";

function App() {
    return (
        <div>
            <Jumbotron jumboData={jumboData} />
        </div>
    );
}

export default App;
