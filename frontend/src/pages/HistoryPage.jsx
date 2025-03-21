import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useHistoryStore } from '../store/useHistoryStore';

const HistoryPage = () => {
  const { authUser } = useAuthStore();
  const { history, loading, fetchHistory } = useHistoryStore();

  useEffect(() => {
    if (authUser) {
      fetchHistory(authUser.token, authUser.patientId);
    }
  }, [authUser, fetchHistory]);

  return (
    <div className="p-4 sm:p-6 mt-20">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
        Patient History
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-lg">Loading...</div>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">No history records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg">
          <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 sm:p-3 border">S.No</th>
                <th className="p-2 sm:p-3 border">Patient ID</th>
                <th className="p-2 sm:p-3 border">Name</th>
                <th className="p-2 sm:p-3 border md:table-cell">UPDRS</th>
                <th className="p-2 sm:p-3 border md:table-cell">Tremor</th>
                <th className="p-2 sm:p-3 border lg:table-cell">Functional Assessment</th>
                <th className="p-2 sm:p-3 border lg:table-cell">MoCA</th>
                <th className="p-2 sm:p-3 border xl:table-cell">Rigidity</th>
                <th className="p-2 sm:p-3 border">Result</th>
                <th className="p-2 sm:p-3 border">Probability</th>
                <th className="p-2 sm:p-3 border">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={record._id} className="text-center text-black border border-gray-300 odd:bg-gray-100 even:bg-white">
                  <td className="p-2 sm:p-3 border">{index + 1}</td>
                  <td className="p-2 sm:p-3 border">{record.patientId}</td>
                  <td className="p-2 sm:p-3 border">{record.fullName}</td>
                  <td className="p-2 sm:p-3 border md:table-cell">
                    {record.symptoms?.UPDRS !== undefined ? record.symptoms.UPDRS : '-'}
                  </td>
                  <td className="p-2 sm:p-3 border md:table-cell">
                    {record.symptoms?.Tremor !== undefined ? record.symptoms.Tremor : '-'}
                  </td>
                  <td className="p-2 sm:p-3 border lg:table-cell">
                    {record.symptoms?.FunctionalAssessment !== undefined ? record.symptoms.FunctionalAssessment : '-'}
                  </td>
                  <td className="p-2 sm:p-3 border lg:table-cell">
                    {record.symptoms?.MoCA !== undefined ? record.symptoms.MoCA : '-'}
                  </td>
                  <td className="p-2 sm:p-3 border xl:table-cell">
                    {record.symptoms?.Rigidity !== undefined ? record.symptoms.Rigidity : '-'}
                  </td>
                  <td
                    className={`p-2 sm:p-3 border font-bold ${
                      record.result.toLowerCase() === 'not affected' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {record.result}
                  </td>
                  <td className="p-2 sm:p-3 border">
                    {(record.probability * 100).toFixed(2)}%
                  </td>
                  <td className="p-2 sm:p-3 border whitespace-nowrap">
                    {new Date(record.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}{' '}
                    {new Date(record.date).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;