import express from 'express';
import main from './routes/main.mjs';
import posts from './routes/post.mjs';
import likes from './routes/likes.mjs';
import addPost from './routes/uploadpost.mjs';
import auth from './routes/auth.mjs';
import editProfile from './routes/uploadprofile.mjs';
import session from 'express-session';
import connectMongodbSession from 'connect-mongodb-session';

const MongoDBStore = connectMongodbSession(session);
const app = express();

// TODO change database name and collection name to envar
const store = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  databaseName: 'test',
  collection: 'sessions',
});


// Catches session store errors
store.on('error', function(error) {
  console.log(error);
});

// Creates a new session
app.use(session({
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1800000, // Expires after 30 minute
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  },
  store: store,
}));

app.use(express.static('../client/build'));
app.use('/api', posts);
app.use('/add', addPost);
app.use('/auth', auth);
app.use('/like', likes);
app.use('/edit/profile', editProfile);
app.use('/', main);

export default app;
