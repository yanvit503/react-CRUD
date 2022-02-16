using DAO.Context;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DAO
{
    public static class PessoaDAO
    {
        static ContextoDB _context = new ContextoDB();

        public static async Task<bool> Inserir(Pessoa pessoa)
        {
            await _context.Pessoas.AddAsync(pessoa);
            return await _context.SaveChangesAsync() > 0;
        }

        public static async Task<Pessoa> BuscarPorId(long id)
        {
            return await _context.Pessoas.FindAsync(id);
        }

        public static async Task<bool> Excluir(Pessoa pessoa)
        {
            _context.Entry(pessoa).State = EntityState.Detached;
            _context.Pessoas.Remove(pessoa);
            return await _context.SaveChangesAsync() > 0;
        }

        public static async Task<List<Pessoa>> BuscarTodos(long id)
        {
            return await _context.Pessoas.ToListAsync();
        }

        public static async Task<bool> Editar(Pessoa pessoa)
        {
            _context.Entry(pessoa).State = EntityState.Detached;
            _context.Pessoas.Update(pessoa);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
