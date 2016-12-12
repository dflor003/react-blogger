import logger from '../../server/utils/logger/logger';

const log = logger('GRAPHQL');

export class GraphQLService {
  private endpoint: string;

  constructor() {
    // TODO: Inject config
    this.endpoint = `http://localhost:3001/graphql`
  }

  async request(query: string, variables?: Object): Promise<any> {
    const endpoint = this.endpoint;
    log.info(`Making GraphQL Request to ${endpoint}:`);
    log.info(`Query:`, query);
    log.info(`Variables:`, variables);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();
      return result.data;
    }

    const message = `GraphQL query failed with status ${response.status}: ${response.statusText}`;
    log.error(message, response.json());
    throw new Error(message)
  }
}

let instance: GraphQLService = null;
export default function graphql(query: string, variables: Object): Promise<any> {
  if (!instance) {
    instance = new GraphQLService();
  }

  return instance.request(query, variables);
}
