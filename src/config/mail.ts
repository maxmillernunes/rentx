interface IMailConfig {
  driver: 'ethereal' | 'sendgrid' | 'aws';

  default: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  default: {
    from: {
      name: process.env.MAIL_FROM_NAME,
      email: process.env.MAIL_FROM_EMAIL,
    },
  },
} as IMailConfig;
