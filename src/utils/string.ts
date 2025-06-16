const truncateText = (text: string, maxLength: number): string => {
  if (!text || maxLength <= 0 || maxLength === null || maxLength === undefined) {
    return '';
  }
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export { truncateText };
