const Upcoming = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 pt-24">
      <div>
        <p>
          Upcoming missions including both SpaceX launches and newly scheduled
          Zero to Mastery rockets.
        </p>
      </div>

      <table className="">
        <tr>
          <th className="text-start">No.</th>
          <th className="text-start">Date</th>
          <th className="text-start">Mission </th>
          <th className="text-start">Rocket</th>
          <th className="text-start">Destination</th>
        </tr>

        {/* <button>❌</button> */}
        <tr>
          <th className="text-start">226</th>
          <th className="text-start">Fri JUL 07 2023</th>
          <th className="text-start">Mission Name</th>
          <th className="text-start">Rocket Name</th>
          <th className="text-start">Destination Name</th>
        </tr>
      </table>
    </div>
  )
}

export default Upcoming
