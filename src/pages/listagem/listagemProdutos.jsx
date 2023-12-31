import React from 'react';
import { useParams} from "react-router-dom";
import getItems from "../../utilities/getItems.jsx";
import './listagemProdutos.css'
import CardProduto from "../../components/cardProduto/cardProduto.jsx";
import Loading from "../../components/loading/loading.jsx";
import {Filtro} from "./filtro.jsx";

const query = {
    'roupas': ['womens-dresses', 'mens-shirts', 'tops'],
    'joalheria': ['womens-jewellery', 'sunglasses'],
    'relogios': ['mens-watches', 'womens-watches'],
    'tenis': ['mens-shoes', 'womens-shoes']
}

const categoriaImagens = {
    'relogios': '/images/list/capa/capaWatch.jpg',
    'joalheria': '/images/list/capa/capaEarring.jpg',
    'roupas': '/images/list/capa/capaClothing.jpg',
    'tenis': '/images/list/capa/capaShoes.jpg'
}

async function getProducts(categorias){
    let produtos = []
    for (const categoria of categorias) {
        const resultado = await getItems( categoria, 5)
        produtos = [...produtos, ...resultado]
    }
    return produtos
}


function ListagemProdutos() {
    const url = useParams()
    const [produtos, setProdutos] = React.useState(null)
    React.useEffect(()=>{
        setProdutos(null)

        getProducts(query[url.categoria])
            .then((resposta)=>{
                setProdutos(resposta)
        })
    }, [url])


    return produtos !== null ? (
        <main id={'container_listagemProdutos'}>
            <header id={'header_listagem'}>
                <picture>
                    <img className={produtos[0].category} src={categoriaImagens[url.categoria]} alt=""/>
                </picture>
                <Filtro data={{produtos, setProdutos}} />
            </header>

            <article id={'listagem'}>
                {produtos.map((produto)=>{
                    return <CardProduto key={produto.id} dados={produto}/>
                })}
            </article>
        </main>
    ) : <Loading/>
}

export default ListagemProdutos;