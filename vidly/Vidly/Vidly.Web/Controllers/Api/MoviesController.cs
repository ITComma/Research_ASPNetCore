using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Vidly.Data.Models;
using Vidly.Dtos;
using Vidly.Services;

namespace Vidly.Web.Controllers.Api
{
    public class MoviesController : ApiController
    {
        private MoviesService moviesService;

        public MoviesController()
        {
            this.moviesService = new MoviesService();
        }

        [HttpGet]
        public IHttpActionResult GetMovies(string query = null)
        {
            var movieDtos = this.moviesService
                .QueryAllFull(query)
                .Select(Mapper.Map<MovieDto>);
            

            return Ok(movieDtos);
        }

        [HttpGet]
        public IHttpActionResult GetMovie(int id)
        {
            var movie = this.moviesService.getById(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<MovieDto>(movie));
        }

        [HttpPost]
        public IHttpActionResult CreateMovie(MovieDto movieDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var movie = Mapper.Map<Movie>(movieDto);
            this.moviesService.Add(movie);

            movieDto.Id = movie.Id;
            return Created(new Uri(Request.RequestUri + "/" + movie.Id), movieDto);
        }

        [HttpPut]
        public void UpdateMovie(int id, MovieDto movieDto)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var movieInDb = this.moviesService.getById(id);
            if (movieInDb == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var movie = Mapper.Map<Movie>(movieInDb);
            this.moviesService.Update(movieInDb, movie);
        }

        [HttpDelete]
        public void DeleteMovie(int id)
        {
            var movieInDb = this.moviesService.getById(id);
            if (movieInDb == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            this.moviesService.Delete(movieInDb);
        }
    }
}
