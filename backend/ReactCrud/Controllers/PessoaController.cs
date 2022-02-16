using Microsoft.AspNetCore.Mvc;
using DAO;
using Models;
using ReactCrud.Retornos;

namespace ReactCrud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
       
        [HttpGet("{id}")]//https://localhost:7186/Pessoa/id  (GET)
        public async Task<ActionResult<Pessoa>> BuscarPorId(long id)
        {
            return await PessoaDAO.BuscarPorId(id);
        } 
        
        [HttpGet("")]//https://localhost:7186/Pessoa/  (GET)
        public async Task<ActionResult<List<Pessoa>>> BuscarTodos(long id)
        {
            Thread.Sleep(3000);
            return await PessoaDAO.BuscarTodos(id);
        }

        [HttpPost()]//https://localhost:7186/Pessoa  (POST)
        public async Task<ActionResult<bool>> Enviar(Pessoa pessoa)
        {
            try
            {
                return Ok(await PessoaDAO.Inserir(pessoa));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut()]
        public async Task<ActionResult<bool>> Editar(Pessoa pessoa)
        {
            try
            {
                return Ok(await PessoaDAO.Editar(pessoa));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete()]
        public async Task<ActionResult<bool>> Excluir(Pessoa pessoa)
        {
            try
            {
                return Ok(await PessoaDAO.Excluir(pessoa));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("enviar")]//https://localhost:7186/Pessoa/enviar  (POST)
        public bool EnviarPessoa(Pessoa pessoa)
        {
            return true;
        }

    }

}