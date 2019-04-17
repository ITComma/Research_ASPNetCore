using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vidly.Data.Connections
{
    public class SingleConnection
    {
        private SingleConnection() { }
        private static SingleConnection _ConsString = null;
        private String _String = null;

        public static string ConString
        {
            get
            {
                if (_ConsString == null)
                {
                    _ConsString = new SingleConnection { _String = SingleConnection.Connect() };
                    return _ConsString._String;
                }
                else
                    return _ConsString._String;
            }
        }

        public static string Connect()
        {
            //Build an SQL connection string
            SqlConnectionStringBuilder sqlString = new SqlConnectionStringBuilder()
            {
                DataSource = "TRUNG-LUU\\TRUNGSQLSERVER".ToString(), // Server name
                InitialCatalog = "VidlyDb",  //Database
                UserID = "sa",         //Username
                Password = "Trung1997",  //Password
            };
            //Build an Entity Framework connection string
            EntityConnectionStringBuilder entityString = new EntityConnectionStringBuilder()
            {
                Provider = "System.Data.SqlClient",
                //Metadata = "res://*/ShopModel.csdl|res://*/ShopModel.ssdl|res://*/ShopModel.msl",
                ProviderConnectionString = @"data source=TRUNG-LUU\\TRUNGSQLSERVER;initial catalog=VidlyDb;user id=sa;password=Trung1997;"// sqlString.ToString()
            };
            return entityString.ConnectionString;
        }
    }
}
