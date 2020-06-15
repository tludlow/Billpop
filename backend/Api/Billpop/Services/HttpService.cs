using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace Billpop.Services
{
    public class HttpService : IHttpService
    {
        private readonly HttpClient _client;

        public HttpService()
        {
            _client = new HttpClient();
        }

        public void AddBearerToken(string token)
        {
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        public void AddBasicToken(string token)
        {
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", token);
        }

        public async Task<T> Get<T>(string url)
        {
            Debug.WriteLine(_client.DefaultRequestHeaders);
            HttpResponseMessage response = await _client.GetAsync(url);
            string json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(json);
        }

        public async Task<T> Post<T>(string url)
        {
            HttpResponseMessage response = await _client.PostAsync(url, null);
            string json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(json);
        }

        public async Task<T> Post<T>(string url, object body, string contentType = "application/json")
        {
            var content = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(content, Encoding.UTF8, contentType);
            HttpResponseMessage response = await _client.PostAsync(url, stringContent);
            string json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}
