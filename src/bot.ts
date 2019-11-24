import { apiFinal } from './api';

// Either a named export or a default export will not work, Claudia.js expects a
// module.export that exports a Claudia API Builder instance.
// https://stackoverflow.com/a/41666401
module.exports = apiFinal;
