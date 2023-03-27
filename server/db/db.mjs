import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


let _instance = null;

/**
 * Class to connect to MongoDB
 */
class Mongo {
  /**
     * Checks if Mongo object already exists
     * @return {Mongo}
     */
  constructor() {
    if (_instance) {
      return _instance;
    }
    _instance = this;
  }

  /**
   * Connects to MongoDB
   */
  async connect() {
    await mongoose.connect(process.env.ATLAS_URI);
  }

  /**
   * Disconnects from MongoDB
   */
  async disconnect() {
    await mongoose.disconnect();
  }
}

export {Mongo};
