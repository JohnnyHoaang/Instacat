using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DatabaseApp
{
    public class APIFileIO
    {
        private const string CAT_API_LINK = "https://api.thecatapi.com/v1/images/search";
        private const string WORD_API_LINK = "https://random-word-api.herokuapp.com/word";
        private const string PETFINDER_API_LINK = "https://api.petfinder.com/v2/";

        private const string MEDIA_TYPE = "application/json";

        private const string POSTS_FILE_NAME = "posts.bson";
        private const string ADOPT_FILE_NAME = "adopt.bson";

        private string _catApiKey;
        private string _wordApiKey;
        private string _petFinderApiKey;
        private string _petFinderApiSecret;

        public List<BsonDocument> CatPosts {get; internal set;}
        public List<BsonDocument> AdoptPosts {get; internal set;}

        /// <summary>
        /// Initializes a new instance of the helper class to fetch APIs and save data to files
        /// </summary>
        /// <param name="catApiKey"> Cat API key </param>
        /// <param name="wordApiKey"> API key for the Random Word API </param>
        /// <param name="petfinderApiKey"> PetFinder API key </param>
        public APIFileIO(string catApiKey, string wordApiKey, string petfinderApiKey, string petfinderApiSecret)
        {
            CatPosts = new List<BsonDocument>();
            AdoptPosts = new List<BsonDocument>();
            
            _catApiKey = catApiKey;
            _wordApiKey = wordApiKey;
            _petFinderApiKey = petfinderApiKey;
            _petFinderApiSecret = petfinderApiSecret;
        }

        /// <summary>
        /// Create the posts for cats, and save them to a file
        /// </summary>
        public async Task MakeCatPosts()
        {
            // Get the cat images
            var cats = GetResponseFromAPI<JArray>(
                CAT_API_LINK, 
                "?limit=10"
            ); //&api_key=" + _catApiKey 

            // Get words for captions
            var words = GetResponseFromAPI<JArray>(
                WORD_API_LINK, 
                "?number=20"
            ); // Add api key later!

            // Assemble the posts
            Random rnd = new Random();
            int index = 0;
            foreach (var cat in cats)
            {
                JObject obj = new JObject();

                obj["id"] = cat["id"];
                obj["username"] = Path.GetRandomFileName().Replace(".", "").Substring(0, 8);
                obj["image"] = cat["url"];
                obj["caption"] = words[index] + " " + words[index + 1];
                obj["hashtags"] = new JArray();
                obj["likes"] = rnd.Next(0, 10);
                obj["comments"] = new JArray();

                CatPosts.Add(BsonDocument.Parse(obj.ToString()));
                index += 2;
            }
            
            // Write the posts to a file to back up data
            await WriteToFile(POSTS_FILE_NAME, CatPosts);
            Console.WriteLine("Posts were written to file");
        }

        /// <summary>
        /// Read the cat posts from the file containing them
        /// </summary>
        public async Task ReadCatPosts() 
        {
            CatPosts = new List<BsonDocument>();
            var lines = await File.ReadAllLinesAsync(POSTS_FILE_NAME);
            foreach (string line in lines)
            {
                CatPosts.Add(BsonDocument.Parse(line));
            }
        }

        /// <summary>
        /// Create the adoption posts, and save them to a file
        /// </summary>
        public async Task MakeAdoptPosts()
        {
            // Get the Petfinder access token
            string token = await GetAccessToken();
            // Get the cats that are up for adoption
            var cats = GetResponseFromAPI<JObject>(
                PETFINDER_API_LINK + "animals", 
                "?type=cat&location=H1N&distance=250&limit=10", 
                token
            );

            foreach(var c in cats["animals"])
            {
                JObject catObj = c as JObject;
                JObject obj = new JObject();

                obj["id"] = catObj["id"];
                obj["name"] = catObj["name"];
                obj["gender"] = catObj["gender"];
                obj["tags"] = catObj["tags"];
                obj["photos"] = catObj["photos"];
                obj["url"] = catObj["url"];

                AdoptPosts.Add(BsonDocument.Parse(obj.ToString()));
            }
            await WriteToFile(ADOPT_FILE_NAME, AdoptPosts);
            Console.WriteLine("Adoption posts written to file");
        }

        /// <summary>
        /// Read the adoption from the file containing them
        /// </summary>
        public async Task ReadAdoptPosts()
        {
            AdoptPosts = new List<BsonDocument>();
            var lines = await File.ReadAllLinesAsync(ADOPT_FILE_NAME);
            foreach (string line in lines)
            {
                AdoptPosts.Add(BsonDocument.Parse(line));
            }
        }

        private async Task<string> GetAccessToken()  
        {  
            string token = "";  

            using (var client = new HttpClient())  
            {    
                client.BaseAddress = new Uri(PETFINDER_API_LINK);  

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MEDIA_TYPE));  
     
                HttpResponseMessage response = new HttpResponseMessage();  
                List<KeyValuePair<string, string>> apiParams = new List<KeyValuePair<string, string>>();  
  
                // Convert Request Params to Key Value Pair.  
                apiParams.Add(new KeyValuePair<string, string>("grant_type", "client_credentials"));
                apiParams.Add(new KeyValuePair<string, string>("client_id", _petFinderApiKey));
                apiParams.Add(new KeyValuePair<string, string>("client_secret", _petFinderApiSecret));

                // URL Request parameters.  
                HttpContent requestParams = new FormUrlEncodedContent(apiParams);  
  
                response = await client.PostAsync("oauth2/token", requestParams).ConfigureAwait(false);  
  
                // Verification  
                if (response.IsSuccessStatusCode)  
                {  
                    HttpContent responseContent = response.Content;
                    using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
                    {
                        JObject obj = JObject.Parse(await reader.ReadToEndAsync());
                        token = obj["access_token"].ToString();
                        System.Console.WriteLine("Access token obtained");
                    }
                } 
                else System.Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }  
            return token;  
        }

        private dynamic GetResponseFromAPI<T>(string url, string parameters, string accessToken = null)
        {           
            using (var client = new HttpClient())
            {
                // Add an access token, should one be passed
                if (accessToken != null)
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                client.BaseAddress = new Uri(url);

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MEDIA_TYPE));

                var response = client.GetAsync(parameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    var res = response.Content.ReadAsStringAsync().Result;
                    System.Console.WriteLine("Data successfully retrieved from the requested API");
                    return (T)JsonConvert.DeserializeObject(res);
                }
                else System.Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return null;
        }

        private async Task WriteToFile(string fileName, List<BsonDocument> list)
        {
            List<string> temp = new List<string>();

            foreach (var item in list)
                temp.Add(item.ToString());

            await File.WriteAllLinesAsync(fileName, temp);
            System.Console.WriteLine(fileName + " has been written");
        }
    }
}