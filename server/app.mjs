import express from 'express';
import session from 'express-session';
import main from './routes/main.mjs';
import posts from './routes/post.mjs';
import likes from './routes/likes.mjs';
import addPost from './routes/uploadpost.mjs';
import deletePost from './routes/deletepost.mjs';
import auth from './routes/auth.mjs';
import admin from './routes/admin.mjs';
import editProfile from './routes/uploadprofile.mjs';
import addComment from './routes/uploadcomment.mjs';
const app = express()
app.use(express.static('../client/build'));
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
  }
}));

app.use('/api', posts);
app.use('/add', addPost);
app.use('/delete', deletePost);
app.use('/auth', auth);
app.use('/like', likes);
app.use('/comment', addComment);
app.use('/edit/profile', editProfile);
app.use('/admin', admin);
app.use('/', main);

export default app;
