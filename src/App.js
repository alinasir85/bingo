import Grid from "./components/Grid";
import './App.css'
import {useEffect} from "react";
const App =()=> {

    useEffect(()=>{
/*        let outer = document.getElementById('root'),
            wrapper = document.getElementById('main'),
            maxWidth  = outer.clientWidth,
            maxHeight = outer.clientHeight;

        window.addEventListener("resize", resize);
        resize();

        function resize(){
            let scale,
                width = window.innerWidth,
                height = window.innerHeight,
                isMax = width >= maxWidth && height >= maxHeight;

            scale = Math.min(width/maxWidth, height/maxHeight);
            outer.style.transform = isMax?'':'scale(' + scale + ')';
            wrapper.style.width = isMax?'':maxWidth * scale;
            wrapper.style.height = isMax?'':maxHeight * scale;
        }*/
    },[])

  return (
    <div id="main" className="App">
        <h4 className="text-center mt-5">Bingo App!</h4>
        <Grid/>
    </div>
  );
}


export default App;
