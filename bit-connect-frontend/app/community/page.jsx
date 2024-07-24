'use client';
import { useState, useEffect, useContext } from 'react';
import Navbar from '@/components/navbar/page';
import Article from '@/components/article/page';
import ArticleDetail from './articles/page';
import Link from 'next/link';
import axios from 'axios';
import AuthContext from '@/context/AuthContext';
import { IoClose } from 'react-icons/io5';
import { json } from 'react-router-dom';

const Community = () => {
  const [articles, setArticles] = useState([]);
  const [showArticle, setShowArticle] = useState(false);
  const [article, setArticle] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.API_HOST}/community/articles/`);
        if (response.status === 200) {
          setArticles(response.data);
        } else {
          console.error('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const updates = [
    {
      id: 1,
      title: 'New Feature Released',
    },
    {
      id: 2,
      title: 'Maintenance Scheduled',
    },
    {
      id: 3,
      title: 'Community Guidelines Updated',
    },
  ];

  function handleShowArticle(article_data) {
    setArticle(article_data);
    setShowArticle(true);
  }

  return (
    <div className="h-screen bg-gray-200">
      <Navbar location="community" />
      {showArticle && (
        <div className="h-screen w-full fixed bottom-0 left-0 z-50 p-7 bg-gray-800 bg-opacity-50">
          <div className="w-3/4 mx-auto h-full bg-white relative">
            <ArticleDetail article={article}/>
            <IoClose className="absolute top-5 right-5 text-gray-600 text-3xl cursor-pointer" onClick={() => setShowArticle(false)} />
          </div>
        </div>
      )}
      <section className="h-5/6 container mx-auto mt-2 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Community</h1>
          {user && (
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              href="/community/add-post"
            >
              Add Post
            </Link>
          )}
        </div>
        <div className="h-full flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold mb-4">Updates</h2>
            <div className="space-y-4">
              {updates.length > 0 ? (
                updates.map((update) => (
                  <div key={update.id}>
                    <h3 className="font-semibold">{update.title}</h3>
                  </div>
                ))
              ) : (
                <p>No updates available.</p>
              )}
            </div>
          </div>
          <div className="w-full h-full md:w-2/4 flex justify-center items-start">
            <div className="w-full h-full overflow-y-scroll border p-4 rounded-lg">
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {articles.map((article, index) => (
                    <Article key={index} article={article} onClick={() => { handleShowArticle(article); }}/>
                  ))}
                </div>
              ) : (
                <p>No articles available.</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold mb-4">News</h2>
            <p>Stay tuned for the latest news.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
