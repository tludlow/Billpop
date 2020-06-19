using Api.Data;
using Api.Models.Domain;
using Api.Models.Requests;
using Api.Services;
using AutoFixture;
using Billpop.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Http;

namespace BillpopTests
{
    [TestFixture]
    public class UserServiceShould
    {
        private UserService _userService;

        [SetUp]
        public void Setup()
        {
            Mock<IUserRepository> userRepository = new Mock<IUserRepository>();
            Mock<IConfiguration> configuration = new Mock<IConfiguration>();
            configuration.SetupGet(x => x[It.Is<string>(s => s == "jwt:secret")]).Returns("testsecret");
            _userService = new UserService(userRepository.Object, configuration.Object);
        }
        
        [Test]
        public void ReturnNoUserExistsWhenUserNull()
        {
            string result = _userService.ValidateLoginRequest(new LoginRequest { Email = "test@email.com", Password = "fjasbk414k12b!£$" }, null);
            Assert.IsTrue(result == "No user is registered with this email");
        }

        [Test]
        public void ReturnUserOnlyRegisteredWithExternalProviderWhenPasswordNull()
        {
            string result = _userService.ValidateLoginRequest(new LoginRequest
            {
                Email = "test@email.com",
                Password = "!Test123"
            },
            new User
            {
                Email = "test@email.com",
                Password = null,
                ExternalId = "8798235"
            });
            Assert.IsTrue(result == "User has only registered with an external provider");
        }

        [Test]
        public void ReturnIncorrectPasswordWhenPasswordIncorrect()
        {
            string result = _userService.ValidateLoginRequest(new LoginRequest
            {
                Email = "test@email.com",
                Password = "NotCorrectPassword123*&^"
            },
            new User
            {
                Email = "test@email.com",
                Password = "10000:5rbQEqPx4SibVnlWOx3ufguqNJkIBNXA:t4Xk3rtvF9RECzrBoPu2XIW7eoQ=",
            });
            Assert.IsTrue(result == "Incorrect password");
        }

        [Test]
        public void ReturnNullIfValidLoginRequest()
        {
            string result = _userService.ValidateLoginRequest(new LoginRequest
            {
                Email = "test@email.com",
                Password = "!Test123"
            },
            new User
            {
                Email = "test@email.com",
                Password = "10000:5rbQEqPx4SibVnlWOx3ufguqNJkIBNXA:t4Xk3rtvF9RECzrBoPu2XIW7eoQ=",
            });
            Assert.IsTrue(result == null);
        }
    }
}