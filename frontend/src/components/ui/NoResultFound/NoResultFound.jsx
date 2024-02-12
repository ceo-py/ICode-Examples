import { Helmet } from "react-helmet";

export function NoResultFound() {
  return (
    <>
      <Helmet>
        <title>{`Your search did not match any solutions - iCode Example`}</title>
      </Helmet>
      <div className="flex flex-col w-full items-center text-default-500 text-4xl gap-6">
        <p>Sorry, we couldn't find any relevant solutions for your task.</p>
        <p>You can help us improve our knowledge base by adding it yourself!</p>
      </div>
    </>
  );
}
