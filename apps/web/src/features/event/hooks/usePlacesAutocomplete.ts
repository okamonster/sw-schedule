'use client';

import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface PlaceResult {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export const usePlacesAutocomplete = () => {
  const [predictions, setPredictions] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const autocompleteService = useMapsLibrary('places');
  const placesService = useMapsLibrary('places');
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | undefined>(undefined);

  // セッショントークンを初期化
  useEffect(() => {
    try {
      if (autocompleteService) {
        sessionToken.current = new autocompleteService.AutocompleteSessionToken();
      }
    } catch (err) {
      console.error('Failed to initialize AutocompleteSessionToken:', err);
      setError('Failed to initialize autocomplete service');
    }
  }, [autocompleteService]);

  // 会場名で検索
  const searchVenues = useCallback(
    async (input: string) => {
      if (!input.trim()) {
        setPredictions([]);
        setError(null);
        return;
      }

      if (!autocompleteService) {
        console.error('AutocompleteService not available');
        setError('Autocomplete service not available');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const service = new autocompleteService.AutocompleteService();
        const request: google.maps.places.AutocompletionRequest = {
          input,
          sessionToken: sessionToken.current,
          types: ['establishment'], // 施設のみを検索
          componentRestrictions: { country: 'jp' }, // 日本に限定
        };

        const response = await service.getPlacePredictions(request);
        setPredictions(response.predictions || []);
      } catch (error) {
        console.error('Places Autocomplete error:', error);
        setError('Failed to search venues');
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [autocompleteService]
  );

  // 選択された場所の詳細情報を取得
  const getPlaceDetails = useCallback(
    async (placeId: string): Promise<PlaceDetails | null> => {
      if (!placesService) {
        console.error('PlacesService not available');
        return null;
      }

      try {
        const service = new placesService.PlacesService(document.createElement('div'));
        const request: google.maps.places.PlaceDetailsRequest = {
          placeId,
          sessionToken: sessionToken.current,
          fields: ['place_id', 'name', 'formatted_address', 'geometry'],
        };

        return new Promise((resolve, reject) => {
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const details: PlaceDetails = {
                place_id: place.place_id || '',
                name: place.name || '',
                formatted_address: place.formatted_address || '',
                geometry: {
                  location: {
                    lat: () => place.geometry?.location?.lat() || 0,
                    lng: () => place.geometry?.location?.lng() || 0,
                  },
                },
              };
              setSelectedPlace(details);
              resolve(details);
            } else {
              const errorMsg = `Place details failed: ${status}`;
              console.error(errorMsg);
              reject(new Error(errorMsg));
            }
          });
        });
      } catch (error) {
        console.error('Place details error:', error);
        return null;
      }
    },
    [placesService]
  );

  // セッショントークンをリセット
  const resetSession = useCallback(() => {
    try {
      if (autocompleteService) {
        sessionToken.current = new autocompleteService.AutocompleteSessionToken();
      }
      setPredictions([]);
      setSelectedPlace(null);
      setError(null);
    } catch (err) {
      console.error('Failed to reset session:', err);
    }
  }, [autocompleteService]);

  return {
    predictions,
    isLoading,
    selectedPlace,
    error,
    searchVenues,
    getPlaceDetails,
    resetSession,
  };
};
