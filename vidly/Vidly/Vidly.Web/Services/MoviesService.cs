using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using Vidly.Data;
using Vidly.Data.Connections;
using Vidly.Data.Models;

namespace Vidly.Services
{
    public class MoviesService : IDisposable
    {
        private ApplicationDbContext _context = new ApplicationDbContext();

        public MoviesService()
        {
        }

        public List<Movie> listAll()
        {
            return this._context.Movies.ToList();
        }

        public List<Movie> listAllFull()
        {
            return this._context.Movies
                .Include(m => m.Genre)
                .ToList();
        }

        public List<Movie> QueryAllFull(string query = null)
        {
            var moviesQuery = this._context.Movies.Include(m => m.Genre);

            if (!String.IsNullOrWhiteSpace(query))
                moviesQuery = moviesQuery.Where(m => m.Name.Contains(query) && m.NumberAvailable > 0);

            return moviesQuery
                .ToList();
        }

        public Movie getById(int id)
        {
            return this._context.Movies.Find(id);
        }

        public Movie getByIdFull(int id)
        {
            return this._context.Movies
                .Include(m => m.Genre)
                .SingleOrDefault(m => m.Id == id);
        }

        public List<Movie> listAllByIds(List<int> ids)
        {
            return this._context.Movies.Where(
                m => ids.Contains(m.Id)).ToList();
        }

        public Movie Add(Movie movie)
        {
            movie.DateAdded = DateTime.Now;
            var result = this._context.Movies.Add(movie);
            this._context.SaveChanges();

            return result;
        }

        public void Update(Movie movie)
        {
            var movieInDb = this._context.Movies
                .SingleOrDefault(m => m.Id == movie.Id);
            if (movieInDb == null)
            {
                return;
            }

            movieInDb.Name = movie.Name;
            movieInDb.GenreId = movie.GenreId;
            movieInDb.ReleaseDate = movie.ReleaseDate;
            movieInDb.DateAdded = movie.DateAdded;
            movieInDb.NumberInStock = movie.NumberInStock;

            this._context.SaveChanges();
        }
        public void Update(Movie movieInDb, Movie movie)
        {
            movieInDb.Name = movie.Name;
            movieInDb.GenreId = movie.GenreId;
            movieInDb.ReleaseDate = movie.ReleaseDate;
            movieInDb.DateAdded = movie.DateAdded;
            movieInDb.NumberInStock = movie.NumberInStock;

            this._context.SaveChanges();
        }

        public void Delete(int id)
        {
            var movieInDb = this._context.Movies
                .SingleOrDefault(m => m.Id == id);
            if (movieInDb == null)
            {
                return;
            }

            this._context.Movies.Remove(movieInDb);
            this._context.SaveChanges();
        }

        public void Delete(Movie movieInDb)
        {
            this._context.Movies.Remove(movieInDb);
            this._context.SaveChanges();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }
    }
}