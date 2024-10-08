import 'dotenv/config';
import { z, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

const ConfigSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

const createConfig = (): Config => {
  try {
    return ConfigSchema.parse(process.env);
  } catch (error) {
    const { message } = fromZodError(error as ZodError);
    console.log('❌', message);
    process.exit(1);
  }
};

export const config = createConfig();
