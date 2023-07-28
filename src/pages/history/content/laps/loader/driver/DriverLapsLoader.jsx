export const driverLapsLoader = ({ year, round, driverId }) => ({
  queryKey: ['listing', 'laps', year, round, driverId],
  queryFn: () => ''
})
