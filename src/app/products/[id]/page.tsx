interface ProductDetailsPageParams {
    params: {
        id: string;
    };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageParams) {
    const { id } = params;

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            <p>Você está visualizando o produto com ID: {id}</p>
        </div>
    );
}