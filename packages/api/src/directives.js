import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

import {
  createPerformanceObserver,
  createPerformanceTimerWrapper,
} from './util/performance';

function createPerformanceSchemaDirective(processEntries) {
  createPerformanceObserver(processEntries);
  return class PerformanceDirectiveVisitor extends SchemaDirectiveVisitor {
    // eslint-disable-next-line class-methods-use-this
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      // eslint-disable-next-line no-param-reassign
      field.resolve = createPerformanceTimerWrapper(resolve);
    }
  };
}

export default {
  performance: createPerformanceSchemaDirective(),
};
