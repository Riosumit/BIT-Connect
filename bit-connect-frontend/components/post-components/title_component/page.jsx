const TitleComponent = ({ data }) => {
  const { text, configuration } = data;
  const { fontSize, color, fontStyle } = configuration || {};
  return (
    <div className="text-3xl font-bold mb-1 p-4 bg-gray-100 rounded-lg text-gray-900">
      <h1 style={{ fontSize: `${fontSize}px`, color, fontStyle }}>
        {text}
      </h1>
    </div>
  );
};

export default TitleComponent;
