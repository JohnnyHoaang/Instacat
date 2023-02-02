import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const dbUrl = process.env.ATLAS_URI;

let instance
/**
 * Database object that performs mongo queries
 * @author Johnny Hoang
 */
export default class Database {

  constructor() {
    if (!instance) {
      instance = this;
      try{
        instance.client = new MongoClient(dbUrl);
      } catch {
        // Empty block for DB mock tests
      }
      instance.db = null
      instance.collection = null;
    }
    return instance;
  }
  /**
   * Connect to the database with given the database name and collection name
   * @author Johnny Hoang
   * @param {string} dbname 
   * @param {string} collName 
   */
  async connect(dbname, collName) {
    if (instance.db) {
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    instance.collection = await instance.db.collection(collName)

  }
  /**
   * Close database connection
   * @author Johnny Hoang
   */
  async close() {
    await instance.client.close();
    instance.db = null;
  }
  /**
   * Return all data from database
   * @author Johnny Hoang
   * @returns {Object} array of data from database
   */
  async readAll() {
    return await instance.collection.find().toArray();
  }
  /**
   * Inserts data to the database
   * @author Johnny Hoang
   * @param {Object} data 
   * @returns {}
   */
  async addData(data) {
    return await instance.collection.insertOne(data);
  }
}