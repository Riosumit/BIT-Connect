const TextComponent = ({ data }) => {
  const { text, configuration } = data;
  const { fontSize, color, fontStyle } = configuration || {};
  return (
    <div className="mb-1 p-4 bg-gray-100 rounded-lg text-gray-800">
      <p style={{ fontSize: `${fontSize}px`, color, fontStyle }}>
        {text}
      </p>
    </div>
  );
};

export default TextComponent;
