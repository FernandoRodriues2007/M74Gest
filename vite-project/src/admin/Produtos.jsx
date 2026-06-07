function Cards(props) {
    return (
        <div>
            <div className="border rounded-lg p-4 mb-4">
                <div className="border-b roundedm-md w-full h-1/2">
                    <div className="w-full h-full flex items-center justify-center p-2">
                        <img src={props.image} alt={props.title} className="max-w-full max-h-full" />
                    </div>
                </div>
            </div>
            <div className="w-full h-1/2">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
        
    )
}
function Produtos() {

    return (
        <div>
            <h1>Produtos</h1>
            <Cards title="Produto 1" description="Descrição do produto 1" image="/path/to/image1.jpg" />
            <Cards title="Produto 2" description="Descrição do produto 2" image="/path/to/image2.jpg" />
            <Cards title="Produto 3" description="Descrição do produto 3" image="/path/to/image3.jpg" />
            <Cards title="Produto 4" description="Descrição do produto 4" image="/path/to/image4.jpg" />
            <Cards title="Produto 5" description="Descrição do produto 5" image="/path/to/image5.jpg" />
            
        </div>
    );
}

export default Produtos;