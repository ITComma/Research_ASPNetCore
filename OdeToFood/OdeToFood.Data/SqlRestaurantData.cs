using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using OdeToFood.Core;
using OdeToFood.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace OdeToFood.Data
{
   public class SqlRestaurantData : IRestaurantData
   {
      private readonly OdeToFoodDbContext _context;

      public SqlRestaurantData(OdeToFoodDbContext context)
      {
         _context = context;
      }

      public Restaurant Add(Restaurant newRestaurant)
      {
         _context.Restaurants.Add(newRestaurant);
         return newRestaurant;
      }

      public int Commit()
      {
         return _context.SaveChanges();
      }

      public Restaurant Delete(int id)
      {
         var restaurant = GetById(id);
         if(restaurant != null)
         {
            _context.Restaurants.Remove(restaurant);
         }

         return restaurant;
      }

      public IEnumerable<Restaurant> GetAll()
      {
         return _context.Restaurants;
      }

      public Restaurant GetById(int id)
      {
         return _context.Restaurants.Find(id);
      }

      public IEnumerable<Restaurant> GetByName(string name)
      {
         return _context.Restaurants
            .Where(r => string.IsNullOrEmpty(name) || r.Name.StartsWith(name))
            .OrderBy(r => r.Name);
      }

      public Restaurant Update(Restaurant updatedRestaurant)
      {
         var entity = _context.Attach(updatedRestaurant);
         entity.State = EntityState.Modified;

         return updatedRestaurant;
      }
   }
}
