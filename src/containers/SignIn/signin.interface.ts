export interface SignInFormProps {
  signup?: boolean;
  afterLogin?: string;
  afterLoginRefresh?: boolean;
  afterLoginStall?: boolean;
  afterLoginStallCallback?: (result: any, err?: Error) => void;
}
