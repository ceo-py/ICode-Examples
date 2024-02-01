import { Helmet } from "react-helmet";

export function RateLimitReach() {
  return (
    <>
      <Helmet>
        <title>{`Rate limit reach - iCode Example`}</title>
      </Helmet>
      <div className="flex flex-col w-full items-center text-red-500 text-4xl gap-6">
        Take it easy, partner! You're nearing your limit.
      </div>
    </>
  );
}
