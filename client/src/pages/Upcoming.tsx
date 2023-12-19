import { useAbortLaunch } from '@/api/useAbortLaunch'
import { useGetLaunches } from '@/api/useGetLaunches'
import { formatDate } from '@/utils/helpers'
import { Cross1Icon } from '@radix-ui/react-icons'

const Upcoming = () => {
  const { launches } = useGetLaunches()
  const { abortLaunch } = useAbortLaunch()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 pt-24">
      <div className="text-2xl">
        <p>
          * Upcoming missions including both SpaceX launches and newly scheduled
          Space X rockets.
        </p>
      </div>

      <table className="text-lg">
        <thead className="font-bold text-blue-200">
          <tr>
            <th></th>
            <th className="text-start">No.</th>
            <th className="text-start">Date</th>
            <th className="text-start">Mission </th>
            <th className="text-start">Rocket</th>
            <th className="text-start">Destination</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {launches?.map(
            (launch) =>
              launch.upcoming &&
              launch.destination && (
                <tr key={launch.flightNumber}>
                  <td>
                    <button
                      onClick={() => abortLaunch(launch.flightNumber)}
                      className="pr-2 align-middle"
                    >
                      <Cross1Icon
                        fontWeight="600"
                        color="red"
                        height="16"
                        width="16"
                      />
                    </button>
                  </td>
                  <td className="text-start font-normal">
                    {launch.flightNumber}
                  </td>
                  <td className="text-start font-normal">
                    {formatDate(launch.launchDate)}
                  </td>
                  <td className="text-start font-normal">{launch.mission}</td>
                  <td className="text-start font-normal">{launch.rocket}</td>
                  <td className="text-start font-normal">
                    {launch.destination}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Upcoming
