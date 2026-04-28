const ItemVisual = ({ item, className = '', imageClassName = 'h-full w-full object-contain', alt }) => {
  const visual = typeof item === 'string' ? item : item?.image;
  const label = alt || (typeof item === 'object' ? item?.name : '') || '';

  if (typeof visual === 'string' && visual.startsWith('/')) {
    return <img src={visual} alt={label} className={imageClassName} />;
  }

  return <span className={className}>{visual}</span>;
};

export default ItemVisual;
