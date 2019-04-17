using OdeToFood.Core;
using System.Collections.Generic;
using System.Text;

namespace OdeToFood.Data
{
   public interface IRestaurantData
   {
      IEnumerable<Restaurant> GetAll();

      IEnumerable<Restaurant> GetByName(string name);

      Restaurant GetById(int id);

      Restaurant Add(Restaurant newRestaurant);

      Restaurant Update(Restaurant updatedRestaurant);

      int Commit();
   }
}
