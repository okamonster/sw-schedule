export type TokenClient = {
  requestAccessToken: (options?: { prompt?: string }) => void;
};

export type GoogleCalendarEvent = {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: string;
      minutes: number;
    }>;
  };
};

export type GoogleCalendarSyncResult = {
  success: boolean;
  message: string;
  syncedEvents?: number;
};

export type GoogleCalendarConfig = {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
};
