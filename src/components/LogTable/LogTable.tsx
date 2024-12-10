
type LogsProps = {
  logs: any[]; 
}

export const LogTable = ({ logs }: LogsProps) => {

  return (
    <>
      <h2 className="text-lg font-bold mt-8">Logs</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Datetime</th>
            <th className="px-6 py-3">Value</th>
            <th className="px-6 py-3">Number</th>
            <th className="px-6 py-3">Occurences</th>
            <th  className="px-6 py-3">Last time queried</th>
          </tr>
        </thead>
        <tbody>
          {
            logs.map(({datetime, value, number, occurrences, last_datetime}) => {
              const classString = 'px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white';
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className={classString}>{datetime}</th>
                  <th className={classString}>{value}</th>
                  <th className={classString}>{number}</th>
                  <th className={classString}>{occurrences}</th>
                  <th className={classString}>{last_datetime}</th>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}