import { useEffect, useState, useContext } from 'react';
import ArticleView from '@/components/article-view/page';
import AuthContext from '@/context/AuthContext';
import moment from 'moment';

const ArticleDetail = ({ article }) => {
  const [showButtons, setShowButtons] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowButtons(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowButtons(false), 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const getInitials = (name) => {
    const words = name.split(' ');
    return words.map((word) => word.charAt(0)).join('').toUpperCase();
  };

  const displayDP = article.user.dp ? (
    <img src={article.user.dp} alt="User DP" className="w-12 h-12 mr-3 rounded-full" />
  ) : (
    <div className="w-12 h-12 mr-3 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-xl font-semibold">
      {getInitials(article.user.full_name)}
    </div>
  );

  const timeAgo = moment(article.created_at).fromNow();

  return (
    <div className="flex bg-gray-100 h-full overflow-y-scroll">
      <div className="relative bg-gray">
        <div className="flex items-center p-4">
          {displayDP}
          <div>
            <h3 className="text-base font-semibold">{article.user.full_name}</h3>
            <p className="text-gray-500 text-xs">{timeAgo}</p>
          </div>
        </div>
        <ArticleView components={article.post_data} />
      </div>
    </div>
  );
};

export default ArticleDetail;
