using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DatabaseApp
{
    class Program
    {
        static void Main(string[] args)
        {
                var json = getResponseFromAPI("https://api.thecatapi.com/v1/images/search", "?limit=3");
                WriteToFile("catapi_image.json", json.ToString());

                Thread.Sleep(1000);

                json = getResponseFromAPI("https://random-word-api.herokuapp.com/word", "?number=6");
                WriteToFile("random_word.json", json.ToString());
        }

        public static JArray getResponseFromAPI(string url, string parameters)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(url);

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetAsync(parameters).Result;
            if (response.IsSuccessStatusCode)
            {
                var res = response.Content.ReadAsStringAsync().Result;
                System.Console.WriteLine("Data successfully retrieved from the requested API");
                return JsonConvert.DeserializeObject(res) as JArray;
            }
            else System.Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            return null;
        }

        public static void WriteToFile(string fileName, string str)
        {
            File.WriteAllText(fileName, str);
            System.Console.WriteLine(fileName + " has been written");
        }
    }
}
