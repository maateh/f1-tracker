class Cards {
  static GRID_STYLES = {
    margin: '2rem 4rem',
    display: 'grid',
    gap: '4rem'
  }

  static FLEX_STYLES = {
    margin: '2rem',
    display: 'flex',
    gap: '1.5rem'
  }

  constructor({ styles, layouts }) {
    this.styles = styles
    this.layouts = layouts
  }
}

export default Cards
