import { get, baseOptions } from './utils';
import { getApiPaths, getApiRoutes } from './functions';

class UrlObjectConfig {
  constructor(pathsConfig, options) {
    this.config = pathsConfig;
    this.options = { ...baseOptions, ...options };

    this.paths = {};
    this.routes = {};

    this.buildPaths().buildRoutes();
  }

    buildPaths = () => {
      this.paths = getApiPaths(this.config, this.options.basePath, this.options.nullPath);
      return this;
    };

    getPaths = (id) => {
      if (id) {
        return get(this.paths, id);
      }
      return this.paths;
    };

    buildRoutes = () => {
      this.routes = getApiRoutes(this.paths);
      return this;
    };

    getRoutes = (id) => {
      if (id) {
        return get(this.routes, id);
      }
      return this.routes;
    }
}

export default UrlObjectConfig;
