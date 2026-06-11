import { CalculationResult, SnapshotInputs } from '../types';

export interface SnapshotMetrics {
  netWorth: number;
  fireAchievementPct: number;
  gapToTarget: number;
  estYearsToFire: number;
  currentWithdrawalRate: number;
  targetRequired: number;
}

export function calcSnapshotMetrics(
  snapshot: SnapshotInputs,
  result: CalculationResult,
  accountType: 'taxable' | 'deferred' | 'taxfree',
  withdrawal: number,
  annualReturn: number = 0.05
): SnapshotMetrics {
  const netWorth = snapshot.totalAssets - snapshot.totalLiabilities;

  const targetRequired =
    accountType === 'deferred' ? result.deferredRequired :
    accountType === 'taxfree' ? result.taxfreeRequired :
    result.taxableRequired;

  const fireAchievementPct = targetRequired > 0 ? netWorth / targetRequired : 0;
  const gapToTarget = targetRequired - netWorth;

  let estYearsToFire = 0;
  if (gapToTarget > 0) {
    const S = snapshot.annualSavings;
    const W = Math.max(netWorth, 0);
    const T = targetRequired;
    const r = annualReturn;

    if (S <= 0) {
      estYearsToFire = 999;
    } else if (r <= 0.001) {
      estYearsToFire = Math.ceil(gapToTarget / S);
    } else {
      // FV formula: T = W*(1+r)^n + S*((1+r)^n - 1)/r
      // => (1+r)^n = (T + S/r) / (W + S/r)
      // => n = ln((T + S/r) / (W + S/r)) / ln(1+r)
      const numerator = T + S / r;
      const denominator = W + S / r;
      if (denominator > 0 && numerator / denominator > 1) {
        estYearsToFire = Math.ceil(Math.log(numerator / denominator) / Math.log(1 + r));
      } else {
        estYearsToFire = Math.ceil(gapToTarget / S);
      }
    }
  }

  const currentWithdrawalRate = netWorth > 0 ? withdrawal / netWorth : 0;

  return {
    netWorth,
    fireAchievementPct,
    gapToTarget,
    estYearsToFire: Math.max(0, estYearsToFire),
    currentWithdrawalRate,
    targetRequired,
  };
}

export function formatCompact(value: number, language: string): string {
  if (language === 'zh-TW') {
    const wan = Math.round(Math.abs(value) / 10000);
    const sign = value < 0 ? '-' : '';
    return `${sign}NT$${wan.toLocaleString('zh-TW')}萬`;
  } else {
    const M = Math.abs(value) / 1000000;
    const sign = value < 0 ? '-' : '';
    return `${sign}$${M.toFixed(1)}M`;
  }
}
