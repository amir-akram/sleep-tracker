import getRecords from '@/app/actions/getRecords';
import RecordItem from './RecordItem';
import { Record } from '@/types/Record';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
        
      <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700 rounded-2xl p-6 text-center shadow-md">
        <p>{error}</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
       <section className="max-w-7xl mx-auto mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10 px-4 max-w-7xl ">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-7xl text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
            No Sleep Records Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start tracking your sleep to see your history here.
          </p>
        </div>
      </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="bg-gray-100 dark:bg-gray-900 py-10 max-w-7xl px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mx-auto max-w-7xl">
          <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent border-b border-gray-200 dark:border-gray-700 pb-6">
            Sleep History
          </h3>
        <ul className="space-y-4">
          {records.map((record: Record) => (
            <RecordItem key={record.id} record={record} />
          ))}
        </ul>
      </div>
    </div>
    </section>);
};

export default RecordHistory;
