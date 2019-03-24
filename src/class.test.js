import UrlObjectConfig from './class';

const options = {
  basePath: '/api/testing',
  nullPath: 'default',
};

describe('class', () => {
  it('should test basic config', () => {
    const paths = new UrlObjectConfig({
      default: true,
    }, options);

    expect(paths.getPaths('default')).toEqual('/api/testing');
    expect(paths.getRoutes('default')).toEqual('/api/testing');
  });

  it('should test dynamic path', () => {
    const paths = new UrlObjectConfig({
      banana: '/banana/:id/banana',
    }, options);

    expect(paths.getPaths('banana')).toEqual('/api/testing/banana/:id/banana');
    expect(typeof paths.getRoutes('banana')).toEqual('function');
    expect(paths.getRoutes('banana')({ id: 4 })).toEqual('/api/testing/banana/4/banana');
  });

  it('should test nested path', () => {
    const paths = new UrlObjectConfig({
      default: {
        nested: {
          further: true,
        },
      },
    }, options);
    expect(paths.getRoutes().default.nested.further).toEqual('/api/testing/default/nested/further');
    expect(paths.getRoutes('default.nested.further')).toEqual('/api/testing/default/nested/further');
  });

  it('should test combined shallow, deep', () => {
    const paths = new UrlObjectConfig({
      default: {
        shallow: true,
        deep: {
          somewhat: true,
          nested: {
            default: true,
            additionalPath: {
              nestedFurther: true,
              withParams: '/some/:id/params',
              withString: '/someOtherPath',
            },
          },
        },
      },
    }, options);
    expect(paths.getRoutes().default.shallow).toEqual('/api/testing/default/shallow');
    expect(paths.getRoutes().default.deep.somewhat).toEqual('/api/testing/default/deep/somewhat');
    expect(paths.getRoutes().default.deep.nested.default).toEqual('/api/testing/default/deep/nested');
    expect(paths.getRoutes().default.deep.nested.additionalPath.nestedFurther).toEqual('/api/testing/default/deep/nested/additionalPath/nestedFurther');
    expect(typeof paths.getRoutes().default.deep.nested.additionalPath.withParams).toEqual('function');
    expect(paths.getRoutes().default.deep.nested.additionalPath.withParams({ id: 4 })).toEqual('/api/testing/default/deep/nested/additionalPath/some/4/params');
    expect(paths.getRoutes().default.deep.nested.additionalPath.withString).toEqual('/api/testing/default/deep/nested/additionalPath/someOtherPath');
  });
});
