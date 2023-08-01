export const driverPitsLoader = ({ year, round, id }) => ({
  queryKey: ['listing', 'pits', year, round, id],
  queryFn: () => ''
})
