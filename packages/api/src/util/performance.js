import { performance, PerformanceObserver } from 'perf_hooks';

export function performanceLogger({ name, duration } = {}) {
  console.log('%s took %d ms to resolve', name, duration);
}

export function createPerformanceTimerWrapper(asyncResolver) {
  return performance.timerify(asyncResolver);
}

export async function createPerformanceCallWrapper(asyncResolver) {
  const startTime = performance.now();
  const result = await asyncResolver();
  const endTime = performance.now();
  performanceLogger({ name: fieldName, duration: endTime - startTime });
  return result;
}

export function createPerformanceObserver(processEntries = performanceLogger) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(processEntries);
  });
  observer.observe({ entryTypes: ['function'] });
  return observer;
}

export function createResolverPerformanceProxy(target, processEntries) {
  createPerformanceObserver(processEntries);
  return new Proxy(target, {
    get(resolver, fieldName) {
      return async function performanceProxy(...args) {
        return createPerformanceTimerWrapper(resolver[fieldName].bind(this, ...args))();
      };
    },
  });
}