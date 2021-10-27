const Router = require('koa-router');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', postCtrl.list);
posts.get('/:id',postCtrl.list);
posts.delete('/:id', postCtrl.list);
posts.put('/:id', postCtrl.list);
posts.patch('/:id', postCtrl.list);
module.exports = posts;