using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Vidly.Data;
using Vidly.Data.Connections;
using Vidly.Data.Models;


namespace Vidly.Services
{
    public class CustomersService : IDisposable
    {
        private ApplicationDbContext _context;

        public CustomersService()
        {
            this._context = new ApplicationDbContext();
        }

        public List<Customer> listAll()
        {
            return this._context.Customers.ToList();
        }

        public List<Customer> listAllFull()
        {
            return this._context.Customers.Include(c => c.MembershipType).ToList();
        }

        public List<Customer> queryAllFull(string query = null)
        {
            var customersQuery = this._context.Customers.Include(c => c.MembershipType);

            if (!String.IsNullOrWhiteSpace(query))
                customersQuery = customersQuery.Where(c => c.Name.Contains(query));

            return customersQuery
                .ToList();
        }

        public Customer getById(int id)
        {
            return this._context.Customers
                .Find(id);
        }

        public Customer getByIdFull(int id)
        {
            return this._context.Customers
                .Include(c => c.MembershipType).SingleOrDefault(c => c.Id == id);
        }

        public Customer Add(Customer customer)
        {
            var result = this._context.Customers.Add(customer);
            this._context.SaveChanges();

            return result;
        }

        public void Update(Customer customer)
        {
            var customerInDb = this._context.Customers.SingleOrDefault(c => c.Id == customer.Id);
            if (customerInDb == null)
            {
                return;
            }

            customerInDb.Name = customer.Name;
            customerInDb.Dob = customer.Dob;
            customerInDb.MembershipTypeId = customer.MembershipTypeId;
            customerInDb.IsSubscribedToNewsletter = customer.IsSubscribedToNewsletter;

            this._context.SaveChanges();
        }
        public void Update(Customer customerInDb, Customer customer)
        {

            customerInDb.Name = customer.Name;
            customerInDb.Dob = customer.Dob;
            customerInDb.MembershipTypeId = customer.MembershipTypeId;
            customerInDb.IsSubscribedToNewsletter = customer.IsSubscribedToNewsletter;

            this._context.SaveChanges();
        }


        public void Delete(int id)
        {
            var customerInDb = this._context.Customers.SingleOrDefault(c => c.Id == id);
            if (customerInDb == null)
            {
                return;
            }

            this._context.Customers.Remove(customerInDb);
            this._context.SaveChanges();
        }
        public void Delete(Customer customerInDb)
        {
            this._context.Customers.Remove(customerInDb);
            this._context.SaveChanges();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }

    }
}