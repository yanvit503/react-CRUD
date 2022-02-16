import react, { useState } from 'react'
import Swal from 'sweetalert2';

function ItemLista(props) {

    const [item, setItem] = useState(props.item);
    const handleEditar = props.handleEditar;
    const handleExcluir = props.handleExcluir;

    async function ExcluirItem(item) {
        await Swal.fire({
            title: `Deseja excluir ${item.nome} ?`,
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {

                return await fetch('https://localhost:7186/Pessoa', {
                    method: 'DELETE',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: JSON.stringify(item)
                })
                    .then(response => {
                        if (!response.ok)
                            throw new Error()

                        return item
                    })
                    .catch(function (error) {
                        Swal.showValidationMessage("Ocorreu um erro")
                    });
            }
        }).then((result) => {
            if (result.isConfirmed)
                handleExcluir(item)
        })
    }

    async function Editaritem(item) {
        await Swal.fire({
            title: 'Editar pessoa',
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            html:
                `<input id="editorNome" placeholder="Nome" value="${item.nome}" class="swal2-input">` +

                `<input id="editorIdade" placeholder="Idade" min="0" value="${item.idade}" type="number" class="swal2-input">` +

                `<input id="editorProfissao" placeholder="Profissão" value="${item.profissao}" class="swal2-input">`
            ,
            preConfirm: async () => {
                var pessoa = {
                    id: item.id,
                    nome: document.getElementById('editorNome').value,
                    idade: document.getElementById('editorIdade').value,
                    profissao: document.getElementById('editorProfissao').value
                }

                return await fetch('https://localhost:7186/Pessoa', {
                    method: 'PUT',
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
        }).then((result) => {
            if (result.isConfirmed) {
                handleEditar(result.value)
            }
        })
    }

    return (
        <tr key={item.id}>
            <td><input type="checkbox" className="form-check-input pt-2" /></td>
            <td>{item.nome}</td>
            <td>{item.idade}</td>
            <td>{item.profissao}</td>
            <td><button onClick={() => { Editaritem(item) }} className='btn btn-warning'>Editar</button></td>
            <td><button onClick={() => { ExcluirItem(item) }} className='btn btn-danger'>Excluir</button></td>
        </tr>
    )
}

export default ItemLista;