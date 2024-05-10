﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class initmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "countries",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    country_name = table.Column<string>(type: "text", nullable: false),
                    multiplier = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_countries", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    first_name = table.Column<string>(type: "text", nullable: false),
                    last_name = table.Column<string>(type: "text", nullable: false),
                    date_of_birth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    phone = table.Column<int>(type: "integer", nullable: false),
                    country_of_residence = table.Column<string>(type: "text", nullable: false),
                    role = table.Column<int>(type: "integer", nullable: false),
                    zip_code = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "text", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    reciever_name = table.Column<string>(type: "text", nullable: false),
                    weight = table.Column<float>(type: "real", nullable: false),
                    box_color = table.Column<string>(type: "text", nullable: false),
                    country_id = table.Column<int>(type: "integer", nullable: false),
                    cost = table.Column<float>(type: "real", nullable: false),
                    user_id = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.id);
                    table.ForeignKey(
                        name: "FK_orders_countries_country_id",
                        column: x => x.country_id,
                        principalTable: "countries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_orders_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "countries",
                columns: new[] { "id", "country_name", "multiplier" },
                values: new object[,]
                {
                    { 1, "Sweden", 1f },
                    { 2, "Norway", 1.5f },
                    { 3, "Denmark", 2.5f }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "country_of_residence", "created_at", "date_of_birth", "Email", "EmailConfirmed", "first_name", "last_name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "phone", "PhoneNumber", "PhoneNumberConfirmed", "role", "SecurityStamp", "TwoFactorEnabled", "updated_at", "UserName", "zip_code" },
                values: new object[] { "2f5814a7-d3f6-47bf-b98c-bc578bc7abfa", 0, "65e21792-32ed-4132-ae7f-1026af843c70", "sweden", new DateTime(2024, 5, 8, 9, 41, 2, 570, DateTimeKind.Utc).AddTicks(155), new DateTime(2024, 5, 8, 9, 41, 2, 570, DateTimeKind.Utc).AddTicks(153), "admin@admin.com", false, "admin", "admin", false, null, null, null, "3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2", 555123123, null, false, 0, "adbd6ec6-8000-4977-81ac-ac2eb57081d8", false, new DateTime(2024, 5, 8, 9, 41, 2, 570, DateTimeKind.Utc).AddTicks(155), "admin", 123 });

            migrationBuilder.InsertData(
                table: "orders",
                columns: new[] { "id", "box_color", "cost", "country_id", "reciever_name", "status", "user_id", "weight" },
                values: new object[] { 1, "Red", 10f, 1, "Admin", 0, "2f5814a7-d3f6-47bf-b98c-bc578bc7abfa", 10f });

            migrationBuilder.CreateIndex(
                name: "IX_orders_country_id",
                table: "orders",
                column: "country_id");

            migrationBuilder.CreateIndex(
                name: "IX_orders_user_id",
                table: "orders",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "countries");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
