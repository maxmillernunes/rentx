interface IMailConfig {
  driver: 'ethereal' | 'sendgrid' | 'aws';

  config: {
    aws: {
      apiVersion: string;
      region: string;
    };
    sendgrid: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
  };

  forgot_url: string;

  default: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  forgot_url: process.env.FORGOT_MAIL_URL,

  config: {
    aws: {
      apiVersion: process.env.AWS_API_VERSION,
      region: process.env.AWS_REGION,
    },
    sendgrid: {
      host: process.env.SENDGRID_HOST,
      port: Number(process.env.SENDGRID_PORT),
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_API_KEY,
      },
    },
  },

  default: {
    from: {
      name: process.env.MAIL_FROM_NAME,
      email: process.env.MAIL_FROM_EMAIL,
    },
  },
} as IMailConfig;
