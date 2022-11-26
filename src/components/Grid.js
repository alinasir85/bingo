import Card from "./Card";
import {useEffect, useState} from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const Grid=(props)=>{


    const { speak } = useSpeechSynthesis();

    const [gridData, setGridData] = useState(props.data);
    let counter = 1;

    const checkBingo =()=>{
        if(checkRows() || checkCols() || checkDiagsRL() || checkDiagsLR()){
            alert("Bingo!");
        }
    }

    const checkRows =()=>{

        let rowSelected = true;

        for(let i=0; i<gridData.length; i++){
            for(let j=0; j<gridData.length; j++){
                rowSelected=true;
                if(!gridData[i][j].selected){
                    rowSelected = false;
                    break;
                }
            }
            if(rowSelected){
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
                if(!gridData[j][i].selected){
                    colSelected = false;
                    break;
                }
            }
            if(colSelected){
                break;
            }
        }
        return colSelected;
    }

    const checkDiagsLR =()=>{

        let diagSelected = true;

        for(let i=0; i<gridData.length; i++){
            diagSelected=true;
            if(!gridData[i][i].selected){
                diagSelected = false;
                break;
            }
        }
        return diagSelected;
    }

    const checkDiagsRL =()=>{

        let diagSelected = true;

        for(let i=0, j=gridData.length-1; i<gridData.length; i++,j--){
            diagSelected=true;
            if(!gridData[i][j].selected){
                diagSelected = false;
                break;
            }
        }
        return diagSelected;
    }

    const onSelect =(i,j)=>{
        if(i===2 && j===2){
            return;
        }
        const clonedArray =  [...gridData];
        const selectedCell = clonedArray[i][j];
        selectedCell.selected = true;
        selectedCell.cellColor = 'bg-success bg-opacity-50';
        clonedArray[i][j] = selectedCell;
        setGridData(clonedArray);

        checkBingo();
    }

    // useEffect(()=>{
    //     console.log("Here");
    //     speak({text: 'Could you please get closer to the mic'});
    // },[]);

    return(
        <div className="container text-center mt-5">
            <div className="row row-cols-5 row-cols-sm-5 row-cols-md-5 g-0">
                {
                    gridData.map((items, i)=>(
                        items.map((item, j)=>(
                            <Card key={item.text} data={item.text} id={counter++} onSelect={()=>onSelect(i,j)} cellColor={item.cellColor}/>
                        ))
                    ))
                }
            </div>
        </div>
    )
}

export default Grid;