export const searchEvents = async (
  keyword: string,
  sort: string,
  order: string,
  limit: number,
  offset: number
) => {
  const searchQuery = new URLSearchParams({
    keyword,
    sort,
    order,
    limit: limit.toString(),
    offset: offset.toString(),
  }).toString();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/search?${searchQuery}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return response.json();
};
