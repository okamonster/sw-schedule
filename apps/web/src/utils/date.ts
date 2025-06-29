export const parseTimeString = (timeString: string) => {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour: hour || 0, minute: minute || 0 };
};
