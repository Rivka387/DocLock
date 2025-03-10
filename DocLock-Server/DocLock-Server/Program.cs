
using System.Text.Json.Serialization;
using DocLock.Core;
using DocLock.Core.IServices;
using DocLock.Service.Services;
using DocLock.Data;
using DocLock.Core.Repositories;
using DocLock.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using DocLock.Core.IRepositories;
using FluentAssertions.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DocLock.Core.DTOS;





var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Service

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileService, UserFileService>();



//Repository



builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserFileRepository, UserFileRepository>();



//Data
builder.Services.AddScoped<IDataContext, DataContext>(); // רישום IDataContext


builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer("Data Source=DESKTOP-13C4MS2;Initial Catalog=DocLock;Integrated Security=true");
});


//builder.Services.AddSingleton<DataContext>();
//

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(ProfileMapping));

//jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


