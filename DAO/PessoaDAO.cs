using DAO.Context;
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

    }
}
