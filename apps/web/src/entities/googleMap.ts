declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (tokenResponse: { access_token: string }) => void;
          }) => TokenClient;
        };
      };
    };
  }

  interface TokenClient {
    requestAccessToken: (options?: { prompt?: string }) => void;
  }
}

export type GoogleMapGeocodeResult = {
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
};
