using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Web.Http;
using AutoMapper;
using Vidly.Data.Models;
using Vidly.Dtos;
using Vidly.Services;

namespace Vidly.Web.Controllers.Api
{
    public class CustomersController : ApiController
    {
        private CustomersService customersService;

        public CustomersController()
        {
            this.customersService = new CustomersService();
        }

        [HttpGet]
        public IHttpActionResult GetCustomers(string query = null)
        {
            var customerDtos = this.customersService
                .queryAllFull(query)
                .Select(Mapper.Map<CustomerDto>);

            return Ok(customerDtos);
        }

        [HttpGet]
        public IHttpActionResult GetCustomer(int id)
        {
            var customer = this.customersService.getById(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<CustomerDto>(customer));
        }

        [HttpPost]
        public IHttpActionResult CreateCustomer(CustomerDto customerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var customer = Mapper.Map<Customer>(customerDto);
            this.customersService.Add(customer);

            customerDto.Id = customer.Id;
            return Created(new Uri(Request.RequestUri + "/" + customer.Id), customerDto);
        }

        [HttpPut]
        public void UpdateCustomer(int id, CustomerDto customerDto)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var customerInDb = this.customersService.getById(id);
            if (customerInDb == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var customer = Mapper.Map<Customer>(customerDto);
            this.customersService.Update(customerInDb, customer);
        }

        [HttpDelete]
        public void DeleteCustomer(int id)
        {
            var customerInDb = this.customersService.getById(id);
            if (customerInDb == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            this.customersService.Delete(customerInDb);
        }
    }
}
