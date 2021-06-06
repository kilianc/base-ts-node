import './lib/process'

import { config } from './lib/config'
import { logger } from './lib/logger'

logger.setIndent(config.LOG_INDENT)
logger.info({ message: 'Hello World', config })
