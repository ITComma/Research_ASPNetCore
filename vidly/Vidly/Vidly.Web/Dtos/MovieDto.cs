using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Vidly.Data.Models;

namespace Vidly.Dtos
{
    public class MovieDto
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter movie's name.")]
        [StringLength(255)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter movie's release date.")]
        public DateTime ReleaseDate { get; set; }

        [Required(ErrorMessage = "Please enter movie's date added.")]
        public DateTime DateAdded { get; set; }

        [Required(ErrorMessage = "Please enter movie's number in stock.")]
        [Range(minimum: 0, maximum: 1000, ErrorMessage = "Please enter movie's number of stock")]
        public int NumberInStock { get; set; }

        [Required(ErrorMessage = "Please enter movie's genre.")]
        public int GenreId { get; set; }

        public GenreDto Genre { get; set; }
    }
}