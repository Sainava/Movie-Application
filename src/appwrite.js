import { Client,Query,Databases,ID } from 'appwrite';

const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID; // Your project ID
const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID; // Your database ID
const COLLECTION_ID=import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Your collection ID

const client =new Client()
.setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
.setProject(PROJECT_ID); // Your project ID

const database = new Databases(client);

export const updateSearchCount=async(searchTerm,movie)=>{
// Validate inputs
if (!searchTerm || !searchTerm.trim() || !movie || !movie.id) {
    console.log("Invalid search term or movie data, skipping update");
    return;
}

// Normalize search term (trim and convert to lowercase for consistency)
const normalizedSearchTerm = searchTerm.trim().toLowerCase();

// Skip very short search terms (likely typos)
if (normalizedSearchTerm.length < 2) {
    console.log("Search term too short, skipping update");
    return;
}

// 1.USE the Appwrite SDK to check if a document with the search term already exists
try{
    console.log("Updating search count for:", normalizedSearchTerm);
    
    const result=await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm', normalizedSearchTerm)
    ])
    
    console.log("Found documents:", result.documents.length);
    // 2.If it exists, increment the count
    if(result.documents.length > 0) {
        const documentId = result.documents[0].$id;
        const currentCount = result.documents[0].count;

        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            documentId,
            {
                count: currentCount + 1,
            }
        );
        console.log("Updated count to:", currentCount + 1);
    }
    // 3.If it doesn't exist, create a new document with the search term and count set to 1
    else{
        await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                searchTerm: normalizedSearchTerm,
                count: 1,
                movie_id: movie.id,
                movie_title: movie.title, // Store the actual movie title for better display
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
        );
        console.log("Created new document for:", normalizedSearchTerm);
    }

}catch(error){
  console.error("Error updating search count:", error);
}


}

export const getTrendingMovies = async () => {
    try{
        const result=await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.orderDesc('count'), // Assuming you want to order by count
                Query.limit(5) // Limit to top 10 trending movies
            ]
        );

        return result.documents;
    }catch(error){
        console.error("Error fetching trending movies:", error);
    }
}