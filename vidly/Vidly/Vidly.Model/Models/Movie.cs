using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Vidly.Data.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter movie's name.")]
        [StringLength(255)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter movie's genre.")]
        [Display(Name = "Genre")]
        public int GenreId { get; set; }

        [Required(ErrorMessage = "Please enter movie's release date.")]
        [Display(Name = "Release Date")]
        public DateTime ReleaseDate { get; set; }

        [Required(ErrorMessage = "Please enter movie's date added.")]
        [Display(Name = "Date Added")]
        public DateTime DateAdded { get; set; }

        [Required(ErrorMessage = "Please enter movie's number in stock.")]
        [Range(minimum: 0, maximum: 1000, ErrorMessage = "Please enter movie's number of stock")]
        [Display(Name = "Number in Stock")]
        public int NumberInStock { get; set; }

        [Display(Name = "Number Available")]
        public byte NumberAvailable { get; set; }

        public Genre Genre { get; set; }
    }
}