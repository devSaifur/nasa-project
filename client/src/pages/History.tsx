import { useGetLaunches } from '@/api/useGetLaunches'
import { formatDate } from '@/utils/helpers'

const History = () => {
  const { launches } = useGetLaunches()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 py-24">
      <div className="text-2xl">
        <p>
          * History of mission launches including SpaceX launches starting from
          the year 2006.
        </p>
      </div>

      <table className="text-lg">
        <thead className="font-bold text-blue-200">
          <tr>
            <td className="pr-6"></td>
            <td className="pr-6">No.</td>
            <td className="pr-28">Date</td>
            <td>Mission </td>
            <td>Rocket</td>
            <td>Customers</td>
          </tr>
        </thead>

        {launches?.map((launch) => (
          <tbody key={launch.flightNumber}>
            <tr>
              {launch.success ? <td>🟩</td> : <td>🟥</td>}
              <td>{launch.flightNumber}</td>
              <td>{formatDate(launch.launchDate)}</td>
              <td>{launch.mission}</td>
              <td>{launch.rocket}</td>
              <td>
                {launch.customers[0] ? launch.customers[0] : 'unavailable'}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default History
