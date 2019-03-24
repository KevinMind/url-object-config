import getUrlObjectConfig from './functions';

const options = {
  basePath: '/api/testing',
  nullPath: 'default',
};

const getConfig = config => getUrlObjectConfig(options)(config);

describe('paths', () => {
  it('should test basic config', () => {
    const paths = getConfig({
      default: true,
    });
    expect(paths.default).toEqual('/api/testing');
  });

  it('should test dynamic path', () => {
    const paths = getConfig({
      banana: '/banana/:id/peel',
    });

    expect(typeof paths.banana).toEqual('function');
    expect(paths.banana({ id: 4 })).toEqual('/api/testing/banana/4/peel');
  });


  it('should test nested path', () => {
    const paths = getConfig({
      first: {
        nested: {
          further: true,
        },
      },
    });
    expect(paths.first.nested.further).toEqual('/api/testing/first/nested/further');
  });

  it('should test combined shallow, deep', () => {
    const paths = getConfig({
      first: {
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
    });
    expect(paths.first.shallow).toEqual('/api/testing/first/shallow');
    expect(paths.first.deep.somewhat).toEqual('/api/testing/first/deep/somewhat');
    expect(paths.first.deep.nested.default).toEqual('/api/testing/first/deep/nested');
    expect(paths.first.deep.nested.additionalPath.nestedFurther).toEqual('/api/testing/first/deep/nested/additionalPath/nestedFurther');
    expect(typeof paths.first.deep.nested.additionalPath.withParams).toEqual('function');
    expect(paths.first.deep.nested.additionalPath.withParams({ id: 4 })).toEqual('/api/testing/first/deep/nested/additionalPath/some/4/params');
    expect(paths.first.deep.nested.additionalPath.withString).toEqual('/api/testing/first/deep/nested/additionalPath/someOtherPath');
  });
});
