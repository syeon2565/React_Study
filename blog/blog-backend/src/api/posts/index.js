const Router = require('koa-router');
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.wirte);
posts.get('/:id',postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.patch('/:id', postsCtrl.update);

export default posts;