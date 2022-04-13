export interface PostgresError {
  length: number;
  name: "error";
  severity: "ERROR";
  code: string;
  detail: string;
  schema: string;
  table: string;
  constraint: "unique_url_slug" | string;
  file: string;
  line: string;
  routine: string;
}

export function isPostgresError(error: any): error is PostgresError {
  return error && error.hasOwnProperty('constraint') && error.hasOwnProperty('severity');
}