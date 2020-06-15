using System;
using System.Text;

namespace Api.Services
{
    public class RandomStringService
    {
        public static string GenerateAlphaNumeric(int length, Random random)
        {
            string characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return GenerateString(length, random, characters);
        }

        public static string GenerateNumericString(int length, Random random)
        {
            string characters = "0123456789";
            return GenerateString(length, random, characters);
        }

        public static string GenerateString(int length, Random random, string characters)
        {
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[random.Next(characters.Length)]);
            }
            return result.ToString();
        }
    }
}
