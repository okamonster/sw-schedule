'use client';

import { Alert, Loader, Paper, Text, TextInput } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { FaExclamationTriangle, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { type PlaceResult, usePlacesAutocomplete } from '../hooks/usePlacesAutocomplete';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (name: string, address: string, location: { lat: number; lng: number }) => void;
  label?: string;
  description?: string;
  placeholder?: string;
}

export const VenueSearchInput = ({
  value,
  onChange,
  onPlaceSelect,
  label = '会場名',
  description = 'ライブハウス名など',
  placeholder = '会場名を入力してください',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { predictions, isLoading, error, searchVenues, getPlaceDetails } = usePlacesAutocomplete();

  // 入力値が変更されたときに検索を実行
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        searchVenues(value);
        setIsOpen(true);
        setSelectedIndex(-1);
      } else {
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, searchVenues]);

  // 場所を選択
  const handlePlaceSelect = async (prediction: PlaceResult) => {
    try {
      const details = await getPlaceDetails(prediction.place_id);
      if (details) {
        onChange(details.name);
        onPlaceSelect?.(details.name, details.formatted_address, {
          lat: details.geometry.location.lat(),
          lng: details.geometry.location.lng(),
        });
      }
    } catch (error) {
      console.error('Failed to get place details:', error);
    }
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // クリックで場所を選択
  const handleClick = (prediction: PlaceResult) => {
    handlePlaceSelect(prediction);
  };

  return (
    <div className="relative">
      <TextInput
        ref={inputRef}
        label={label}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onFocus={() => {
          if (predictions.length > 0) setIsOpen(true);
        }}
        rightSection={
          isLoading ? <Loader size="xs" /> : <FaSearch size={14} className="text-gray-400" />
        }
        radius="md"
      />

      {/* エラーメッセージ */}
      {error && (
        <Alert
          icon={<FaExclamationTriangle size={16} />}
          title="検索エラー"
          color="red"
          className="mt-2"
        >
          {error}
        </Alert>
      )}

      {/* オートコンプリートドロップダウン */}
      {isOpen && predictions.length > 0 && (
        <Paper
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto shadow-lg border border-gray-200"
          radius="md"
        >
          {predictions.map((prediction, index) => (
            <button
              key={prediction.place_id}
              type="button"
              className={`w-full text-left px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleClick(prediction)}
              tabIndex={0}
              aria-label={`${prediction.structured_formatting.main_text} - ${prediction.structured_formatting.secondary_text || ''}`}
            >
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Text size="sm" fw={500} className="text-gray-900 truncate">
                    {prediction.structured_formatting.main_text}
                  </Text>
                  {prediction.structured_formatting.secondary_text && (
                    <Text size="xs" className="text-gray-500 truncate">
                      {prediction.structured_formatting.secondary_text}
                    </Text>
                  )}
                </div>
              </div>
            </button>
          ))}
        </Paper>
      )}
    </div>
  );
};
