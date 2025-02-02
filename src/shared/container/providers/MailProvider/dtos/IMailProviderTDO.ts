type IMailContact = {
  email: string;
  name: string;
};

type IMailProvierTDO = {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  variables: Record<string, any>;
  path: string;
};

export { IMailContact, IMailProvierTDO };
