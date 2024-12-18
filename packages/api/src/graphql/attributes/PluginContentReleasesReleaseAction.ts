
export interface PluginContentReleasesReleaseAction {
  id: string;
  attributes: {
    contentType: string;
    createdAt: string;
    createdBy: string;
    entryDocumentId: string;
    isEntryValid: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    release: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}
