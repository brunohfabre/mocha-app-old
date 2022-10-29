export function getShortName(name: string) {
  const nameSplitted = name.split(' ')

  if (nameSplitted.length > 1) {
    return `${nameSplitted[0][0]}${
      nameSplitted[nameSplitted.length - 1][0]
    }`.toUpperCase()
  }

  return `${nameSplitted[0][0]}${
    nameSplitted[0][nameSplitted[0].length - 1]
  }`.toUpperCase()
}
