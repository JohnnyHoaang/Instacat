using System;
using System.IO;
using System.Threading.Tasks;

namespace DatabaseApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            const string ENV_FILE_PATH = "../.env";
            const string CAT_API_LINK = "https://api.thecatapi.com/v1/images/search";
            const string WORD_API_LINK = "https://random-word-api.herokuapp.com/word";
            
            string dbName = DatabaseInfo.Name;
            string postsCollName = DatabaseInfo.PostsCollName;
            string adoptCollName = DatabaseInfo.AdoptCollName;

            // Set up env variables
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

            Console.WriteLine("Credentials obtained. Connecting...  /ᐠ–ꞈ–ᐟ\\");
            MongoDatabase mdb = new MongoDatabase(dbName, postsCollName, adoptCollName);
            Console.WriteLine("\nInstaCat Database App --- Connected! /ᐠ.｡.ᐟ\\ᵐᵉᵒʷˎˊ˗");
            
            // TODO: Add the API keys as environment variables
            APIFileIO apiTool = new APIFileIO(
                Environment.GetEnvironmentVariable("CAT_API_KEY"),
                Environment.GetEnvironmentVariable("PETFINDER_ID"),
                Environment.GetEnvironmentVariable("PETFINDER_SECRET")
            );

            APIMetrics m = new APIMetrics();
            
            while (true) {
                Console.WriteLine("What would you like to do today?:\n\t1 - Fetch and save data to create posts\n\t2 - Push saved data to the DB collection\n\t3 - Flush data from collection\n\t4 - External API Performance Tests (This can take a while!)\n\t5 - Exit App\n");
                string input = Console.ReadLine();
                switch (input) {
                    case "1":
                        await apiTool.MakeCatPosts();
                        await apiTool.MakeAdoptPosts();
                        break;
                    case "2":
                        await apiTool.ReadCatPosts();
                        await apiTool.ReadAdoptPosts();

                        var catPosts = apiTool.CatPosts;
                        var adoptPosts = apiTool.AdoptPosts;
                        if (catPosts.Count != 0 || adoptPosts.Count != 0)
                        {
                            await mdb.InsertData(catPosts, mdb.PostsCollName);
                            await mdb.InsertData(adoptPosts, mdb.AdoptCollName);
                        }
                        else
                            Console.WriteLine("No data to push");
                        break;
                    case "3":
                        await mdb.DeleteCollection();
                        break;
                    case "4":
                        Console.WriteLine("External API load testing. Grab yourself something to drink while you wait /^.w.^\\\n");
                        await m.StressTestAPI(CAT_API_LINK, "Cat");
                        await m.StressTestAPI(WORD_API_LINK, "Word");
                        break;
                    case "5":
                        Console.WriteLine("Stay PAWsitive! /ᐠ｡ꞈ｡ᐟ\\");
                        Environment.Exit(0);
                        break;
                    default:
                        Console.WriteLine("That's not a meowption...\n");
                        break;
                }
            }   
        }
    }
}
