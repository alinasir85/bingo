import Card from "./Card";
import {useState} from "react";

const Grid=(props)=>{

    const [gridData, setGridData] = useState(props.data);

    const onSelect =(i,j)=>{
        const clonedArray =  [...gridData];
        const selectedCell = clonedArray[i][j];
        selectedCell.selected = true;
        selectedCell.cellColor = 'bg-success';
        clonedArray[i][j] = selectedCell;
        setGridData(clonedArray);
    }

    let counter = 1;

    return(
        <div className="container text-center mt-5">
            <div className="row row-cols-5 row-cols-sm-5 row-cols-md-5 g-0">
                {
                    gridData.map((items, i)=>(
                        items.map((item, j)=>(
                            <Card data={item.text} id={counter++} onSelect={()=>onSelect(i,j)} cellColor={item.cellColor}/>
                        ))
                    ))
                }
            </div>
        </div>
    )
}

export default Grid;