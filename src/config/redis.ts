interface IRedisConfig {
  redis: {
    host: string;
    port: number;
    password: string;
  };
}

export default {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
} as IRedisConfig;
