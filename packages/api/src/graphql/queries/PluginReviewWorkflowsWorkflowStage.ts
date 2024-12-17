
export const GET_PLUGINREVIEWWORKFLOWSWORKFLOWSTAGE_QUERY = `
query GetPluginReviewWorkflowsWorkflowStage($limit: Int!) {
  pluginreviewworkflowsworkflowstage(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        color
        createdAt
        createdBy
        locale
        localizations
        name
        permissions
        publishedAt
        updatedAt
        updatedBy
        workflow
      }
    }
  }
}
`;

export interface PluginReviewWorkflowsWorkflowStage {
  id: string;
  attributes: {
    color: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    permissions: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    workflow: string;
  };
}

export interface GetPluginReviewWorkflowsWorkflowStageResponse {
  pluginreviewworkflowsworkflowstage: {
    data: PluginReviewWorkflowsWorkflowStage[];
  };
}
