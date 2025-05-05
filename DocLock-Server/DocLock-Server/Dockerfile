
# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["DocLock.API/DocLock-Server.API.csproj", "DocLock-Server.API/"]
COPY ["DocLock.Core/DocLock.Core.csproj", "DocLock.Core/"]
COPY ["DocLock.Data/DocLock.Data.csproj", "DocLock.Data/"]
COPY ["DocLock.Service/DocLock.Service.csproj", "DocLock.Service/"]
RUN dotnet restore "./DocLock-Server.API/DocLock-Server.API.csproj"
COPY . .
WORKDIR "/src/DocLock-Server.API"
RUN dotnet build "./DocLock-Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./DocLock-Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DocLock-Server.API.dll"]