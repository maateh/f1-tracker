export const constructorLoader = ({ params: { year, id } }) => {
  return new ConstructorLoader({ year, id })
}

class ConstructorLoader {
  constructor(data) {
    this.info = [
      {
        category: 'TEST_CATEGORY',
        data: [
          { title: 'TEST_TITLE', desc: 'test_data' },
          { title: 'TEST-TITLE', desc: 'test_data' },
        ]
      },
    ]

    this.header = [
      { key: 'test_header', placeholder: 'TEST_HEADER' },
    ]
    this.table = [0].map((w, index) => ({
      key: index,
      data: [
        { key: w, data: `${data.year}/constructors/${data.id}` },
      ]
    }))
  }
}
