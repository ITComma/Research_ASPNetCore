using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Vidly.Data.Models;
using Vidly.Services;
using Vidly.Web.ViewModels;

namespace Vidly.Web.Controllers
{
    public class CustomersController : Controller
    {
        private CustomersService customersService = new CustomersService();
        private MembershipTypesService membershipTypeService = new MembershipTypesService();


        // GET: Customers
        public ActionResult Index()
        {
            //var customers = customersService.listAllFull();
            //return View(customers);

            return View();
        }

        public ActionResult New()
        {
            var membershipTypes = this.membershipTypeService.listAll();
            var viewModel = new CustomerFormViewModel
            {
                MembershipTypes = membershipTypes,
                Customer = new Customer()
            };

            return View("CustomerForm", viewModel);
        }

        public ActionResult Edit(int id)
        {
            var customer = this.customersService.getById(id);

            if (customer == null)
            {
                return HttpNotFound();
            }

            var viewModel = new CustomerFormViewModel
            {
                MembershipTypes = this.membershipTypeService.listAll(),
                Customer = customer
            };

            return View("CustomerForm", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                var viewModel = new CustomerFormViewModel
                {
                    MembershipTypes = this.membershipTypeService.listAll(),
                    Customer = customer
                };
                return View("CustomerForm", viewModel);
            }

            if (customer.Id == 0)
            {
                this.customersService.Add(customer);
            }
            else
            {
                this.customersService.Update(customer);
            }

            return RedirectToAction("Index", "Customers");
        }

        public ActionResult Details(int id)
        {
            var customer = customersService.getByIdFull(id);
            if (customer == null)
            {
                return RedirectToAction("Index");
            }
            return View(customer);
        }
    }
}