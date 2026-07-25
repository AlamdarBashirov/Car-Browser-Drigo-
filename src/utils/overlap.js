export const hasOverlap = (startDate, endDate, existingStart, existingEnd) => {
    const start= new Date(startDate)
    const end = new Date(endDate)
    const existingStartDate = new Date(existingStart)
    const existingEndDate = new Date(existingEnd)

    return (
        start <= existingEndDate && end >= existingStartDate
    );

}