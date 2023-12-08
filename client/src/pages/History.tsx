import { useGetLaunches } from '@/api/useGetLaunches'
import { formatDate } from '@/utils/helpers'

const History = () => {
  const { launches } = useGetLaunches()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 pt-24">
      <div>
        <p>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </p>
      </div>

      <table>
        <thead className="font-bold text-blue-200">
          <tr>
            <td></td>
            <td>No.</td>
            <td>Date</td>
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
              <td>{`${launch.customers[0]} & ${launch.customers[1]}`}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default History
