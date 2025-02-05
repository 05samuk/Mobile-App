//typescript custom enum for search types (optional)

export enum SearchType {
    all = '',
    movie = 'movie',
    serie = 'series',
    episode = 'episode',
}

export interface SearchResult {
    
    Title : string 
    Year : string
    poster : string 
    imdbID : string
    Type: string;
}

export interface SearchError {
    
    Response : string 
    Error : string
}

export interface DetailsResult {
    Genre : string
    Title : string 
    Year : string
    poster : string 
    Plot : string
    imdbRating : string
    Director : string 
    Actors : string 
    Website : string 
}

export const useApi = () => {
    let url = 'https://www.omdbapi.com/'
    let apiKey = '5da6d65e'

    const searchData = async (
        title: string,
         type: SearchType,
        ): Promise<SearchResult[] | SearchError> => {
        const result = await fetch (
            `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`,
        )
        return result.json()
    }

    const getDetails = async (id: string): Promise<DetailsResult> =>{
        const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`)
        return result.json()
    }
    return {
        searchData,
        getDetails,
    }
} 

export default useApi
    