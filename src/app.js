import express from 'express'

import init from './middleware/init.js'
import router from './middleware/router.js'
import routeTypeParser from './middleware/routeTypeParser.js'
import redirect from './middleware/redirect.js'
import clientRendering from './middleware/clientRendering.js'
import prepareRouteFetch from './middleware/prepareRouteFetch.js'
import fetch from './middleware/fetch.js'
import renderReact from './middleware/renderReact.js'
import generateHtml from './middleware/generateHtml'
import respond from './middleware/respond.js'
import serviceUnavailable from './middleware/serviceUnavailable.js'
import cacheControl from './middleware/cacheControl.js'

import prepareErrorFetch from './middleware/prepareErrorFetch.js'

import compileConfig from './config/compileConfig.js'

import staticProvider from './staticProvider'
import errorHandler from './middleware/errorHandler.js'

export default (c, old = {}) => {
  const config = compileConfig(c, old)
  var app = express()

  app.use('/.static', staticProvider(config))

  app.use(init(config))
  app.use(router(config))
  app.use(routeTypeParser(config))
  app.use(redirect(config))
  app.use(clientRendering(config))
  app.use(prepareRouteFetch(config))
  app.use(fetch(config))
  app.use(renderReact(config))
  app.use(generateHtml(config))
  app.use(cacheControl(config))
  app.use(respond(config))

  app.use(errorHandler(prepareErrorFetch(config)))
  app.use(errorHandler(fetch(config)))
  app.use(errorHandler(renderReact(config)))
  app.use(errorHandler(generateHtml(config)))
  app.use(errorHandler(respond(config)))
  app.use(errorHandler(serviceUnavailable(config)))

  return app;
}
