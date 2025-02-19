import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Error: Uncaught/.test(args[0])) return;
    originalError.call(console, ...args);
  };
});

configure({ testIdAttribute: 'data-test-id' });