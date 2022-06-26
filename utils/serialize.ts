export const objectToJSON = <T>(obj: T) => 
    JSON.parse(JSON.stringify(obj)) as T