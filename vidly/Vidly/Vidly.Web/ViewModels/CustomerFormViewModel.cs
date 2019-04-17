using System.Collections.Generic;
using Vidly.Data.Models;

namespace Vidly.Web.ViewModels
{
    public class CustomerFormViewModel
    {
        public IEnumerable<MembershipType> MembershipTypes { get; set; }

        public Customer Customer { get; set; }

        public string Title
        {
            get { return (this.Customer.Id != 0) ? "Edit Customer" : "Create Customer"; }
        }
    }
}