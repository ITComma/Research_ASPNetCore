namespace Vidly.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PopulateCustomer : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Customers " +
                "(Name, IsSubscribedToNewsletter, MembershipTypeId) " +
                "VALUES " +
                "('John Smith', 0, 1)," +
                "('Mike Thomson', 1, 1)," +
                "('Luke Rider', 0, 2)," +
                "('Jack Howard', 1, 4)");
        }
        
        public override void Down()
        {
        }
    }
}
