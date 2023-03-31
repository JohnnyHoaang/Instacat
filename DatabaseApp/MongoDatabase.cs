using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DatabaseApp
{
    public class MongoDatabase
    {
        private const string ENV_FILE_PATH = "../.env";
        private MongoClient _client;
        private IMongoDatabase _db;
        public string PostsCollName {get;}
        public string AdoptCollName {get;}

        /// <summary>
        /// Initializes a new instance of the Mongo database
        /// </summary>
        /// <param name="databaseName">The database where the requested collection is located </param>
        /// <param name="postsCollectionName">The collection where data will be pushed </param>
        public MongoDatabase(string databaseName, string postsCollectionName, string adoptCollectionName)
        {
            // Create the client
            try
            {
                _client = new MongoClient(
                    Environment.GetEnvironmentVariable("ATLAS_URI")
                );
                // This checks if connection is valid
                var databases = _client.ListDatabases().ToList();
                bool isThere = databases.Where(s => s.ToString().Contains(databaseName)).Any();
                if (!isThere) throw new ArgumentException("The database you specified in DatabaseInfo is not there! /ᐠ>ꞈ<ᐟ\\");

                _db = _client.GetDatabase(databaseName);

                PostsCollName = postsCollectionName;
                AdoptCollName = adoptCollectionName;
            }
            catch (MongoAuthenticationException)
            {
                Console.WriteLine("The connection is invalid, your credentials might have been wrong! /ᐠ>ꞈ<ᐟ\\");
                Environment.Exit(0);
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("The URI for the database was not found! /ᐠ>ꞈ<ᐟ\\");
                Environment.Exit(0);
            }
            catch (ArgumentException e)
            {
                Console.WriteLine(e.Message);
                Environment.Exit(0);
            }
        }

        /// <summary>
        /// Insert fetched posts to the database collection
        /// </summary>
        /// <param name="posts">BSON Document list containing posts to insert to</param>
        public async Task InsertData(List<BsonDocument> posts, string collName)
        {
            var coll = _db.GetCollection<BsonDocument>(collName);
            await coll.InsertManyAsync(posts);
            Console.WriteLine("Data was pushed to the database successfully");
        }

        /// <summary>
        /// Delete the collection that the object is connected to
        /// </summary>
        public async Task DeleteCollection()
        {
            Console.WriteLine("WARNING! This action will delete the data in the collection.\n If you know what you are doing, type \"yes\": ");
            string input = Console.ReadLine();
            if (input == "yes")
            {
                await _db.DropCollectionAsync(PostsCollName);
                await _db.DropCollectionAsync(AdoptCollName);
                await _db.CreateCollectionAsync(PostsCollName);
                await _db.CreateCollectionAsync(AdoptCollName);
                Console.WriteLine("Database has been wiped");
            }
            else
                Console.WriteLine("Input was not the same. Aborting...");
        }
    }
}