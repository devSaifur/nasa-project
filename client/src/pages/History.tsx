const History = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 pt-24">
      <div>
        <p>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </p>
      </div>

      <table>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Mission </th>
          <th>Rocket</th>
          <th>Customers</th>
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

export default History
