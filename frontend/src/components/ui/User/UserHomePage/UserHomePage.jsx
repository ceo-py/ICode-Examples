import { useLazyQuery } from "@apollo/client";
import { GET_USER_HOME_DETAILS } from "../../../../graphql/queries/userHomeQuery";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import serverError from "../../../utils/serverError/serverError";
import { LoadingCircle } from "../../LoadingCIrcle/LoadingCircle";
import { NotFound } from "../../NotFound/NotFound";

export function UserHomePage() {
  const [userDetails, { data, loading }] = useLazyQuery(GET_USER_HOME_DETAILS);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("name")) return;
    try {
      userDetails({
        variables: {
          input: {
            username: searchParams.get("name"),
          },
        },
      });
    } catch (error) {
      serverError();
    }
  }, [searchParams]);

  console.log(data);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : data?.getUserHome?.languages?.status?.code !== 200 ? (
        <NotFound />
      ) : (
        data?.getUserHome?.languages?.status?.code
      )}
    </>
  );
}
