import { neon } from "@neondatabase/serverless";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _sql: any = null;

function getSql() {
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL!);
  }
  return _sql;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sql: ReturnType<typeof neon> = new Proxy((() => {}) as any, {
  get(_target, prop) {
    return getSql()[prop];
  },
  apply(_target, _thisArg, args) {
    return getSql()(...args);
  },
});

export default sql;
