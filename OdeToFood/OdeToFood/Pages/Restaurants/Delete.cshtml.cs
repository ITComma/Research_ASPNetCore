using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood.Pages.Restaurants
{
   public class DeleteModel : PageModel
   {
      private readonly IRestaurantData _restaurantData;

      public Restaurant Restaurant { get; set; }

      public DeleteModel(IRestaurantData restaurantData) 
      {
         _restaurantData = restaurantData;
      }

      public IActionResult OnGet(int restaurantId)
      {
         Restaurant = _restaurantData.GetById(restaurantId);
         if(Restaurant == null)
         {
            return RedirectToAction("./NotFound");
         }
         return Page();
      }

      public IActionResult OnPost(int restaurantId)
      {
         var restaurant = _restaurantData.Delete(restaurantId);
         if(Restaurant == null)
         {
            return RedirectToAction("./NotFound");
         }

         int result = _restaurantData.Commit();
         if (result <= 0)
         {
            TempData["Message"] = "Restaurant was deleted fail!";
         }
         else
         {
            TempData["Message"] = "Restaurant was deleted successfully!";
         }
         return RedirectToPage("./Detail", new { restaurantId = Restaurant.Id });
      }
   }
}