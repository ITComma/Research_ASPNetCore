using System;
using System.ComponentModel.DataAnnotations;

namespace Vidly.Data.Models
{
    public class Customer
    {
        [Key] public int Id { get; set; }

        [Required(ErrorMessage = "Please enter customer's name.")]
        [StringLength(255)]
        public string Name { get; set; }

        [Display(Name="Date of Birth")]
        [Min18YearsOldIfAMember]
        public DateTime Dob { get; set; }

        [Display(Name="Subscribe to Newsletter")]
        public bool IsSubscribedToNewsletter { get; set; }

        [Required]
        [Display(Name="Membership Type")]
        public byte MembershipTypeId { get; set; }

        public MembershipType MembershipType { get; set; }
    }
}