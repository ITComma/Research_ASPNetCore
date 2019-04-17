using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vidly.Data.Models
{
    public class MembershipType
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public short SignUpFee { get; set; }

        public byte DurationInMonths { get; set; }

        public byte DiscountRate { get; set; }

        public static readonly byte Member = 1;
        public static readonly byte PayAsYouGo = 2;
        public static readonly byte Monthly = 3;
        public static readonly byte Yearly = 4;

    }
}
