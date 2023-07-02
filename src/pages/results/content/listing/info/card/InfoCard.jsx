const InfoCard = ({ info }) => {
  return (
    <div className="category-card">
      <p className="category-title">{info.category}</p>
      <div className="category-data__container">
        {info.data.map(data => (
          <div className="category-data" key={data.title}>
            <p className="category-data-icon">{data.icon}</p>
            <p className="category-data-title">{data.title}</p>
            <p className="category-data-desc">{data.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoCard