const ImageComponent = ({ data }) => {
  return (
    <div className="mb-1">
      <img
        src={data.image || 'https://via.placeholder.com/150'}
        alt="Post Image"
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};

export default ImageComponent;
