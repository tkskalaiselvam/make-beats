import Header from "./Header"

function ButtonContainer({data}) {
    return(
        <div className="btn-container">
            {data.map((item)=>{
                return <Header item={item}  />
            })}
        </div>
    )
}

export default ButtonContainer