export const formatRelative = (date: string | Date) => {
    date = date instanceof Date ? date : new Date(date)
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        numeric: "auto", style: "long"
    })
    let duration = ( date.getTime() - Date.now()) / 1000
    let dUnit: Intl.RelativeTimeFormatUnit = "seconds"
    const divisions: { amount: number, unit: Intl.RelativeTimeFormatUnit }[] = [
        { amount: 60, unit: "seconds" },
        { amount: 60, unit: "minutes" },
        { amount: 24, unit: "hours" },
        { amount: 30, unit: "days" },
        { amount: 12, unit: "months" },
        { amount: Number.POSITIVE_INFINITY, unit: "years" },

    ]
    for (const { amount, unit } of divisions) {
        if (Math.abs(duration) < amount) {
            dUnit = unit
            duration = Math.round(duration)
            break
        }
        duration /= amount
    }

    return formatter.format(duration, dUnit)
}