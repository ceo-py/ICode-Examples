import { Helmet } from "react-helmet";


export function MetaTags({ title, description, keywords }) {
  const url = window.location

  return (
    <Helmet>
      <title>{title} {title !== 'iCode Example'? '| iCode Example': ''}</title>
      <meta name="title" content={title} />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="image"
        content="https://icode-example.ceo-py.eu/assets/Icon-71487908.svg"
      />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content="https://icode-example.ceo-py.eu/assets/MetaPic.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://icode-example.ceo-py.eu/assets/MetaPic.png"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content={url}
      />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content="https://icode-example.ceo-py.eu/assets/MetaPic.png"
      />
      <meta
        property="twitter:image:secure_url"
        content="https://icode-example.ceo-py.eu/assets/MetaPic.png"
      />

      <meta
        name="keywords"
        content={keywords}
      />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days"></meta>
    </Helmet>
  );
}
