import express from 'express';
import main from './routes/main.mjs';
import posts from './routes/post.mjs';
import likes from './routes/likes.mjs';
import addPost from './routes/uploadpost.mjs';
import auth from './routes/auth.mjs';
import editProfile from './routes/uploadprofile.mjs';
import session from 'express-session';
import dotenv from 'dotenv';
import addComment from './routes/uploadcomment.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.js';

const app = express();
dotenv.config();

app.use(express.static('../client/build'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(session({
  secret: process.env.SECRET || 'secret',
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  },
}));

app.use(express.static('../client/build'));
app.use('/api', posts);
app.use('/add', addPost);
app.use('/auth', auth);
app.use('/edit/profile', editProfile);
app.use('/comment', addComment);
app.use('/like', likes);
app.use('/edit/profile', editProfile);
app.use('/', main);

export default app;
