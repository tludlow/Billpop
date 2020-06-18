#Production built api image
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine3.11 AS build
WORKDIR /build
COPY /Billpop/*.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish ./Billpop/Billpop.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine3.11
WORKDIR /app
ENV ASPNETCORE_URLS http://+:5000
COPY --from=build /build/out .
ENTRYPOINT ["dotnet", "Billpop.dll"]

#Information related to running the database and having it load the entry data
#https://github.com/Microsoft/mssql-docker/issues/2

#Development image
#https://natemcmaster.com/blog/2017/11/13/dotnet-watch-and-docker/