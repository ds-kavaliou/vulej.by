export function createPhoneFormatter(mask: string, placeholder = 'x') {
  const apply = (text: string): string => {
    let formattedText = ''
    let textIndex = 0
    let maskIndex = 0

    while (maskIndex < mask.length && textIndex < text.length) {
      if (mask[maskIndex] === placeholder) {
        if (/\d/.test(text[textIndex])) {
          formattedText += text[textIndex]
        }
        textIndex++
      } else {
        formattedText += mask[maskIndex]
        if (text[textIndex] === mask[maskIndex]) {
          textIndex++
        }
      }
      maskIndex++
    }

    return formattedText
  }

  return apply
}

export const formatBYPhoneNumber = createPhoneFormatter('+375 (xx) xxx-xx-xx')
export const validateBYPhoneNumber = (value: string) =>
  /^\+375\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/.test(value)
