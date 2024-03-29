import { useLazyQuery } from "@apollo/client";
import { GET_USER_HOME_DETAILS } from "../../../../graphql/queries/userHomeQuery";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import serverError from "../../../utils/serverError/serverError";
import { LoadingCircle } from "../../LoadingCIrcle/LoadingCircle";
import { NotFound } from "../../NotFound/NotFound";
import { Avatar, Card, CardHeader } from "@nextui-org/react";
import { numbersFormat } from "../../../utils/numberFormat/numberFormat";
import { SocialMediaLinks } from "./SocialMediaLinks/SocialMediaLinks";
import TabLanguages from "../../TabLanguages/TabLanguages";
import { LanguageLocalStorage } from "../../../utils/LanguageLocalStorage/LanguageLocalStorage";
import { ResultListTable } from "../../ResultListTable/ResultListTable";
import { MetaTags } from "../../MetaTags/MetaTags";

export function UserHomePage() {
  const [userDetails, { data, loading }] = useLazyQuery(GET_USER_HOME_DETAILS);
  const [filterValue, setFilterValue] = useState("");
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = LanguageLocalStorage();

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

  // TODO: Fetch every time page is one!!!!!!!!!
  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : data?.getUserHome?.languages?.status?.code !== 200 ? (
        <NotFound />
      ) : (
        <>
          <MetaTags
            title={`${data.getUserHome.details.username} Home Page`}
            description={`Welcome to ${data.getUserHome.details.username} home page on iCode Example. Explore Test's contributions, solutions, and activity on our platform. Join our coding community and start your own coding journey today!`}
            keywords="icode example"
          />
          <Card className="grow">
            <CardHeader className="flex flex-wrap justify-center gap-10">
              <div className="flex flex-col">
                <Avatar
                  isBordered
                  radius="full"
                  className="w-20 h-20 text-large"
                  showFallback
                  src={data.getUserHome.details.icon}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-small font-semibold leading-none text-default-600">
                  {numbersFormat(data.getUserHome.details.followers)} followers
                </p>
                <p className="text-small font-semibold leading-none text-default-600">
                  {numbersFormat(data.getUserHome.totalSolutions)} solutions
                </p>
                <h5 className="text-small tracking-tight text-default-400">
                  @{data.getUserHome.details.username}
                </h5>
              </div>
              <SocialMediaLinks
                youtube={data.getUserHome.details.youtube}
                github={data.getUserHome.details.github}
                linkedin={data.getUserHome.details.linkedin}
                username={data.getUserHome.details.username}
                userId={data.getUserHome.userId}
                follower={data.getUserHome.follower}
                userDetails={userDetails}
              />
              <TabLanguages
                language={language}
                setLanguage={setLanguage}
                languageCount={{
                  python: JSON.parse(data?.getUserHome?.languages?.python)
                    .length,
                  javaScript: JSON.parse(
                    data?.getUserHome?.languages?.javascript
                  ).length,
                  cSharp: JSON.parse(data?.getUserHome?.languages?.csharp)
                    .length,
                  java: JSON.parse(data?.getUserHome?.languages?.java).length,
                  cpp: JSON.parse(data?.getUserHome?.languages?.cpp).length,
                }}
                setFilterValue={setFilterValue}
              />
            </CardHeader>
            <ResultListTable
              outsideData={data.getUserHome.languages[language]}
              showDropDownMenu={true}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </Card>
        </>
      )}
    </>
  );
}
