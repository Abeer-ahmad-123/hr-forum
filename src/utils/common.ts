export function toPascalCase(inputStr: string) {
  return inputStr
    .replace(/(\w)(\w*)/g, function (_, first, rest) {
      return first.toUpperCase() + rest.toLowerCase()
    })
    .replace(/\s+/g, ' ')
}
