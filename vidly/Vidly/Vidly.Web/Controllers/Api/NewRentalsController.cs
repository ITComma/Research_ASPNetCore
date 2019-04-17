using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vidly.Data.Models;
using Vidly.Services;
using Vidly.Web.Dtos;
using Vidly.Web.Services;

namespace Vidly.Web.Controllers.Api
{
    public class NewRentalsController : ApiController
    {
        private CustomersService customersService;
        private MoviesService moviesService;
        private RentalsService rentalsService;

        public NewRentalsController()
        {
            this.customersService = new CustomersService();
            this.moviesService = new MoviesService();
            this.rentalsService = new RentalsService();
        }


        [HttpPost]
        public IHttpActionResult CreateNewRentals(NewRentalDto newRental)
        {
            if (newRental.MovieIds == null || newRental.MovieIds.Count == 0)
            {
                return BadRequest("No movie Ids have been given.");
            }

            var customer = this.customersService.getById(newRental.CustomerId);

            if (customer == null)
            {
                return BadRequest("Invalid customer ID.");
            }

            var movies = this.moviesService.listAllByIds(newRental.MovieIds);

            if (movies.Count != newRental.MovieIds.Count)
            {
                return BadRequest("One or more are invalid");
            }

            foreach (var movie in movies)
            {
                if (movie.NumberAvailable == 0)
                {
                    return BadRequest("Movie is not available");
                }
                movie.NumberAvailable--;

                var rental = new Rental
                {
                    Customer = customer,
                    Movie = movie,
                    DateRented = DateTime.Now
                };

                rentalsService.Add(rental);
            }

            return Ok();
        }
    }
}
