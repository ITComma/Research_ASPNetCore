using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vidly.Data;
using Vidly.Data.Models;

namespace Vidly.Services
{
    public class GenresService : IDisposable
    {
        private ApplicationDbContext _context;



        public GenresService()
        {
            this._context = new ApplicationDbContext();
        }

        public List<Genre> listAll()
        {
            return this._context.Genres.ToList();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }
    }
}