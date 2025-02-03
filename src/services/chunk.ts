export function chunkArray<T>(array: T[], size: number): T[][] {
  return array.reduce<T[][]>((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size))
    return acc
  }, [])
}
