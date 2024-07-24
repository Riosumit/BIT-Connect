const TextWithImageComponent = ({ data }) => {
  const { text, image, configuration } = data;
  const { fontSize, color, fontStyle, imagePosition } = configuration || {};
  return (
    <div className="mb-1 p-4 bg-gray-100 rounded-lg">
        {imagePosition === 'left' ? (
          <div className="flex justify-between">
            <img
            src={data.image || 'https://via.placeholder.com/150'}
            alt="Post Image"
            className="w-1/3 h-auto rounded-lg mr-4"
            />
            <p className="w-2/3" style={{ fontSize: `${fontSize}px`, color, fontStyle }}>
              {text}
            </p>
          </div>
        
        ):(
          <div className="flex justify-between">
            <p className="w-2/3" style={{ fontSize: `${fontSize}px`, color, fontStyle }}>
              {text}
            </p>
            <img
              src={data.image || 'https://via.placeholder.com/150'}
              alt="Post Image"
              className="w-1/3 h-auto rounded-lg ml-4"
            />
          </div>
        )}
    </div>
  );
};

export default TextWithImageComponent;
