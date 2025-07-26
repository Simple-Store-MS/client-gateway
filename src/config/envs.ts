import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;

  PORT: number;

  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

const envsSchema = joi
  .object({
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const result = envsSchema.validate(process.env);

if (result.error) {
  throw new Error(`Config validations error ${result.error.message}`);
}

const envVars = result.value as EnvVars;

export const envs = {
  port: envVars.PORT,
  ordersMS: {
    host: envVars.ORDERS_MS_HOST,
    port: envVars.ORDERS_MS_PORT,
  },
  productsMS: {
    host: envVars.PRODUCTS_MS_HOST,
    port: envVars.PRODUCTS_MS_PORT,
  },
};
