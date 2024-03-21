'use client';

import { Answer } from '../answer';

export const Poll = ({
  poll,
  loading = false,
  onClick,
  showResults = false,
}: {
  poll: {
    id: string;
    question: string;
    totalVotes: number;
    answers: {
      id: string;
      votes: number;
      percentage: number;
      text: string;
    }[];
  };
  loading?: boolean;
  showResults?: boolean;
  onClick: (answerId: string) => Promise<void>;
}) => {
  const handleClick = async (answerId: string) => {
    await onClick(answerId);
  };

  return (
    <div>
      <h1 className="mb-6 text-6xl">{poll.question}</h1>
      <p className="mb-6 text-2xl">
        Total votes: {poll.totalVotes.toLocaleString()}
      </p>

      <ul className="max-w-3xl">
        {poll.answers.map((answer) => (
          <Answer
            key={answer.id}
            text={answer.text}
            percentage={answer.percentage}
            showPercentage={showResults}
            disabled={showResults}
            loading={loading}
            votes={answer.votes}
            onClick={() => handleClick(answer.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export const PollSkeleton = () => {
  return (
    <div>
      <h1 className="mb-6 text-6xl">
        🚀
        <br />
        Loading...
      </h1>
      <p className="mb-6 text-2xl">Total votes: 0</p>

      <ul className="max-w-3xl">
        <Answer text="Loading..." loading />
        <Answer text="Loading..." loading />
        <Answer text="Loading..." loading />
        <Answer text="Loading..." loading />
      </ul>
    </div>
  );
};
