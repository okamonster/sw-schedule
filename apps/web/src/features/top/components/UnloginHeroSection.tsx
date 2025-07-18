'use client';
import { Button, Input } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const UnloginHeroSection = (): React.ReactNode => {
  const { push } = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    push(`/artists?query=${search}`);
  };

  return (
    <div className="bg-gradient-to-r mx-auto px-4 from-pink-500 to-purple-600 py-16 grid gap-4 text-center">
      <h1 className="text-4xl font-bold text-text-white">
        推しの出演情報を
        <br />
        簡単チェック
      </h1>
      <p className="text-md text-text-white">今すぐ確認！</p>

      <div className="flex items-center justify-center gap-2 w-full">
        <Input
          radius="lg"
          w="250px"
          placeholder="アーティスト名やイベント名で検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button radius="lg" color="var(--color-background-dark)" w="50px" onClick={handleSearch}>
          <FaSearch />
        </Button>
      </div>
    </div>
  );
};
