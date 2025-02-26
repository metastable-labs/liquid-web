interface ILWAreaChart {
  data: Array<{
    date: string;
    value: number;
  }>;
  loading: boolean;
  period?: Period;
}
