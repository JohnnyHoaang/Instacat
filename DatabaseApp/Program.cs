using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DatabaseApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            const string ENV_FILE_PATH = "../.env";

            // Set up env variables (Might need some redesigning to not take ALL of them)
            if (!File.Exists(ENV_FILE_PATH))
            {
                System.Console.WriteLine(".env file not found. Exiting...");
                Environment.Exit(0);
            }

            foreach (string line in File.ReadAllLines(ENV_FILE_PATH))
            {
                int index = line.IndexOf("=");
                string envVarName = line.Substring(0, index);
                string envVar = line.Substring(index + 1);

                Environment.SetEnvironmentVariable(envVarName, envVar);
            }
            

            // Get from the Cat API
            var imagesJson = GetResponseFromAPI("https://api.thecatapi.com/v1/images/search", "?limit=3");
            foreach (JObject j in imagesJson) 
            {
                j.Remove("height");
                j.Remove("width");
            } 
            await WriteToFile("catapi_image.json", imagesJson.ToString());

            // Get from the Random Word API
            var wordsJson = GetResponseFromAPI("https://random-word-api.herokuapp.com/word", "?number=20");
            await WriteToFile("random_word.json", wordsJson.ToString());
            
            // Connect to the DB
            MongoClient dbClient = null;
            try
            {
                dbClient = new MongoClient(
                    Environment.GetEnvironmentVariable("ATLAS_URI")
                );
                // This checks if connection is valid
                dbClient.ListDatabases().ToList();
            }
            catch (MongoAuthenticationException)
            {
                System.Console.WriteLine("The connection is invalid, your credentials might have been wrong");
                Environment.Exit(0);
            }

            // Create test posts (This method might change later)
            var postsBson = CreatePosts(imagesJson, wordsJson);

            // Testing pushing to DB
            var db = dbClient.GetDatabase("test");
            var collection = db.GetCollection<BsonDocument>("posts");

            await collection.InsertManyAsync(postsBson);
            System.Console.WriteLine("Data pushed. Let's hope it's good");
        }

        public static JArray GetResponseFromAPI(string url, string parameters)
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

        public static async Task WriteToFile(string fileName, string str)
        {
            await File.WriteAllTextAsync(fileName, str);
            System.Console.WriteLine(fileName + " has been written");
        }

        public static List<BsonDocument> CreatePosts(JArray images, JArray captions)
        {
            List<BsonDocument> posts = new List<BsonDocument>();
            Random rnd = new Random();
            int index = 0;
            foreach (var image in images)
            {
                JObject obj = new JObject();

                obj["id"] = image["id"];
                obj["username"] = Path.GetRandomFileName().Replace(".", "").Substring(0, 8);
                obj["image"] = image["url"];
                obj["caption"] = captions[index] + " " + captions[index + 1];
                obj["hashtags"] = new JArray();
                obj["likes"] = rnd.Next(0, 10);
                obj["comments"] = new JArray();


                posts.Add(BsonDocument.Parse(obj.ToString()));
                index += 2;
            }
            return posts;
        }
    }
}
