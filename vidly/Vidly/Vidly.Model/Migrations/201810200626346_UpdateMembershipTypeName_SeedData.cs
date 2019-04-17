namespace Vidly.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateMembershipTypeName_SeedData : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MembershipTypes", "Name", c => c.String(nullable: false, maxLength: 255));

            Sql("UPDATE MembershipTypes " +
                "SET Name='Member' " +
                "WHERE Id = 1"); 
            Sql("UPDATE MembershipTypes " +
                "SET Name='Pay as You Go' " +
                "WHERE Id = 2");
            Sql("UPDATE MembershipTypes " +
                "SET Name='Monthly' " +
                "WHERE Id = 3");
            Sql("UPDATE MembershipTypes " +
                "SET Name='Yearly' " +
                "WHERE Id = 4");
        }
        
        public override void Down()
        {
            DropColumn("dbo.MembershipTypes", "Name");
        }
    }
}
