const Upcoming = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 pt-24">
      <div>
        <p>
          Upcoming missions including both SpaceX launches and newly scheduled
          Zero to Mastery rockets.
        </p>
      </div>

      <table>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Mission </th>
          <th>Rocket</th>
          <th>Destination</th>
        </tr>
        <tr>
          <th>
            <button>❌</button>
          </th>
          <th>226</th>
          <th>Fri JUL 07 2023</th>
          <th>Mission Name</th>
          <th>Rocket Name</th>
          <th>Destination Name</th>
        </tr>
      </table>
    </div>
  )
}

export default Upcoming
