export function removeDuplicates(arr: string[]): string[] {
  const uniqueArray: string[] = [];
  const seen: { [key: string]: boolean } = {};

  for (const item of arr) {
    if (!seen[item]) {
      uniqueArray.push(item);
      seen[item] = true;
    }
  }

  return uniqueArray;
}