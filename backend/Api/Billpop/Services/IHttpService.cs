using System.Threading.Tasks;

namespace Billpop.Services
{
    public interface IHttpService
    {
        public void AddBearerToken(string token);
        public void AddBasicToken(string token);
        public Task<T> Get<T>(string url);
        public Task<T> Post<T>(string url);
        public Task<T> Post<T>(string url, object body, string contentType = "application/json");
    }
}
