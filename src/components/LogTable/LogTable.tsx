import type { Log } from '@/types/types';

type LogsProps = {
  logs: Log[]; 
}

export const LogTable = ({ logs }: LogsProps) => (
  <div className="bg-slate-50 rounded-lg p-8 mt-8">
    <h2 className="text-xl font-bold mt-2 mb-6">Logs</h2>
    {
      logs.length ? (
        <div className="relative overflow-x-auto">
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
                  const dateTimeDate = new Date(datetime);
                  const lastDateTimeDate = new Date(last_datetime)
                  return (
                    <tr key={`row-${number}-${occurrences}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th className={classString}>{dateTimeDate.toLocaleString()}</th>
                      <th className={classString}>{value}</th>
                      <th className={classString}>{number}</th>
                      <th className={classString}>{occurrences}</th>
                      <th className={classString}>{lastDateTimeDate.toLocaleString()}</th>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      ) : (
        <p>No logs to show</p>
      )
    }
  </div>
);