import * as React from "react";
import { GetServerDataReturn, PageProps } from "gatsby";

interface TitleAndDescriptionItem {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
  };
}

interface GlossaryPageDataServerProps {
  items: {
    items: TitleAndDescriptionItem[];
  };
}

const GlossaryPage: React.FC<PageProps<GlossaryPageDataServerProps>> = ({
  serverData,
}) => {
  const {
    items: { items },
  } = serverData as GlossaryPageDataServerProps;
  return (
    <section>
      <div style={{ margin: "40px", paddingTop: "25px" }}>
        <h2>Glossary</h2>

        {/* {JSON.stringify(items)} */}

        {items?.map(item => (
          <div
            key={item.sys.id}
            style={{ border: "1px solid black", marginBottom: "10px" }}
          >
            <strong>{item.fields.title}</strong>- {item.fields.description}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GlossaryPage;

export async function getServerData(): GetServerDataReturn<GlossaryPageDataServerProps> {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${
        process.env.CONTENTFUL_SPACE_ID ?? ""
      }/environments/master/entries/?select=sys.id,fields.title,fields.description&content_type=titleAndDescription`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            process.env.CONTENTFUL_DELIVERY_TOKEN ?? ""
          }`,
        },
      }
    );
    const data: unknown = await res.json();
    return {
      props: {
        items: data as GlossaryPageDataServerProps["items"],
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        items: { items: [] },
      },
    };
  }
}
