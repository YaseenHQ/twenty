import { useQuery } from '@apollo/client';

import { GET_MANY_REMOTE_TABLES } from '@/databases/graphql/queries/findManyRemoteTables';
import { useApolloMetadataClient } from '@/object-metadata/hooks/useApolloMetadataClient';
import {
  GetManyRemoteTablesQuery,
  GetManyRemoteTablesQueryVariables,
} from '~/generated-metadata/graphql';

type UseGetDatabaseConnectionTablesParams = {
  connectionId: string;
  skip?: boolean;
  refreshData?: boolean;
};

export const useGetDatabaseConnectionTables = ({
  connectionId,
  skip,
  refreshData,
}: UseGetDatabaseConnectionTablesParams) => {
  const apolloMetadataClient = useApolloMetadataClient();

  const { data, error } = useQuery<
    GetManyRemoteTablesQuery,
    GetManyRemoteTablesQueryVariables
  >(GET_MANY_REMOTE_TABLES, {
    client: apolloMetadataClient ?? undefined,
    skip: skip || !apolloMetadataClient,
    variables: {
      input: {
        id: connectionId,
        refreshData: refreshData,
      },
    },
  });

  return {
    tables: data?.findAvailableRemoteTablesByServerId || [],
    error,
  };
};
