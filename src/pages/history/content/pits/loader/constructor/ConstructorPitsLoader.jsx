export const constructorPitsLoader = ({ year, round, id }) => ({
  queryKey: ['listing', 'pits', year, round, id],
  queryFn: () => ''
})
