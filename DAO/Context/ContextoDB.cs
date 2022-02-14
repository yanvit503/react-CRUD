using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace DAO.Context
{
    public class ContextoDB : DbContext
    {
        public ContextoDB(){}

        public DbSet<Pessoa> Pessoas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(@"Server=(LocalDb)\MSSQLLocalDB;Database=CrudReact;Integrated Security=True");
        }

    }
}
