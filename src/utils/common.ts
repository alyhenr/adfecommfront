export const truncateText = (text: string, maxSize: number = 150) : string => {    
    return text.length > maxSize ? text.slice(0, maxSize - 3) + "..." : text
}