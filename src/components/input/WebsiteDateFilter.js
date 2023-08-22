import useDateRange from 'components/hooks/useDateRange';
import { isAfter } from 'date-fns';
import { incrementDateRange } from 'lib/date';
import { Button, Flexbox, Icon, Icons } from 'react-basics';
import DateFilter from './DateFilter';
import styles from './WebsiteDateFilter.module.css';

export function WebsiteDateFilter({ websiteId }) {
  const [dateRange, setDateRange] = useDateRange(websiteId);
  const { value, startDate, endDate, selectedUnit } = dateRange;

  const isFutureDate =
    value !== 'all' && isAfter(incrementDateRange(dateRange, -1).startDate, new Date());

  const handleChange = async value => {
    setDateRange(value);
  };

  const handleIncrement = async value => {
    const newValue = incrementDateRange(dateRange, value);

    setDateRange(newValue);
  };

  return (
    <>
      <DateFilter
        className={styles.dropdown}
        value={value}
        startDate={startDate}
        endDate={endDate}
        selectedUnit={selectedUnit}
        onChange={handleChange}
        showAllTime={true}
      />
      {value !== 'all' && (
        <Flexbox justifyContent="center" gap={10} className={styles.container}>
          <Button onClick={() => handleIncrement(1)}>
            <Icon rotate={90}>
              <Icons.ChevronDown />
            </Icon>
          </Button>

          <Button onClick={() => handleIncrement(-1)} disabled={isFutureDate}>
            <Icon rotate={270}>
              <Icons.ChevronDown />
            </Icon>
          </Button>
        </Flexbox>
      )}
    </>
  );
}

export default WebsiteDateFilter;