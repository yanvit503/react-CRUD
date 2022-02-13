import react, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ItemLista from './ItemLista';
import Swal from 'sweetalert2';

const itemTeste = {
    id: 1,
    nome: 'Yan Vitor',
    idade: 21,
    profissao: 'Dev Fullstack'
}

function ListaItens(props) {

    const [itens, setItens] = useState([itemTeste]);
    const item = props.item;

    async function HandleAdicionar() {
        await Swal.fire({
            title: 'Adicionar pessoa',
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            html:
                '<input id="adicionarNome" placeholder="Nome" class="swal2-input">' +

                '<input id="adicionarIdade" placeholder="Idade" min="0" type="number" class="swal2-input">' +

                '<input id="adicionarProfissao" placeholder="Profissão" class="swal2-input">'
            ,
            preConfirm: () => {
                return {
                    id: Math.random(),
                    nome: document.getElementById('adicionarNome').value,
                    idade: document.getElementById('adicionarIdade').value,
                    profissao: document.getElementById('adicionarProfissao').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed)
                setItens([...itens, result.value]);
        })
    }

    function HandleEditarItemLista(item) {

        let objIndex = itens.findIndex((obj => obj.id == item.id));

        itens[objIndex] = item;

        setItens([])
        setItens(itens)
    }

    function HandleEcluirItemLista(item) {
        var arrayFiltrado = itens.filter(obj => { return obj.id != item.id })

        setItens([])
        setItens(arrayFiltrado)
    }

    return (
        <div>
            <h1>Lista de pessoas</h1>
            <button className='btn btn-success float-end' onClick={HandleAdicionar} >Adicionar</button>
            <table className='table'>
                <thead>
                    <tr key={1}>
                        <th />
                        <th scope="col" className='d-none'>id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Idade</th>
                        <th scope="col">Profissão</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody id="tbody">
                    {
                        itens.map(item =>
                            <ItemLista item={item} handleEditar={HandleEditarItemLista} handleExcluir={HandleEcluirItemLista} />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListaItens;