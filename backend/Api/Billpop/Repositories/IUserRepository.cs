﻿using Api.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Repositories
{
    public interface IUserRepository
    {
        public Task<User> GetUserIfEmailExists(string email);
        public Task<User> GetUserIfUsernameExists(string username);
        public Task<User> AddUser(User user);
        public User GetUserById(int id);
    }
}
