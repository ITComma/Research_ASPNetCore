using System.Collections.Generic;
using Vidly.Data.Models;

namespace Vidly.Web.ViewModels
{
    public class MovieFormViewModel
    {
        public List<Genre> Genres { get; set; }

        public Movie Movie { get; set; }
        public string Title
        {
            get { return (this.Movie.Id != 0) ? "Edit Movie" : "Create Movie"; }
        }
    }
}