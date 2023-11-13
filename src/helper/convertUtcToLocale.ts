import moment from 'moment'

type PropDate = {
    date: Date
}

export function convertToLocaleDate({ date }: PropDate) {
    const formatDate = moment(date)
    const newStringFormat = formatDate.format('MMMM D, YYYY')
    return newStringFormat
}
