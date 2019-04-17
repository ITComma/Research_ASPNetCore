using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood.Pages.Restaurants
{
   public class ListModel : PageModel
   {
      private IConfiguration _config { get; set; }
      private IRestaurantData _restaurantData { get; set; }

      public string Message { get; set; }
      public IEnumerable<Restaurant> Restaurants { get; set; }

      [BindProperty(SupportsGet = true)]
      public string SearchTerm { get; set; }

      public ListModel(IConfiguration config, IRestaurantData restaurantData)
      {
         // place injected component to local variable
         _config = config;
         _restaurantData = restaurantData;
      }

      public void OnGet()
      {
         // fetch data
         Message = _config["Message"];
         Restaurants = _restaurantData.GetByName(SearchTerm);
      }
   }
}