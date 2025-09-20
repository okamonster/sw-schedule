'use client';

import type { Artist, GoogleCalendarEvent, TokenClient } from '@repo/common';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import dayjs from '@/libs/dayjs';
import { convertEventToGoogleCalendar } from '@/libs/googleCalender';
import { createGoogleCalendarEvent, getGoogleCalendarEvents } from '@/service/googleCalender';

export const useGoogleCalendarSync = (artist: Artist) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const [tokenClient, setTokenClient] = useState<TokenClient | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  // Googleカレンダー同期本体
  const syncArtistEventsToGoogleCalendar = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      let client = tokenClient;
      // futureEventsの取得
      const futureEvents = artist.events
        .map((e) => e.event)
        .filter((e) => dayjs(e.eventDate).isAfter(dayjs()));

      if (futureEvents.length === 0) {
        showErrorToast('同期するイベントがありません');
        return;
      }
      // TokenClient初期化（callbackに本処理を入れる）
      if (!client) {
        client = window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
          scope: 'https://www.googleapis.com/auth/calendar.events',
          callback: async (tokenResponse: { access_token: string }) => {
            if (!tokenResponse || !tokenResponse.access_token) {
              showErrorToast('Google認証に失敗しました');
              return;
            }
            const accessToken = tokenResponse.access_token;
            let syncedCount = 0;

            // 同期対象期間の最小・最大日付を取得
            const eventDates = futureEvents.map((e) => e.startDateTime || e.eventDate);
            const minDay = eventDates.reduce(
              (min, d) => (dayjs(d).isBefore(min) ? dayjs(d) : min),
              dayjs(eventDates[0])
            );
            const maxDay = eventDates.reduce(
              (max, d) => (dayjs(d).isAfter(max) ? dayjs(d) : max),
              dayjs(eventDates[0])
            );
            const timeMin = minDay.toISOString();
            const timeMax = maxDay.add(1, 'day').toISOString();
            // Googleカレンダーから既存イベントを取得
            const existingEvents = await getGoogleCalendarEvents(accessToken, timeMin, timeMax);
            // --- 重複排除して新規登録 ---
            for (const event of futureEvents) {
              const googleEvent = convertEventToGoogleCalendar(event);
              // タイトル完全一致で重複排除
              const isDuplicate = existingEvents.some(
                (event: GoogleCalendarEvent) => event.summary === googleEvent.summary
              );

              if (isDuplicate) {
                continue;
              }

              await createGoogleCalendarEvent(accessToken, googleEvent);
              syncedCount++;
            }

            showSuccessToast(`${syncedCount}件のイベントを同期しました`);
          },
        });
        setTokenClient(client);
      }
      client.requestAccessToken({ prompt: '' });
      return;
    } catch (error) {
      showErrorToast('同期に失敗しました');
      console.error('[SYNC] Google Calendar sync error:', error);
      return;
    } finally {
      setIsLoading(false);
    }
  }, [artist.events, tokenClient, showErrorToast, showSuccessToast]);

  return {
    syncArtistEventsToGoogleCalendar,
    isLoading,
  };
};
