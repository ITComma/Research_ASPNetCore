using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vidly.Data;
using Vidly.Data.Models;

namespace Vidly.Services
{
    public class MembershipTypesService : IDisposable
    {
        private ApplicationDbContext _context;


        public MembershipTypesService()
        {
            this._context = new ApplicationDbContext();
        }

        public List<MembershipType> listAll()
        {
            return this._context.MembershipTypes.ToList();
        }

        public void Dispose()
        {
            this._context.Dispose();
       }
    }
}