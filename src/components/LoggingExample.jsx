
import React from 'react';
import { createLogger } from '../utils';

const logger = createLogger('UIComponent', 'DEBUG');

const LoggingExample = () => {
  React.useEffect(() => {
    logger.debug('Component mounted');
    logger.info('Important information');
    logger.warn('Warning message');
    logger.error('Error occurred', new Error('Test error'));
  }, []);

  return <div>Check console for logs</div>;
};

export default LoggingExample;
