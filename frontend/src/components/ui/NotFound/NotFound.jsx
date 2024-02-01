import { Helmet } from "react-helmet";

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>{`Error 404 (Not Found)! - iCode Example`}</title>
      </Helmet>
      <div className="flex flex-col w-full items-center text-red-500 text-4xl gap-6">
        <div>
          <img
            src="https://github.com/ceo-py/Project-Pictures/blob/main/iCode-Examples/error-404-6052476_640.png?raw=true"
            alt="404 error picture"
          />
        </div>
      </div>
    </>
  );
}
