import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

import {
  createPerformanceObserver,
  createPerformanceTimerWrapper,
} from './util/performance';

function createPerformanceSchemaDirective(processEntries) {
  createPerformanceObserver(processEntries);
  return class PerformanceDirectiveVisitor extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = createPerformanceTimerWrapper(resolve);
    }
  };
}

export default {
  performance: createPerformanceSchemaDirective(),
};
