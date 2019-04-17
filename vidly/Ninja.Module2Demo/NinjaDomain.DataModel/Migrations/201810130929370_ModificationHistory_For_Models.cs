namespace NinjaDomain.DataModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModificationHistory_For_Models : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clans", "DateTimeModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.Clans", "DateCreated", c => c.DateTime(nullable: false));
            AddColumn("dbo.Clans", "IsDirty", c => c.Boolean(nullable: false));
            AddColumn("dbo.Ninjas", "DateTimeModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.Ninjas", "DateCreated", c => c.DateTime(nullable: false));
            AddColumn("dbo.Ninjas", "IsDirty", c => c.Boolean(nullable: false));
            AddColumn("dbo.NinjaEquipments", "DateTimeModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.NinjaEquipments", "DateCreated", c => c.DateTime(nullable: false));
            AddColumn("dbo.NinjaEquipments", "IsDirty", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.NinjaEquipments", "IsDirty");
            DropColumn("dbo.NinjaEquipments", "DateCreated");
            DropColumn("dbo.NinjaEquipments", "DateTimeModified");
            DropColumn("dbo.Ninjas", "IsDirty");
            DropColumn("dbo.Ninjas", "DateCreated");
            DropColumn("dbo.Ninjas", "DateTimeModified");
            DropColumn("dbo.Clans", "IsDirty");
            DropColumn("dbo.Clans", "DateCreated");
            DropColumn("dbo.Clans", "DateTimeModified");
        }
    }
}
