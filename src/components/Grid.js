import Card from "./Card";
import {useEffect, useState} from "react";
import Confetti from 'react-confetti';

const Grid=(props)=>{
    const [gridData, setGridData] = useState(props.data);
    const [rowNum, setRowNum] = useState([]);
    const [colNum, setColNum] = useState([]);
    const [LRDiagSelected, setLRDiagSelected] = useState(false);
    const [RLDiagSelected, setRLDiagSelected] = useState(false);
    const [isCheck,setIsCheck] = useState(true);
    const [showConfetti,setShowConfetti] = useState(false);
    let counter = 1;

    const checkRows =()=>{
        let rowSelected = true;
        for(let i=0; i<gridData.length; i++){
            for(let j=0; j<gridData.length; j++){
                rowSelected=true;
                if(rowNum.includes(i)){
                    rowSelected=false;
                    break;
                }
                if(!gridData[i][j].selected){
                    rowSelected = false;
                    break;
                }
            }
            if(rowSelected && !rowNum.includes(i)){
                setRowNum([...rowNum,i]);
                break;
            }
        }
        return rowSelected;
    }

    const checkCols =()=>{
        let colSelected = true;
        for(let i=0; i<gridData.length; i++){
            for(let j=0; j<gridData.length; j++){
                colSelected=true;
                if(colNum.includes(i)){
                    colSelected=false;
                    break;
                }
                if(!gridData[j][i].selected){
                    colSelected = false;
                    break;
                }
            }
            if(colSelected && !colNum.includes(i)){
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
        for(let i=0; i<gridData.length; i++){
            diagSelected=true;
            if(!gridData[i][i].selected){
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
        for(let i =0,j=gridData.length-1; i<gridData.length; i++,j--){
            diagSelected=true;
            if(!gridData[i][j].selected){
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
        if(gridData[i][j].clickable) {
            const clonedArray = [...gridData];
            const selectedCell = clonedArray[i][j];
            selectedCell.selected = true;
            selectedCell.cellColor = 'bg-success bg-opacity-50';
            selectedCell.clickable = false;
            clonedArray[i][j] = selectedCell;
            setGridData(clonedArray);
        }
    }

    const selectRandomCell = () => {
        if(gridData.length > 0) {
            while (isCheck) {
                let i = Math.floor(Math.random() * gridData.length);
                let j = Math.floor(Math.random() * gridData.length);
                if (!gridData[i][j].selected) {
                    const clonedArr = [...gridData];
                    const selectedCell = clonedArr[i][j];
                    const utter = new SpeechSynthesisUtterance();
                    utter.rate = 1.4;
                    utter.text = selectedCell.text;
                    window.speechSynthesis.speak(utter);
                    selectedCell.clickable = true;
                    selectedCell.cellColor = 'bg-warning'
                    clonedArr[i][j] = selectedCell;
                    setGridData(clonedArr);
                    setIsCheck(false);
                    break;
                }
            }
        }
    }

    const isAllSelected = () => {
        let allSelected = true;
        const flatArr = gridData.flat();
        for(let i =0; i< flatArr.length; i++) {
            if(!flatArr[i].selected) {
                allSelected = false;
                break;
            }
        }
        return allSelected;
    }

    const callSelectRandom = () => {
        if(!isAllSelected()) {
            setIsCheck(true);
            selectRandomCell();
        }
    }

    const checkBingo =()=>{
        if(gridData.length > 0) {
            if (checkRows() || checkCols() || checkDiagsRL() || checkDiagsLR()) {
                const utter = new SpeechSynthesisUtterance();
                utter.rate = 1.5;
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
                <div className="row row-cols-5 row-cols-sm-5 row-cols-md-5 g-0">
                    {
                        gridData.map((items, i)=>(
                            items.map((item, j)=>(
                                <Card key={item.text} data={item.text} id={counter++} onSelect={()=>onSelect(i,j)} cellColor={item.cellColor} clickable={item.clickable}/>
                            ))
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Grid;