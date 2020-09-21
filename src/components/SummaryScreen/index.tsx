import React from "react";
import { useSession } from "next-auth/client";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SummaryList from "../SummaryList";
import Loading from "../Loading";
import SignIn from "../SignIn";

export const SummaryScreen = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <Loading />;
  }

  return (
    <div data-testid="summary-screen">
      <AppHeader />
      {!session ? (
        <SignIn />
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
