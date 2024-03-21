'use client';

import clsx from 'clsx';

export const Answer = ({
  text,
  percentage = 0,
  showPercentage = false,
  disabled = false,
  loading = false,
  votes = 0,
  onClick,
}: {
  text: string;
  percentage?: number;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  votes?: number;
  showPercentage?: boolean;
}) => {
  return (
    <li className="mb-4 flex">
      <button
        onClick={onClick}
        type="button"
        disabled={disabled || loading}
        className={clsx(
          'group relative block w-full overflow-hidden rounded-xl bg-blue-800 p-4 text-left text-xl',
          {
            'cursor-wait': loading,
            'cursor-not-allowed': disabled,
            'cursor-pointer': !disabled && !loading,
          },
        )}
      >
        <div
          className={clsx('absolute inset-y-0 left-0 bg-blue-500', {
            'transition-all': disabled,
            'group-hover:!w-full': !disabled,
          })}
          style={{ width: showPercentage ? `${percentage}%` : 0 }}
        />

        {loading && (
          <div className={clsx('absolute inset-0 animate-pulse bg-blue-500')} />
        )}

        <span className="relative z-10">{text}</span>
      </button>

      <div
        className={clsx(
          'ml-4 flex w-28 flex-col items-center justify-center py-4 text-xl',
          {
            'opacity-0': !showPercentage,
          },
        )}
      >
        <div>{percentage.toPrecision(2)}%</div>
        <div className="text-xs">({votes} votes)</div>
      </div>
    </li>
  );
};
