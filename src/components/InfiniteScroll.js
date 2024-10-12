import { useEffect, useState } from "react";
import useThrottleHook from "./useThrottleHook";

function App() {
  const [items, setItems] = useState([]); // To store the data
  const [page, setPage] = useState(1); // To track the current page
  const [loading, setLoading] = useState(false); // To track loading state
  const [hasMore, setHasMore] = useState(true); // To check if more data is available

  const fetchItems = async (page) => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`);
      const data = await res.json();
      if (data?.products?.length > 0) {
        setItems((prevItems) => [...prevItems, ...data.products]); // Append new data to the existing data
        setHasMore(data.products.length === 20); // Check if there are more items
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(page); // Fetch the initial data when the component mounts
  }, [page]);

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page number when the user reaches the bottom
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Listen to the scroll event

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener on component unmount
    };
  }, [loading, hasMore]);

  return (
    <div className="App">
      <h1>Infinite Scroll Example</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.title}</li> // Display the list of items
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items to load</p>}
    </div>
  );
}

export default App;