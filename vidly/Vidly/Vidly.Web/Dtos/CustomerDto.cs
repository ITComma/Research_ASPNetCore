using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Vidly.Data.Models;

namespace Vidly.Dtos
{
    public class CustomerDto
    {
        [Key] public int Id { get; set; }

        [Required(ErrorMessage = "Please enter customer's name.")]
        [StringLength(255)]
        public string Name { get; set; }

        //[Min18YearsOldIfAMember]
        public DateTime Dob { get; set; }

        public bool ISubscribedToNewsletter { get; set; }

        [Required]
        public byte MembershipTypeId { get; set; }

        public MembershipTypeDto MembershipType { get; set; }
    }
}