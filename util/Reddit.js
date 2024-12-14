// Simple fetch request to get top posts from Reddit's public API
async function fetchRedditTopPosts() {
    try {
      // Perform fetch request to the Reddit top posts API
      const response = await fetch('https://www.reddit.com/top/.json');
      
      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch Reddit posts. Status: ${response.status}`);
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Log success message
      console.log("Fetch successful!");
  
      // Log the top posts' data to the console
      console.log(data);
      
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error("Error during fetch:", error.message);
    }
}

// Call the function to test it
fetchRedditTopPosts();
