using System;
using System.Collections.Generic;
using System.IO;
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
        private IMongoCollection<BsonDocument> _coll;
        private string _collName;

        /// <summary>
        /// Initializes a new instance of the Mongo database
        /// </summary>
        /// <param name="databaseName">The database where the requested collection is located </param>
        /// <param name="collectionName">The collection where data will be pushed </param>
        public MongoDatabase(string databaseName, string collectionName)
        {
            // Create the client
            try
            {
                _client = new MongoClient(
                    Environment.GetEnvironmentVariable("ATLAS_URI")
                );
                // This checks if connection is valid
                _client.ListDatabases().ToList();
            }
            catch (MongoAuthenticationException)
            {
                System.Console.WriteLine("The connection is invalid, your credentials might have been wrong");
                Environment.Exit(0);
            }

            _db = _client.GetDatabase(databaseName);
            _coll = _db.GetCollection<BsonDocument>(collectionName);
            _collName = collectionName;
        }

        /// <summary>
        /// Insert fetched posts to the database collection
        /// </summary>
        /// <param name="posts">BSON Document list containing posts to insert to</param>
        public async Task InsertData(List<BsonDocument> posts)
        {
            await _coll.InsertManyAsync(posts);
            Console.WriteLine("Data was pushed to the database successfully");
        }

        /// <summary>
        /// Delete the collection that the object is connected to
        /// </summary>
        public async Task DeleteCollection()
        {
            Console.WriteLine("WARNING! This action will delete the data in the collection.\n If you know what you are doing, type the collection name: " + _collName);
            string input = Console.ReadLine();
            if (_collName == input)
            {
                await _db.DropCollectionAsync(_collName);
                await _db.CreateCollectionAsync(_collName);
                Console.WriteLine("Database has been wiped");
            }
            else
                Console.WriteLine("Input was not the same. Aborting...");
        }
    }
}