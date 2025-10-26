declare namespace google.accounts.id {
    function initialize(config: {
      client_id: string;
      callback: (response: CredentialResponse) => void;
    }): void;
    function renderButton(element: HTMLElement, options: {
      theme?: 'outline' | 'filled_blue' | 'filled_black';
      size?: 'small' | 'medium' | 'large';
    }): void;
  
    interface CredentialResponse {
      credential: string;
      select_by?: string;
      clientId?: string;
    }
  }