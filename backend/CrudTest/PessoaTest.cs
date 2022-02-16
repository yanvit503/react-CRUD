using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAO;
using Models;
using System.Threading.Tasks;

namespace CrudTest
{
    [TestClass]
    public class PessoaTest
    {
        [TestMethod]
        public async Task Insert()
        {
            var retorno =  await PessoaDAO.Inserir(new Pessoa { Idade = 18, Nome = "Teste", Profissao = "Teste" });

            Assert.IsTrue(retorno);  
        }
    }
}