function infouser(props){
    return(
        <div className="">
            <h1 className="text-slate-800 font-bold">{props.Nome}</h1>
            <p className="text-slate-600">{props.user}</p>
        </div>
    )

}
export default infouser;