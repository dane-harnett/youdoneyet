import { gql, useQuery } from "@apollo/client";
import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { Summary } from "../../types/Summary";

export const SUMMARIES_QUERY = gql`
  query {
    summaries @client {
      id
      name
      goal
      records {
        date
        completed
      }
    }
  }
`;

export const SummaryList = () => {
  const { data, loading } = useQuery(SUMMARIES_QUERY);

  return loading ? (
    <div data-testid="loading">
      <CircularProgress />
    </div>
  ) : (
    <>
      {data.summaries.length === 0 ? (
        <div data-testid="empty-summary-list">
          <Typography>
            You don't have any habit created yet, go to the Day screen and
            create your first habit!
          </Typography>
        </div>
      ) : (
        <div data-testid="summary-list">
          {data.summaries.map((summary: Summary) => {
            return (
              <div>
                <div data-testid="habit-name">{summary.name}</div>
                <div data-testid="records">
                  {summary.records.map((record) =>
                    record.completed ? "Y" : "N"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SummaryList;
