const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.router');
const tokensRouter = require('./routes/tokensRouter');
const noteRouter = require('./routes/note.router');
const notebookRouter = require('./routes/notebook.router');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/notes', noteRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/notebooks', notebookRouter);


module.exports = app;
