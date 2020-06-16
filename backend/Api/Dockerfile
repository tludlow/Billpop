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