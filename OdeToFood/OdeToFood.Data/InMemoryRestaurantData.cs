using OdeToFood.Core;
using System;
using System.Linq;
using System.Collections.Generic;

namespace OdeToFood.Data
{
   public class InMemoryRestaurantData : IRestaurantData
   {
      private List<Restaurant> _restaurants;

      public InMemoryRestaurantData()
      {
         _restaurants = new List<Restaurant>(){
            new Restaurant { Id = 1,
               Name = "Trung's Pizza",
               Location = "HCM city",
               Cuisine =CuisineType.Italian
            },
            new Restaurant { Id = 2,
               Name = "Yen's Noodle",
               Location = "Vinh city",
               Cuisine =CuisineType.None
            },
            new Restaurant { Id = 3,
               Name = "Cari",
               Location = "Ha Noi",
               Cuisine =CuisineType.Indian
            },
            new Restaurant { Id = 4,
               Name = "Burito",
               Location = "Da Nang city",
               Cuisine =CuisineType.Mexican
            },
         };
      }

      public IEnumerable<Restaurant> GetAll()
      {
         return _restaurants;
      }

      public Restaurant GetById(int id)
      {
         return _restaurants.FirstOrDefault(r => r.Id == id);
      }

      public IEnumerable<Restaurant> GetByName(string name = null)
      {
         return _restaurants.Where(r => string.IsNullOrEmpty(name) 
            || r.Name.ToLower().StartsWith(name.ToLower()))
            .OrderBy(r => r.Name);
      }

      public Restaurant Update(Restaurant updatedRestaurant)
      {
         var restaurant = _restaurants.SingleOrDefault(r => r.Id == updatedRestaurant.Id);
         if (restaurant != null)
         {
            restaurant.Name = updatedRestaurant.Name;
            restaurant.Location = updatedRestaurant.Location;
            restaurant.Cuisine = updatedRestaurant.Cuisine;
         }

         return restaurant;
      }

      public int Commit()
      {
         return 0;
      }

      public Restaurant Add(Restaurant newRestaurant)
      {
         newRestaurant.Id = _restaurants.Max(r => r.Id) + 1;
         _restaurants.Add(newRestaurant);

         return newRestaurant;
      }

      public Restaurant Delete(int id)
      {
         var restaurant = _restaurants.SingleOrDefault(r => r.Id == id);
         if (restaurant != null)
         {
            _restaurants.Remove(restaurant);
         }

         return restaurant;
      }
   }
}
