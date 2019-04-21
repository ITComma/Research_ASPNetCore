using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OdeToFood
{
   public class AppSettings
   {
      public RestaurantListSettings RestaurantList { get; set; }
   }

   public class RestaurantListSettings
   {
      public string Message { get; set; }
   }
}
