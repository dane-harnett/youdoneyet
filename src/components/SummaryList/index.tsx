import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CompletedIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";
import NotCompletedIcon from "@material-ui/icons/SentimentVeryDissatisfiedRounded";
import { Summary } from "../../types/Summary";
import Loading from "../Loading";

export const SUMMARIES_QUERY = gql`
  query {
    summaries {
      id
      name
      goal
      streak
      records {
        date
        completed
      }
    }
  }
`;

export const SummaryList = () => {
  const theme = useTheme();
  const { data, loading } = useQuery(SUMMARIES_QUERY);

  return loading ? (
    <Loading />
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
        <Box mt={1} px={1} data-testid="summary-list">
          {data.summaries.map((summary: Summary) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                key={summary.id}
                alignItems="start"
                justifyContent="space-between"
                p={1}
                borderRadius={4}
                mb={1}
                bgcolor={theme?.custom?.ListItem.backgroundColor}
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography variant="subtitle1" data-testid="habit-name">
                    {summary.name}
                  </Typography>
                  <Typography variant="subtitle1" data-testid="streak">
                    Streak: {summary.streak}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  data-testid="records"
                  width="100%"
                >
                  {summary.records.map((record, index) =>
                    record.completed ? (
                      <CompletedIcon
                        key={record.date}
                        data-completed="Y"
                        data-testid="record-item"
                        data-record-index={index}
                        color="primary"
                        fontSize="small"
                      />
                    ) : (
                      <NotCompletedIcon
                        key={record.date}
                        data-completed="N"
                        data-testid="record-item"
                        data-record-index={index}
                        color="error"
                        fontSize="small"
                      />
                    )
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default SummaryList;
