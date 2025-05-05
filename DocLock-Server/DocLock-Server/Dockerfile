
    FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
    WORKDIR /app
    EXPOSE $PORT
    ENV ASPNETCORE_URLS=http://0.0.0.0:$PORT
    USER app
    
    FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
    ARG configuration=Release
    WORKDIR /src
    COPY ["DocLock-Server/DocLock-Server.API.csproj", "DocLock-Server/"]
    RUN dotnet restore "DocLock-Server/DocLock-Server.API.csproj"
    COPY . .
    WORKDIR "/src/DocLock-Server"
    RUN dotnet build "DocLock-Server.API.csproj" -c $configuration -o /app/build
    
    FROM build AS publish
    ARG configuration=Release
    RUN dotnet publish "DocLock-Server.API.csproj" -c $configuration -o /app/publish /p:UseAppHost=false
    
    FROM base AS final
    WORKDIR /app
    COPY --from=publish /app/publish .
    ENTRYPOINT ["dotnet", "DocLock-Server.API.dll"]