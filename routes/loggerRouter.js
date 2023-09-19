import { Router } from 'express';
import toAsyncRouter from 'async-express-decorator';

const router = toAsyncRouter(Router());

router.get('/', (req, res) => {
	req.logger.info('Info');
  req.logger.debug('Debug');
  req.logger.http('HTTP');
	req.logger.warn('Warning');
	req.logger.error('Error');
  req.logger.fatal('Fatal');
  res.status(200).send('test success');
});

export default router;