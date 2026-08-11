/**
 * Renders schema.org JSON-LD. Keys come from our own code (never user input),
 * so JSON.stringify output is safe to inject; `<` is escaped anyway so a stray
 * closing tag can never break out of the script element.
 */
export default function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
