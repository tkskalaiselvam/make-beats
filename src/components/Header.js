
function Header(props){
    return(
        <div className="btn" style={{"background":props.item.bg}}> 
            <h4>{props.item.name}</h4>
        </div>
    )
}

export default Header