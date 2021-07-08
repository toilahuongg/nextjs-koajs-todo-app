import Router from 'koa-router';

import TodoController from '../controllers/TodoController';

const router = new Router();
router.get('/', TodoController.index);
router.get('/:id', TodoController.show);
router.post('/create', TodoController.create);
router.delete('/:id', TodoController.destroy);
router.put('/:id', TodoController.update);
export default router;