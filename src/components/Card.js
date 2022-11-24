const Card=(props)=>{
/*    function handleClick(event) {
        if(event.target.textContent !== "Conf call bingo") {
            if (event.target.style.textDecoration) {
                event.target.style.removeProperty('text-decoration');
            } else {
                event.target.style.setProperty('text-decoration', 'line-through');
            }
        }
    }*/

    return(
        <div className="col p-0 box" onClick={props.onSelect}>
            <div className={`card card-body rounded-0 h-100 ${props.cellColor}`} style={{cursor:"pointer"}}>
                <span>{props.id}</span>
                <span className="card-text">{props.data}</span>
            </div>
        </div>
    )
}

export default Card;