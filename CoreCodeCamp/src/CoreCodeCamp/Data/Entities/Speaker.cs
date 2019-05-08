using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreCodeCamp.Data.Entities
{
  public class Speaker
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string Website { get; set; }
    public string Twitter { get; set; }
    public string Blog { get; set; }
    public string Bio { get; set; }
    public string ImageUrl { get; set; }
    public string Title { get; set; }
    public string CompanyName { get; set; }
    public string CompanyUrl { get; set; }
    public string PhoneNumber { get; set; }
    public string TShirtSize { get; set; }

    public ICollection<Talk> Talks { get; set; }

    public EventInfo Event { get; set; }

    public string Slug
    {
      get
      {
        return Name.Replace(" ", "-");
      }
    }
  }
}
