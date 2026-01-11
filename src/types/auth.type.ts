export type TAuthOutletContext = {
  isError: boolean | null;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export interface AuthUser {
  token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
