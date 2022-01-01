using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web_Projekat_Sah.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Klub",
                columns: table => new
                {
                    KlubID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Mesto = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Broj_Telefona = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Broj_Igraca = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klub", x => x.KlubID);
                });

            migrationBuilder.CreateTable(
                name: "Sudija",
                columns: table => new
                {
                    SudijaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Kategorija = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sudija", x => x.SudijaID);
                });

            migrationBuilder.CreateTable(
                name: "Igrac",
                columns: table => new
                {
                    IgracID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fide = table.Column<int>(type: "int", maxLength: 6, nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Datum_rodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rejting = table.Column<int>(type: "int", nullable: false),
                    Titula = table.Column<int>(type: "int", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igrac", x => x.IgracID);
                    table.ForeignKey(
                        name: "FK_Igrac_Klub_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klub",
                        principalColumn: "KlubID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Turnir",
                columns: table => new
                {
                    TurnirID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Klub_organizatorKlubID = table.Column<int>(type: "int", nullable: true),
                    Datum_pocetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Mesto = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Nagrada = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PobednikIgracID = table.Column<int>(type: "int", nullable: true),
                    SudijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turnir", x => x.TurnirID);
                    table.ForeignKey(
                        name: "FK_Turnir_Igrac_PobednikIgracID",
                        column: x => x.PobednikIgracID,
                        principalTable: "Igrac",
                        principalColumn: "IgracID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Turnir_Klub_Klub_organizatorKlubID",
                        column: x => x.Klub_organizatorKlubID,
                        principalTable: "Klub",
                        principalColumn: "KlubID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Turnir_Sudija_SudijaID",
                        column: x => x.SudijaID,
                        principalTable: "Sudija",
                        principalColumn: "SudijaID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Mec",
                columns: table => new
                {
                    MecID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TurnirID = table.Column<int>(type: "int", nullable: true),
                    Kolo = table.Column<int>(type: "int", nullable: false),
                    BeliIgracID = table.Column<int>(type: "int", nullable: true),
                    CrniIgracID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mec", x => x.MecID);
                    table.ForeignKey(
                        name: "FK_Mec_Igrac_BeliIgracID",
                        column: x => x.BeliIgracID,
                        principalTable: "Igrac",
                        principalColumn: "IgracID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mec_Igrac_CrniIgracID",
                        column: x => x.CrniIgracID,
                        principalTable: "Igrac",
                        principalColumn: "IgracID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mec_Turnir_TurnirID",
                        column: x => x.TurnirID,
                        principalTable: "Turnir",
                        principalColumn: "TurnirID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_KlubID",
                table: "Igrac",
                column: "KlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_BeliIgracID",
                table: "Mec",
                column: "BeliIgracID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_CrniIgracID",
                table: "Mec",
                column: "CrniIgracID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_TurnirID",
                table: "Mec",
                column: "TurnirID");

            migrationBuilder.CreateIndex(
                name: "IX_Turnir_Klub_organizatorKlubID",
                table: "Turnir",
                column: "Klub_organizatorKlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Turnir_PobednikIgracID",
                table: "Turnir",
                column: "PobednikIgracID");

            migrationBuilder.CreateIndex(
                name: "IX_Turnir_SudijaID",
                table: "Turnir",
                column: "SudijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mec");

            migrationBuilder.DropTable(
                name: "Turnir");

            migrationBuilder.DropTable(
                name: "Igrac");

            migrationBuilder.DropTable(
                name: "Sudija");

            migrationBuilder.DropTable(
                name: "Klub");
        }
    }
}
