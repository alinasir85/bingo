import Card from "./Card";
import {useEffect, useState} from "react";
import Confetti from 'react-confetti';
import {getData} from "./Helper";

const Grid=()=>{
    const [gridSize] = useState(5);
    const [gridData, setGridData] = useState(getData(gridSize));
    const [rowNum, setRowNum] = useState([]);
    const [colNum, setColNum] = useState([]);
    const [LRDiagSelected, setLRDiagSelected] = useState(false);
    const [RLDiagSelected, setRLDiagSelected] = useState(false);
    const [showConfetti,setShowConfetti] = useState(false);
    let counter = 1;

    const areValidIndexes = (i,j) => {
        return (i < gridData.length && j < gridData[0].length);
    }

    const checkRows =()=>{
        let rowSelected = true;
        for(let i=0; i<gridSize; i++){
            for(let j=0; j<gridSize; j++){
                rowSelected=true;
                if(rowNum.includes(i)){
                    rowSelected=false;
                    break;
                }
                if(areValidIndexes(i,j)) {
                    if(!gridData[i][j].selected){
                        rowSelected = false;
                        break;
                    }
                } else {
                    rowSelected =false;
                }

            }
            if(rowSelected && !rowNum.includes(i)){
                setRowNum([...rowNum,i]);
                break;
            }
        }
        return rowSelected;
    }

    const checkCols = () => {
        let colSelected = true;
        for(let i=0; i<gridSize; i++){
            for(let j=0; j<gridSize; j++){
                colSelected=true;
                if(colNum.includes(i)) {
                    colSelected=false;
                    break;
                }
                if(areValidIndexes(j,i)) {
                    if(!gridData[j][i].selected) {
                        colSelected = false;
                        break;
                    }
                } else {
                    colSelected = false;
                }
            }
            if(colSelected && !colNum.includes(i)) {
                setColNum([...colNum,i]);
                break;
            }
        }
        return colSelected;
    }


    const checkDiagsLR =()=>{
        if(LRDiagSelected) {
            return false;
        }
        let diagSelected = true;
        for(let i=0; i<gridSize; i++){
            diagSelected=true;
            if(areValidIndexes(i,i) && !gridData[i][i].selected){
                diagSelected = false;
                break;
            }
        }
        if(diagSelected) {
            setLRDiagSelected(true);
        }
        return diagSelected;
    }

    const checkDiagsRL =()=>{
        let diagSelected = true;
        if(RLDiagSelected) {
            return false;
        }
        for(let i =0,j=gridSize-1; i<gridSize; i++,j--){
            diagSelected=true;
            if(areValidIndexes(i,j) && !gridData[i][j].selected){
                diagSelected = false;
                break;
            }
        }
        if(diagSelected) {
            setRLDiagSelected(true);
        }
        return diagSelected;
    }

    const onSelect =(i,j)=>{
        if(areValidIndexes(i,j) && gridData[i][j].clickable) {
            const clonedArray = [...gridData];
            const selectedCell = clonedArray[i][j];
            selectedCell.selected = true;
            selectedCell.cellColor = 'bg-success bg-opacity-50';
            selectedCell.clickable = false;
            clonedArray[i][j] = selectedCell;
            setGridData(clonedArray);
        }
    }

    const isAnyClickable = () => {
        let isAnyClickable = false;
        const flatArr = gridData.flat();
        const filteredArr = flatArr.filter(item => item.render);
        for(let i =0; i< filteredArr.length; i++) {
            if(filteredArr[i].clickable) {
                isAnyClickable = true;
                break;
            }
        }
        return isAnyClickable;
    }

    function sleep(ms) {
        return(new Promise(function(resolve, reject) {
            setTimeout(function() { resolve(); }, ms);
        }));
    }

    const selectRandomCell = async () => {
        let isBreak = false;
        const utter = new SpeechSynthesisUtterance();
        if(gridData.length > 0) {
            while (!isBreak && !isAnyClickable() && !isAllSelected()) {
                let i = Math.floor(Math.random() * (gridData.length-1 + 1));
                let j = Math.floor(Math.random() * (gridData.length-1 + 1));
                if (areValidIndexes(i,j) && !gridData[i][j].selected) {
                    const clonedArr = [...gridData];
                    const selectedCell = clonedArr[i][j];
                    utter.text = selectedCell.text;
                    if(!isAnyClickable()) {
                        window.speechSynthesis.speak(utter);
                    }
                    utter.onend = async () => {
                        if (!selectedCell.render) {
                            await sleep(3000);
                        }
                        if (!isAnyClickable()) {
                            selectedCell.clickable = true;
                            selectedCell.cellColor = 'bg-warning'
                            clonedArr[i][j] = selectedCell;
                            setGridData(clonedArr);
                        }
                    }
                    isBreak = true;
                }
            }
        }
    }

    const isAllSelected = () => {
        let allSelected = true;
        const flatArr = gridData.flat();
        const filteredArr = flatArr.filter(item => item.render);
        for(let i =0; i< filteredArr.length; i++) {
            if(!filteredArr[i].selected) {
                allSelected = false;
                break;
            }
        }
        return allSelected;
    }

    const callSelectRandom = () => {
        if(!isAllSelected()) {
            selectRandomCell();
        }
    }

    const checkBingo =()=>{
        if(gridData.length > 0) {
            if (checkRows() || checkCols() || checkDiagsRL() || checkDiagsLR()) {
                const utter = new SpeechSynthesisUtterance();
                utter.text = 'Congrats, you have made Bingo!!';
                window.speechSynthesis.speak(utter);
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    callSelectRandom();
                }, 3000);
            } else {
                callSelectRandom();
            }
            if (isAllSelected()) {
                const utter = new SpeechSynthesisUtterance();
                utter.rate = 1.1;
                utter.text = 'Game Completed, You Won!!';
                window.speechSynthesis.speak(utter);
            }
        }
    }

    useEffect(() => {
        checkBingo();
    },[gridData]);
    
    return(
        <>
            {
                showConfetti && (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={700}
                        tweenDuration={1000}
                        gravity={1}
                    />
                )
            }
            <div className="container text-center mt-5">
                <div className="row row-cols-5 row-cols-lg-5 row-cols-md-5 row-cols-sm-5 row-cols-xs-5">
                    {
                        gridData.map((items, i)=>(
                            items.map((item, j)=>(
                                <Card key={item.text} data={item.text} id={counter++} onSelect={()=>onSelect(i,j)} cellColor={item.cellColor} clickable={item.clickable} render={item.render}/>
                            ))
                        ))
                    }
                </div>
                <button className="btn btn-lg btn-primary mt-3" onClick={()=>{setGridData(getData(5))}}>Reset</button>
            </div>
        </>
    )
}

export default Grid;