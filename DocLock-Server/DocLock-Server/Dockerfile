FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files
COPY ["DocLock-Server/DocLock-Server.API.csproj", "DocLock-Server/"]
COPY ["DocLock.Core/DocLock.Core.csproj", "DocLock.Core/"]
COPY ["DocLock.Data/DocLock.Data.csproj", "DocLock.Data/"]
COPY ["DocLock.Service/DocLock.Service.csproj", "DocLock.Service/"]

# Restore dependencies
RUN dotnet restore "DocLock-Server/DocLock-Server.API.csproj"

# Copy the remaining files
COPY . . 

# Build the application
WORKDIR "/src/DocLock-Server"
RUN dotnet build "DocLock-Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "DocLock-Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

# Expose the port used by Render
EXPOSE 8080

# Configure ASP.NET Core to listen on all network interfaces (0.0.0.0) and the exposed port
ENV ASPNETCORE_URLS=http://0.0.0.0:$DEFAULT_PORT

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Define entrypoint
ENTRYPOINT ["dotnet", "DocLock-Server.dll"]
