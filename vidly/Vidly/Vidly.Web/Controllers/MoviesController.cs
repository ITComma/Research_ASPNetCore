using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Vidly.Data.Models;
using Vidly.Data.Models.Auth;
using Vidly.Services;
using Vidly.Web.ViewModels;

namespace Vidly.Web.Controllers
{
    public class MoviesController : Controller
    {
        private MoviesService moviesService = new MoviesService();
        private GenresService genresService = new GenresService();


        public ActionResult Index()
        {
            //var movies = this.moviesService.listAllFull();
            //return View(movies);
            if (User.IsInRole(RoleName.CanManageMovie))
            {
                return View("List");
            }
            else
            {
                return View("ReadOnlyList");
            }
        }

        public ActionResult Details(int id)
        {
            var movie = moviesService.getByIdFull(id);
            return View(movie);
        }

        [Authorize(Roles = RoleName.CanManageMovie)]
        public ActionResult New()
        {
            var genres = this.genresService.listAll();
            var viewModel = new MovieFormViewModel
            {
                Genres = genres,
                Movie = new Movie()
            };

            return View("MovieForm", viewModel);
        }

        [Authorize(Roles = RoleName.CanManageMovie)]
        public ActionResult Edit(int id)
        {
            var movie = this.moviesService.getById(id);
            if (movie == null)
            {
                return HttpNotFound();
            }

            var genres = this.genresService.listAll();
            var viewModel = new MovieFormViewModel
            {
                Genres = genres,
                Movie = movie
            };

            return View("MovieForm", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Movie movie)
        {
            if (!ModelState.IsValid)
            {
                var genres = this.genresService.listAll();
                var viewModel = new MovieFormViewModel
                {
                    Genres = genres,
                    Movie = movie
                };

                return View("MovieForm", viewModel);
            }

            if (movie.Id == 0)
            {
                this.moviesService.Add(movie);
            }
            else
            {
                this.moviesService.Update(movie);
            }

            return RedirectToAction("Index", "Movies");
        }


        // GET: movies/released/{year}/{month}
        public ActionResult ByReleaseDate(int year, int month)
        {
            return Content(string.Format("{0}/{1}", year, month));
        }


        [Route("movies/released/{year}/{month:regex(\\d{4}):range(1, 12)}")]
        public ActionResult ByReleaseYear(int year, int month)
        {
            return Content(string.Format("{0}/{1}", year, month));
        }




        /*
        // GET: Movies/Content
        public ActionResult Content()
        {
            return Content("Hello World!");
        }

        // GET: Movies/NotFound
        public ActionResult NotFound()
        {
            return HttpNotFound();
        }

        // GET: Movies/Empty
        public ActionResult Empty()
        {
            return new EmptyResult();
        }

        // GET: Movies/Redirect
        public ActionResult Redirect()
        {
            return RedirectToAction("Index", "Home", new { page = 1, sortBy = "name" });
        }

        public ActionResult Edit(int id)
        {
            return Content("id=" + id);
        }

        public ActionResult Index(int? pageIndex, string sortBy)
        {
            if (!pageIndex.HasValue)
            {
                pageIndex = 1;
            }
            if (string.IsNullOrWhiteSpace(sortBy))
            {
                sortBy = "Name";
            }

            return Content(string.Format("pageIndex={0}&sortBy={1}", pageIndex, sortBy));
        }
        */

    }
}