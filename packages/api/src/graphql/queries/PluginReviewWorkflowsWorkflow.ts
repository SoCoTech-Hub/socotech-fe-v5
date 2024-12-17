
export const GET_PLUGINREVIEWWORKFLOWSWORKFLOW_QUERY = `
query GetPluginReviewWorkflowsWorkflow($limit: Int!) {
  pluginreviewworkflowsworkflow(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        contentTypes
        createdAt
        createdBy
        locale
        localizations
        name
        publishedAt
        stageRequiredToPublish
        stages
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface PluginReviewWorkflowsWorkflow {
  id: string;
  attributes: {
    contentTypes: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    stageRequiredToPublish: string;
    stages: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetPluginReviewWorkflowsWorkflowResponse {
  pluginreviewworkflowsworkflow: {
    data: PluginReviewWorkflowsWorkflow[];
  };
}
