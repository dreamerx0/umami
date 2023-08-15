import { useContext } from 'react';
import { GridTable, GridColumn } from 'react-basics';
import { ReportContext } from '../Report';
import EmptyPlaceholder from 'components/common/EmptyPlaceholder';
import { useMessages } from 'hooks';
import { dateFormat } from 'lib/date';
import styles from './RetentionTable.module.css';

export function RetentionTable() {
  const { formatMessage, labels } = useMessages();
  const { report } = useContext(ReportContext);
  const { data } = report || {};

  if (!data) {
    return <EmptyPlaceholder />;
  }

  const dates = data.reduce((arr, { date }) => {
    if (!arr.includes(date)) {
      return arr.concat(date);
    }
    return arr;
  }, []);

  const days = Array(32).fill(null);

  return (
    <>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.date}>{formatMessage(labels.date)}</div>
          {days.map((n, i) => (
            <div key={i} className={styles.header}>
              {formatMessage(labels.day)} {i}
            </div>
          ))}
        </div>
        {dates.map((date, i) => {
          return (
            <div key={i} className={styles.row}>
              <div className={styles.date}>
                {dateFormat(date, 'P')}
                <br />
                {date}
              </div>
              {days.map((n, day) => {
                return (
                  <div key={day} className={styles.cell}>
                    {data.find(row => row.date === date && row.day === day)?.percentage.toFixed(2)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <DataTable data={data} />
    </>
  );
}

function DataTable({ data }) {
  return (
    <GridTable data={data || []}>
      <GridColumn name="date" label={'Date'}>
        {row => row.date}
      </GridColumn>
      <GridColumn name="day" label={'Day'}>
        {row => row.day}
      </GridColumn>
      <GridColumn name="visitors" label={'Visitors'}>
        {row => row.visitors}
      </GridColumn>
      <GridColumn name="returnVisitors" label={'Return Visitors'}>
        {row => row.returnVisitors}
      </GridColumn>
      <GridColumn name="percentage" label={'Percentage'}>
        {row => row.percentage}
      </GridColumn>
    </GridTable>
  );
}

export default RetentionTable;