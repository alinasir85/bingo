const Card=(props)=>{

    return(
        <div className="col p-0 box" onClick={props.onSelect}>
            <div className={`card card-body rounded-0 h-100 ${props.cellColor}`} style={ props.clickable ? { cursor:"pointer" } : {}}>
                <span>{props.id}</span>
                <span className="card-text">{props.data}</span>
            </div>
        </div>
    )
}

export default Card;