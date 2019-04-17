using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vidly.Data;
using Vidly.Data.Models;

namespace Vidly.Web.Services
{
    public class RentalsService
    {
        private ApplicationDbContext _context;


        public RentalsService()
        {
            this._context = new ApplicationDbContext();
        }

        public Rental Add(Rental rental)
        {
            var result = this._context.Rentals.Add(rental);
            this._context.SaveChanges();

            return result;
        }
    }
}