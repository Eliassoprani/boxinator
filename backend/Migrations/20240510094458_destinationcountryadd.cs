using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class destinationcountryadd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: "2f5814a7-d3f6-47bf-b98c-bc578bc7abfa");

            migrationBuilder.AddColumn<string>(
                name: "DestinationCountry",
                table: "orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "DestinationCountry", "user_id" },
                values: new object[] { "Italien", "9b9fcbee-85b4-4b57-9aba-41c0fdaddb3a" });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "country_of_residence", "created_at", "date_of_birth", "Email", "EmailConfirmed", "first_name", "last_name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "phone", "PhoneNumber", "PhoneNumberConfirmed", "role", "SecurityStamp", "TwoFactorEnabled", "updated_at", "UserName", "zip_code" },
                values: new object[] { "9b9fcbee-85b4-4b57-9aba-41c0fdaddb3a", 0, "45f21c53-081c-41d6-8477-412727539d3d", "sweden", new DateTime(2024, 5, 10, 9, 44, 57, 960, DateTimeKind.Utc).AddTicks(692), new DateTime(2024, 5, 10, 9, 44, 57, 960, DateTimeKind.Utc).AddTicks(689), "admin@admin.com", false, "admin", "admin", false, null, null, null, "3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2", 555123123, null, false, 0, "535608cd-bb4c-43e8-9f9f-c5f68564bacc", false, new DateTime(2024, 5, 10, 9, 44, 57, 960, DateTimeKind.Utc).AddTicks(692), "admin", 123 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: "9b9fcbee-85b4-4b57-9aba-41c0fdaddb3a");

            migrationBuilder.DropColumn(
                name: "DestinationCountry",
                table: "orders");

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "id",
                keyValue: 1,
                column: "user_id",
                value: "2f5814a7-d3f6-47bf-b98c-bc578bc7abfa");

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "country_of_residence", "created_at", "date_of_birth", "Email", "EmailConfirmed", "first_name", "last_name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "phone", "PhoneNumber", "PhoneNumberConfirmed", "role", "SecurityStamp", "TwoFactorEnabled", "updated_at", "UserName", "zip_code" },
                values: new object[] { "2f5814a7-d3f6-47bf-b98c-bc578bc7abfa", 0, "65e21792-32ed-4132-ae7f-1026af843c70", "sweden", new DateTime(2024, 5, 8, 9, 41, 2, 570, DateTimeKind.Utc).AddTicks(155), new DateTime(2024, 5, 8, 9, 41, 2, 570, DateTimeKind.Utc).AddTicks(153), "admin@admin.com", false, "admin", "admin", false, null, null, null, "3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2", 555123123, null, false, 0, "adbd6ec6-8000-4977-81ac-ac2eb57081d8", false, new DateTime(2024, 5, 8, 9, 41, 2, 570, DateTimeKind.Utc).AddTicks(155), "admin", 123 });
        }
    }
}
