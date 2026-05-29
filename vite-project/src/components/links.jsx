function Links(props){
    return(
        <a href={props.Href} className="flex gap-4 items-center text-white p-3 rounded-md transition duration-700 hover:text-slate-800 hover:bg-white">{props.Text} {props.Icon && <props.Icon className="w-5 h-5" />}</a>

    )
}
export default Links;