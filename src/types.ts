export type EnvValue = string | number | boolean;

export interface EnvOptions {
  devDefault?: EnvValue | EnvValue[];
  isBoolean?: boolean;
  optional?: boolean;
  commaSeparated?: boolean;
  isNumber?: boolean;
  commaSeparator?: string;
}
