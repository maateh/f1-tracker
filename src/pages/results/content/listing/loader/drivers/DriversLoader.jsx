export const driversLoader = ({ params: { year } }) => {
  return new DriversLoader({ year })
}

class DriversLoader {
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
        { key: w, data: `${data.year}/drivers/all` },
      ]
    }))
  }
}
