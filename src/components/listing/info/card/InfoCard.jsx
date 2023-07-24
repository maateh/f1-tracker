const InfoCard = ({ info }) => {
  return (
    <div className="category-card">
      <p className="category-title">{info.category}</p>
      <div className="category-data__container">
        {info.data.map(data => (
          <div className="category-data" key={data.title}>
            <span className="category-data-icon">{data.icon}</span>
            <span className="category-data-title">{data.title}</span>
            <p className="category-data-desc">{data.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoCard