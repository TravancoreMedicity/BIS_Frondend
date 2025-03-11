import { getYear, format } from 'date-fns'

/**
 * Pads a given number with leading zeros until it reaches the given total length.
 * @param {number} num The number to pad
 * @param {number} totalLength The desired total length of the resulting string
 * @returns {string} The padded string
 */
const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
}


/**
 * Generates a document number in the format DOC-YYYY-MM-XXXXXX, where:
 *   YYYY is the current year
 *   MM is the current month as a zero-padded two-digit number
 *   XXXXXX is the given number, zero-padded to six digits
 * @param {number} number The number to include in the document number
 * @returns {string} The generated document number
 */
export const customDocNumber = (number) => {
    const year = getYear(new Date())
    const day = format(new Date(), 'M')
    return `DOC-${year}-${day}-${addLeadingZeros(number, 6)}`
} 