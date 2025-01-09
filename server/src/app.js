const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.router');
const tokensRouter = require('./routes/tokensRouter');
const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');
const answerRouter = require('./routes/answer.router');
const moduleRouter = require('./routes/module.router');
const progressRouter = require('./routes/progress.router');
const achievementRouter = require('./routes/achievement.router');
const userAchievementRouter = require('./routes/userAchievement.router');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/answers', answerRouter);
app.use('/api/modules', moduleRouter);
app.use('/api/progress', progressRouter);
app.use('/api/achievements', achievementRouter);
app.use('/api/user-achievements', userAchievementRouter);


module.exports = app;
