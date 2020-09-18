import React from "react";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SummaryList from "../SummaryList";
import Loading from "../Loading";
import { signIn, useSession } from "next-auth/client";

export const SummaryScreen = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <Loading />;
  }

  return (
    <div data-testid="summary-screen">
      <AppHeader />
      {!session ? (
        <>
          Not signed in <br />
          <button
            onClick={() => {
              signIn("auth0");
            }}
          >
            Sign in
          </button>
        </>
      ) : (
        <>
          <NavigationTabs value={1} />
          <SummaryList />
        </>
      )}
    </div>
  );
};

export default SummaryScreen;
