import ExpressCache from 'express-cache-middleware'
import cacheManager from 'cache-manager'

const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: 'memory', max: 10000, ttl: 1200
    })
)

export default cacheMiddleware