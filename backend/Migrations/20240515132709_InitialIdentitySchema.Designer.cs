﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240515132709_InitialIdentitySchema")]
    partial class InitialIdentitySchema
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CountryName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("country_name");

                    b.Property<float>("Multiplier")
                        .HasColumnType("real")
                        .HasColumnName("multiplier");

                    b.HasKey("Id");

                    b.ToTable("countries");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CountryName = "Sweden",
                            Multiplier = 1f
                        },
                        new
                        {
                            Id = 2,
                            CountryName = "Norway",
                            Multiplier = 1.5f
                        },
                        new
                        {
                            Id = 3,
                            CountryName = "Denmark",
                            Multiplier = 2.5f
                        });
                });

            modelBuilder.Entity("backend.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("BoxColor")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("box_color");

                    b.Property<float>("Cost")
                        .HasColumnType("real")
                        .HasColumnName("cost");

                    b.Property<int>("CountryId")
                        .HasColumnType("integer")
                        .HasColumnName("country_id");

                    b.Property<string>("DestinationCounty")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("DestinationCountry");

                    b.Property<string>("RecieverName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("reciever_name");

                    b.Property<int>("Status")
                        .HasColumnType("integer")
                        .HasColumnName("status");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("user_id");

                    b.Property<float>("Weight")
                        .HasColumnType("real")
                        .HasColumnName("weight");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("UserId");

                    b.ToTable("orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BoxColor = "Red",
                            Cost = 10f,
                            CountryId = 1,
                            DestinationCounty = "Italien",
                            RecieverName = "Admin",
                            Status = 0,
                            UserId = "147ab5dd-e09b-4eb9-9d4e-4dab868557f3",
                            Weight = 10f
                        });
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("text");

                    b.Property<string>("CountryOfResidence")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("country_of_residence");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("DateOfBirth")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("date_of_birth");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("last_name");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("text");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<int>("Phone")
                        .HasColumnType("integer")
                        .HasColumnName("phone");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<int>("Role")
                        .HasColumnType("integer")
                        .HasColumnName("role");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.Property<int>("ZipCode")
                        .HasColumnType("integer")
                        .HasColumnName("zip_code");

                    b.HasKey("Id");

                    b.ToTable("users");

                    b.HasData(
                        new
                        {
                            Id = "147ab5dd-e09b-4eb9-9d4e-4dab868557f3",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "6d610b36-9e14-4a9c-bbf9-76afcace0d16",
                            CountryOfResidence = "sweden",
                            CreatedAt = new DateTime(2024, 5, 15, 13, 27, 9, 338, DateTimeKind.Utc).AddTicks(9513),
                            DateOfBirth = "20000101",
                            Email = "admin@admin.com",
                            EmailConfirmed = false,
                            FirstName = "admin",
                            LastName = "admin",
                            LockoutEnabled = false,
                            PasswordHash = "3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2",
                            Phone = 555123123,
                            PhoneNumberConfirmed = false,
                            Role = 0,
                            SecurityStamp = "960bd2f3-56cf-4d0d-97e4-981ab856f8e4",
                            TwoFactorEnabled = false,
                            UpdatedAt = new DateTime(2024, 5, 15, 13, 27, 9, 338, DateTimeKind.Utc).AddTicks(9517),
                            UserName = "admin",
                            ZipCode = 123
                        });
                });

            modelBuilder.Entity("backend.Models.Order", b =>
                {
                    b.HasOne("backend.Models.Country", "SourceCountry")
                        .WithMany()
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SourceCountry");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
