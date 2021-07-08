import 'dotenv/config';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import next from 'next';
import apiRouter from './routers/api.router';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("> Database connected");
});
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(bodyParser());
  router.use('/api',apiRouter.routes());
  router.all('(.*)', async (ctx: Context) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  })
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  })
  
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  })
})
