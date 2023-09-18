class Cards {
  constructor({
    styles = {
      margin: '2rem 4rem',
      display: 'grid',
      gap: '4rem'
    },
    layouts
  }) {
    this.styles = styles
    this.layouts = layouts
  }
}

export default Cards
