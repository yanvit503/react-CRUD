import react, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ItemLista from './ItemLista';
import Swal from 'sweetalert2';

function ListaItens(props) {

    const [itens, setItens] = useState([]);
    const item = props.item;

    async function HandleAdicionar() {
        await Swal.fire({
            title: 'Adicionar pessoa',
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            html:
                '<input id="adicionarNome" placeholder="Nome" class="swal2-input">' +

                '<input id="adicionarIdade" placeholder="Idade" min="0" type="number" class="swal2-input">' +

                '<input id="adicionarProfissao" placeholder="Profissão" class="swal2-input">'
            ,
            preConfirm: async () => {
                var pessoa = {
                    nome: document.getElementById('adicionarNome').value,
                    idade: document.getElementById('adicionarIdade').value,
                    profissao: document.getElementById('adicionarProfissao').value
                }

                return await fetch('https://localhost:7186/Pessoa', {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: JSON.stringify(pessoa)
                })
                    .then(response => {
                        if (!response.ok)
                            throw new Error()

                        return pessoa
                    })
                    .catch(function (error) {
                        Swal.showValidationMessage("Ocorreu um erro")
                    });
            }
        }).then(result => {
            console.log("result :  " + JSON.stringify(result))
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

    useEffect(() => {
        fetch('https://localhost:7186/pessoa', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setItens(data)
                document.getElementById('loading').style.display = 'none';
                document.getElementById('tabela').className = 'table';
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, [])

    return (
        <div>
            <h1>Lista de pessoas</h1>
            <button className='btn btn-success float-end' onClick={HandleAdicionar} >Adicionar</button>

            <div id='loading' className='text-center w-100'>
                <div id='loading' className="mt-5 spinner-border text-primary" >
                </div>
            </div>

            <table id='tabela' className='table d-none'>
                <thead>
                    <tr>
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
        </div >
    )
}

export default ListaItens;