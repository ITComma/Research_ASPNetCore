namespace Vidly.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddGenre_UpdateMovie_PopulateGenreAndMovie : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Genres",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Movies", "GenreId", c => c.Int(nullable: false));
            AddColumn("dbo.Movies", "ReleaseDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Movies", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.Movies", "NumberInStock", c => c.Int(nullable: false));
            CreateIndex("dbo.Movies", "GenreId");
            AddForeignKey("dbo.Movies", "GenreId", "dbo.Genres", "Id", cascadeDelete: true);



            Sql("INSERT INTO Genres " +
                "(Name) " +
                "VALUES " +
                "('Comedy')," +
                "('Action')," +
                "('Family')," +
                "('Romance')");

            Sql("INSERT INTO Movies " +
                "(Name, GenreId, ReleaseDate, DateAdded, NumberInStock) " +
                "VALUES " +
                "('Hangover', 1, '10-01-1999', '10-20-2018', 20)," +
                "('Die Hard', 2, '02-20-2013', '10-20-2018', 10)," +
                "('The Terminator', 2, '10-10-2007', '10-20-2018', 0)," +
                "('Toy Story', 3, '10-20-2000', '10-20-2018', 100)," +
                "('Titanic', 4, '11-01-2011', '10-20-2018', 38)");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Movies", "GenreId", "dbo.Genres");
            DropIndex("dbo.Movies", new[] { "GenreId" });
            DropColumn("dbo.Movies", "NumberInStock");
            DropColumn("dbo.Movies", "DateAdded");
            DropColumn("dbo.Movies", "ReleaseDate");
            DropColumn("dbo.Movies", "GenreId");
            DropTable("dbo.Genres");
        }
    }
}
