import BaseProvider from "../src/index";
import { createGraphQLClient, PAGE_QUERY, PAGE_CONTENT_QUERY, PAGE_CONTEXT_QUERY } from "../src/clients/graphQL";

class GraphCmsProdiver extends BaseProvider {
  url = null;
  authToken = null;
  client = {};
  schema = {
    content: 'contents',
    style: 'styles',
    pageType: 'page',
    sectionType: 'section'
  }

  constructor(url, authToken, schema = {}) {
    this.url = url;
    this.authToken = authToken;
    this.schema = {...this.schema, ...schema}

    // Initialize a GraphQL client
    this.client = createGraphQLClient(url, authToken);
  }

  async getPages() {
    const { data } = await this.client.query({
      query: `
        query GetPages {
          ${this.schema.content} (where: { type: ${this.schema.pageType} }) {
            ${PAGE_QUERY}
          }
        }
      `,
    });

    return data.contents
  }

  getSiteSections() {
    const { data } = await this.client.query({
      query: `
        query GetSections {
          ${this.schema.content} (where: { type: ${this.schema.sectionType} }) {
            ${SECTION_LIST_QUERY}
          }
        }
      `,
    });

    return data.contents
  }

  createPage() {}

  getPageContent(id) {
    const { data } = await this.client.query({
      query: `
        query GetPageContent($id: ID!) {
          content(where: { id: $id  }) {
            ${PAGE_CONTENT_QUERY}
          }
        }
      `,
      variables: { id }
    });

    return data.content
  }

  updatePageContent(id, content) {}

  getPageState(id) {
    const { data } = await this.client.query({
      query: `
        query GetPageState($id: ID!) {
          content(where: { id: $id  }) {
            ${PAGE_CONTEXT_QUERY}
          }
        }
      `,
      variables: { id }
    });

    return data.content
  }

  updatePageState(id, content) {}

  getSharedStyles() {
    const { data } = await this.client.query({
      query: `
        query GetStyles {
          styles {
            styles
          }
        }
      `,
    });

    return data.styles[0]
  }

  updateSharedStyles() {}
}

export default GraphCmsProdiver;
