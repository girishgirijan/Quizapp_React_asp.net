using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    ParticipantId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParticipantEmail = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    ParticipantName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    TimeTaken = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => x.ParticipantId);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QnId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QnInWords = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Option1 = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Option2 = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Option3 = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Option4 = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Answer = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QnId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
