namespace Vidly.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateCustomerDayOfBirth : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Dob", c => c.DateTime(nullable: false));

            Sql("UPDATE Customers " +
                "SET Dob = '01-20-1988' " +
                "WHERE Id = 1"); 
            Sql("UPDATE Customers " +
                "SET Dob = '12-21-1974' " +
                "WHERE Id = 2");
            Sql("UPDATE Customers " +
                "SET Dob = '04-08-1990' " +
                "WHERE Id = 3");
            Sql("UPDATE Customers " +
                "SET Dob = '03-18-1979' " +
                "WHERE Id = 4");
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "Dob");
        }
    }
}
