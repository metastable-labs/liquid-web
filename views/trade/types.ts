interface IView {
  data: {
    date: Date;
    value: number;
  }[];
  period: Period;
  setPeriod: (period: Period) => void;
  periods: {
    title: string;
    value: Period;
    loading?: boolean;
  }[];
}
