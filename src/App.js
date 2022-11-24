import Grid from "./components/Grid";
import {data} from "./components/Helper";

const App =()=> {
  return (
    <div className="App">
        <h4 className="text-center mt-5">Bingo App!</h4>
        <Grid data={data}/>
    </div>
  );
}

export default App;
