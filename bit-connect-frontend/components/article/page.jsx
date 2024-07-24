import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
import { BiSend } from "react-icons/bi";
import moment from 'moment';
import AuthContext from '@/context/AuthContext';

const Article = ({ article, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes.length);
  const [commentsCount, setCommentsCount] = useState(article.comments.length);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLiked(false);
    if (user) {
      article.likes.forEach((id) => {
        if (id === user.id) {
          setLiked(true);
        }
      });
    }
  }, [article.likes, user]);

  const toggleLike = async () => {
    if (user) {
      const token = sessionStorage.getItem("token");
      const endpoint = `${process.env.API_HOST}/community/articles/${article.id}/like/`;

      try {
        const response = await axios.post(endpoint, {}, {
          headers: {
            Authorization: `Token ${token}`,
          }
        });

        if (response.status === 200) {
          setLiked(!liked);
          setLikesCount(liked ? likesCount - 1 : likesCount + 1);
        }
      } catch (error) {
        console.error("Error liking the article:", error);
      }
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (user && newComment.trim()) {
      const token = sessionStorage.getItem("token");
      const endpoint = `${process.env.API_HOST}/community/articles/${article.id}/comment/`;

      try {
        const response = await axios.post(endpoint, { text: newComment }, {
          headers: {
            Authorization: `Token ${token}`,
          }
        });

        if (response.status === 201) {
          setComments([...comments, response.data]);
          setCommentsCount(commentsCount + 1);
          setNewComment('');
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const fetchComments = async () => {
    const token = sessionStorage.getItem("token");
    const endpoint = `${process.env.API_HOST}/community/articles/${article.id}/comments/`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });

      if (response.status === 200) {
        setComments(response.data);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const getInitials = (name) => {
    const words = name.split(' ');
    return words.map((word) => word.charAt(0)).join('').toUpperCase();
  };

  const displayDP = article.user.dp ? (
    <img src={article.user.dp} alt="User DP" className="w-12 h-12 mr-5 rounded-full" />
  ) : (
    <div className="w-12 h-12 mr-5 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-xl font-semibold">
      {getInitials(article.user.full_name)}
    </div>
  );

  const timeAgo = moment(article.created_at).fromNow();

  return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
        <div className="flex items-center mb-4">
          {displayDP}
          <div>
            <h3 className="text-base font-semibold">{article.user.full_name}</h3>
            <p className="text-gray-500 text-xs">{timeAgo}</p>
          </div>
        </div>
        <div className="flex items-start flex-col">
          <h2 className="text-lg font-semibold mb-4">{article.title}</h2>
          {article.image && <img src={article.image} alt="Article" className="m-auto max-h-64 mb-4 object-cover rounded" />}
          <p className="text-gray-700 mb-4">{article.introduction}<span className='text-blue-500 font-bold cursor-pointer' onClick={onClick}>Read More</span></p>
          <div className="flex justify-between items-center w-full mb-4">
            <div className="flex items-center">
              <button onClick={toggleLike} className="focus:outline-none">
                {liked ? (
                  <FaHeart className="text-red-500 text-xl mr-2" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-xl mr-2" />
                )}
              </button>
              <span className="text-gray-500">{likesCount} likes</span>
            </div>
            <div className="flex items-center">
              <button onClick={toggleComments} className="focus:outline-none">
                <FaComment className="text-gray-500 text-xl mr-2" />
              </button>
              <span className="text-gray-500">{commentsCount} comments</span>
            </div>
            <div className="flex items-center">
              <FaShare className="text-gray-500 text-xl mr-2" />
              <span className="text-gray-500">Share</span>
            </div>
          </div>
          {showComments && (
            <div className="w-full">
              <h3 className="font-bold mb-2">Comments</h3>
              <div className="max-h-40 overflow-y-scroll">
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={index} className="border-t border-gray-300 pt-2">
                      <div className="flex items-center mb-2">
                        {comment.user.dp ? (
                          <img src={comment.user.dp} alt="User DP" className="w-8 h-8 rounded-full mr-3" />
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-lg font-semibold mr-3">
                            {getInitials(comment.user.full_name)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold">{comment.user.full_name}</p>
                          <p className="text-xs text-gray-500">{moment(comment.created_at).fromNow()}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-8">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {user && (
                <form onSubmit={handleCommentSubmit} className="my-4 bg-white flex items-center">
                  <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="1"
                  ></textarea>
                  <button type='submit'><BiSend className='text-3xl' /></button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
  );
};

export default Article;
