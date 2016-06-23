import config from './config/env';
import app from './config/express';

// listen on port config.port
app.listen(config.port);

export default app;
