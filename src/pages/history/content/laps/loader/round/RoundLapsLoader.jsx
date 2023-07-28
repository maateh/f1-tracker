export const roundLapsLoader = ({ year, round }) => ({
  queryKey: ['listing', 'laps', year, round],
  queryFn: () => ''
})
