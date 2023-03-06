﻿using System;
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
            // Might change this to take input instead
            string dbName = DatabaseInfo.Name;
            string postsCollName = DatabaseInfo.PostsCollName;

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

            MongoDatabase mdb = new MongoDatabase(dbName, postsCollName, "");
            Console.WriteLine("InstaCat Database App --- Connected! (=^-ω-^=)");
            
            APIFileIO apiTool = new APIFileIO(
                "",
                "",
                Environment.GetEnvironmentVariable("PETFINDER_ID"),
                Environment.GetEnvironmentVariable("PETFINDER_SECRET")
            );
            
            while (true) {
                Console.WriteLine("What would you like to do today?:\n\t1 - Fetch and save data to create posts\n\t2 - Push saved data to the DB collection\n\t3 - Flush data from collection\n\t4 - Exit App\n");
                string input = Console.ReadLine();
                switch (input) {
                    case "1":
                        await apiTool.MakeCatPosts();
                        break;
                    case "2":
                        await apiTool.ReadCatPosts();
                        var posts = apiTool.CatPosts;
                        if (posts.Count != 0)
                        {
                            await mdb.InsertData(posts, mdb.PostsCollName);
                        }
                        else Console.WriteLine("No data to push");
                        break;
                    case "3":
                        await mdb.DeleteCollection();
                        break;
                    case "4":
                        Console.WriteLine("Stay PAWsitive! /ᐠ｡ꞈ｡ᐟ\\");
                        Environment.Exit(0);
                        break;
                    case "5":
                        await apiTool.GetAuthorizeToken();
                        break;
                    default:
                        Console.WriteLine("That's not a meowption...\n");
                        break;
                }
            }   
        }
    }
}
