using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood.Pages.Restaurants
{
   public class ListModel : PageModel
   {
      private readonly ILogger<ListModel> _logger;
      private readonly RestaurantListSettings _config;
      private readonly IRestaurantData _restaurantData;

      public string Message { get; set; }
      public IEnumerable<Restaurant> Restaurants { get; set; }

      [BindProperty(SupportsGet = true)]
      public string SearchTerm { get; set; }

      public ListModel(IOptions<AppSettings> config, 
         ILogger<ListModel> logger,
         IRestaurantData restaurantData)
      {
         // place injected component to local variable
         _config = config.Value.RestaurantList;
         _logger = logger;
         _restaurantData = restaurantData;
      }

      public void OnGet()
      {
         _logger.LogInformation("Load Restaurants-List data");
         // fetch data
         Message = _config.Message;
         Restaurants = _restaurantData.GetByName(SearchTerm);
      }
   }
}