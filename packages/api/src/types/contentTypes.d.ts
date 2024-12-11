import type { Struct, Schema } from '@strapi/strapi';

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    width: Schema.Attribute.Integer;
    height: Schema.Attribute.Integer;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    ext: Schema.Attribute.String;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    related: Schema.Attribute.Relation<'morphToMany'>;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    timezone: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    entryDocumentId: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    name: 'Workflow';
    description: '';
    singularName: 'workflow';
    pluralName: 'workflows';
    displayName: 'Workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    name: 'Workflow Stage';
    description: '';
    singularName: 'workflow-stage';
    pluralName: 'workflow-stages';
    displayName: 'Stages';
  };
  options: {
    version: '1.1.0';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String;
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Schema.Attribute.String;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    assignmentReplies: Schema.Attribute.Relation<
      'manyToMany',
      'api::assignment-reply.assignment-reply'
    >;
    zoomMeetings: Schema.Attribute.Relation<
      'manyToMany',
      'api::zoom-meeting.zoom-meeting'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAccessAccess extends Struct.CollectionTypeSchema {
  collectionName: 'accesses';
  info: {
    singularName: 'access';
    pluralName: 'accesses';
    displayName: 'Access';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
    paid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::access.access'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAddressAddress extends Struct.CollectionTypeSchema {
  collectionName: 'addresses';
  info: {
    singularName: 'address';
    pluralName: 'addresses';
    displayName: 'Address';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    addressLine1: Schema.Attribute.String;
    addressLine2: Schema.Attribute.String;
    town: Schema.Attribute.String;
    contactNr: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    profile: Schema.Attribute.Relation<'manyToOne', 'api::profile.profile'>;
    country: Schema.Attribute.Relation<'oneToOne', 'api::country.country'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::address.address'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateAffiliate extends Struct.CollectionTypeSchema {
  collectionName: 'affiliates';
  info: {
    singularName: 'affiliate';
    pluralName: 'affiliates';
    displayName: 'Affiliate';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    isApproved: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    note: Schema.Attribute.Blocks;
    affiliate_details: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-detail.affiliate-detail'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate.affiliate'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateDetailAffiliateDetail
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_details';
  info: {
    singularName: 'affiliate-detail';
    pluralName: 'affiliate-details';
    displayName: 'Affiliate Detail';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    number: Schema.Attribute.String;
    code: Schema.Attribute.String;
    bank: Schema.Attribute.String;
    type: Schema.Attribute.String;
    affiliate: Schema.Attribute.Relation<
      'manyToOne',
      'api::affiliate.affiliate'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-detail.affiliate-detail'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateSettingAffiliateSetting
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_settings';
  info: {
    singularName: 'affiliate-setting';
    pluralName: 'affiliate-settings';
    displayName: 'Affiliate Setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    rate: Schema.Attribute.Decimal;
    terms: Schema.Attribute.Blocks;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-setting.affiliate-setting'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateStatusAffiliateStatus
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_statuses';
  info: {
    singularName: 'affiliate-status';
    pluralName: 'affiliate-statuses';
    displayName: 'Affiliate Status';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-status.affiliate-status'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateTransactionAffiliateTransaction
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_transactions';
  info: {
    singularName: 'affiliate-transaction';
    pluralName: 'affiliate-transactions';
    displayName: 'Affiliate Transaction';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    paid: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    balance: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    paidDate: Schema.Attribute.DateTime;
    accountNumber: Schema.Attribute.String;
    affiliateStatus: Schema.Attribute.Relation<
      'oneToOne',
      'api::affiliate-status.affiliate-status'
    >;
    affiliate: Schema.Attribute.Relation<
      'oneToOne',
      'api::affiliate.affiliate'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-transaction.affiliate-transaction'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Schema.Attribute.String;
    slug: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    image: Schema.Attribute.Media<'images'>;
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    description: Schema.Attribute.Blocks;
    shortDescription: Schema.Attribute.Blocks;
    content: Schema.Attribute.DynamicZone<['shared.rich-text', 'shared.media']>;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::article-category.article-category'
    >;
    tags: Schema.Attribute.Relation<
      'manyToMany',
      'api::article-tag.article-tag'
    >;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    targets: Schema.Attribute.Relation<'manyToMany', 'api::target.target'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleCategoryArticleCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'article_categories';
  info: {
    singularName: 'article-category';
    pluralName: 'article-categories';
    displayName: 'Article Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-category.article-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleSavedArticleSaved
  extends Struct.CollectionTypeSchema {
  collectionName: 'article_saveds';
  info: {
    singularName: 'article-saved';
    pluralName: 'article-saveds';
    displayName: 'Article Saved';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-saved.article-saved'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleTagArticleTag extends Struct.CollectionTypeSchema {
  collectionName: 'article_tags';
  info: {
    singularName: 'article-tag';
    pluralName: 'article-tags';
    displayName: 'Article Tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-tag.article-tag'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAssignmentReplyAssignmentReply
  extends Struct.CollectionTypeSchema {
  collectionName: 'assignment_replies';
  info: {
    singularName: 'assignment-reply';
    pluralName: 'assignment-replies';
    displayName: 'Assignment Reply';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    isGrouped: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    instructor: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    students: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    grade: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    feedback: Schema.Attribute.Blocks;
    attachmentReply: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    attempt: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    lesson_assignment: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-assignment.lesson-assignment'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::assignment-reply.assignment-reply'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAudioPlaylistAudioPlaylist
  extends Struct.CollectionTypeSchema {
  collectionName: 'audio_playlists';
  info: {
    singularName: 'audio-playlist';
    pluralName: 'audio-playlists';
    displayName: 'Audio Playlist';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.JSON;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::audio-playlist.audio-playlist'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiBursaryBursary extends Struct.CollectionTypeSchema {
  collectionName: 'bursaries';
  info: {
    singularName: 'bursary';
    pluralName: 'bursaries';
    displayName: 'Bursary';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    whoQualifies: Schema.Attribute.Blocks;
    application: Schema.Attribute.Blocks;
    open: Schema.Attribute.Date;
    close: Schema.Attribute.Date;
    value: Schema.Attribute.Blocks;
    particulars: Schema.Attribute.Blocks;
    note: Schema.Attribute.Blocks;
    url: Schema.Attribute.String;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::bursary-category.bursary-category'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bursary.bursary'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiBursaryCategoryBursaryCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'bursary_categories';
  info: {
    singularName: 'bursary-category';
    pluralName: 'bursary-categories';
    displayName: 'Bursary Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    description: Schema.Attribute.Text;
    bursaries: Schema.Attribute.Relation<'manyToMany', 'api::bursary.bursary'>;
    institutes: Schema.Attribute.Relation<
      'manyToMany',
      'api::institute.institute'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bursary-category.bursary-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiBursaryResponseBursaryResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'bursary_responses';
  info: {
    singularName: 'bursary-response';
    pluralName: 'bursary-responses';
    displayName: 'Bursary Response';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bursary: Schema.Attribute.Relation<'oneToOne', 'api::bursary.bursary'>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bursary-response.bursary-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiCommentComment extends Struct.CollectionTypeSchema {
  collectionName: 'comments';
  info: {
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    comment: Schema.Attribute.Blocks;
    parent: Schema.Attribute.Relation<'oneToOne', 'api::comment.comment'>;
    social: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::comment.comment'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiCountryCountry extends Struct.CollectionTypeSchema {
  collectionName: 'countries';
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    currency: Schema.Attribute.String;
    shortCode: Schema.Attribute.UID<'name'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::country.country'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiDistrictDistrict extends Struct.CollectionTypeSchema {
  collectionName: 'districts';
  info: {
    singularName: 'district';
    pluralName: 'districts';
    displayName: 'District';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    country: Schema.Attribute.Relation<'oneToOne', 'api::country.country'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    suburbs: Schema.Attribute.Relation<'oneToMany', 'api::suburb.suburb'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::district.district'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiEmailListEmailList extends Struct.CollectionTypeSchema {
  collectionName: 'email_lists';
  info: {
    singularName: 'email-list';
    pluralName: 'email-lists';
    displayName: 'Email List';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    to: Schema.Attribute.Relation<'oneToOne', 'plugin::users-permissions.user'>;
    from: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    subject: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::email-list.email-list'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiEmoticonEmoticon extends Struct.CollectionTypeSchema {
  collectionName: 'emoticons';
  info: {
    singularName: 'emoticon';
    pluralName: 'emoticons';
    displayName: 'Emoticon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emoticon.emoticon'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiEventEvent extends Struct.CollectionTypeSchema {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Schema.Attribute.String;
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    desciption: Schema.Attribute.Blocks;
    start: Schema.Attribute.DateTime;
    end: Schema.Attribute.DateTime;
    image: Schema.Attribute.Media<'images'>;
    suburb: Schema.Attribute.Relation<'oneToOne', 'api::suburb.suburb'>;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    school: Schema.Attribute.Relation<'oneToOne', 'api::school.school'>;
    private: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String;
    isLive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    location: Schema.Attribute.Text;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    teacher: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    student: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventResponseEventResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'event_responses';
  info: {
    singularName: 'event-response';
    pluralName: 'event-responses';
    displayName: 'Event Response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    event: Schema.Attribute.Relation<'oneToOne', 'api::event.event'>;
    attending: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::event-response.event-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiFacultyFaculty extends Struct.CollectionTypeSchema {
  collectionName: 'faculties';
  info: {
    singularName: 'faculty';
    pluralName: 'faculties';
    displayName: 'Faculty';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    about: Schema.Attribute.Blocks;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    background: Schema.Attribute.Media<'images'>;
    institutes: Schema.Attribute.Relation<
      'manyToMany',
      'api::institute.institute'
    >;
    qualifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::qualification.qualification'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faculty.faculty'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqFaq extends Struct.CollectionTypeSchema {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    answer: Schema.Attribute.Blocks;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    category: Schema.Attribute.Relation<
      'manyToOne',
      'api::faq-category.faq-category'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqCategoryFaqCategory extends Struct.CollectionTypeSchema {
  collectionName: 'faq_categories';
  info: {
    singularName: 'faq-category';
    pluralName: 'faq-categories';
    displayName: 'FAQ Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Blocks;
    background: Schema.Attribute.Media<'images'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faq-category.faq-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiFeedFeed extends Struct.CollectionTypeSchema {
  collectionName: 'feeds';
  info: {
    singularName: 'feed';
    pluralName: 'feeds';
    displayName: 'Feed';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    description: Schema.Attribute.Blocks;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    videoLink: Schema.Attribute.String;
    url: Schema.Attribute.String;
    title: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    targets: Schema.Attribute.Relation<'oneToMany', 'api::target.target'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::feed.feed'> &
      Schema.Attribute.Private;
  };
}

export interface ApiForumForum extends Struct.CollectionTypeSchema {
  collectionName: 'forums';
  info: {
    singularName: 'forum';
    pluralName: 'forums';
    displayName: 'Forum';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.Blocks;
    pin: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    slug: Schema.Attribute.UID<'name'>;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::forum.forum'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGenderGender extends Struct.CollectionTypeSchema {
  collectionName: 'genders';
  info: {
    singularName: 'gender';
    pluralName: 'genders';
    displayName: 'Gender';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gender.gender'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiGradeGrade extends Struct.CollectionTypeSchema {
  collectionName: 'grades';
  info: {
    singularName: 'grade';
    pluralName: 'grades';
    displayName: 'Grade';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    icon: Schema.Attribute.Media<'images'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    knowledgeBases: Schema.Attribute.Relation<
      'manyToMany',
      'api::knowledge-base.knowledge-base'
    >;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::grade.grade'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHistoryHistory extends Struct.CollectionTypeSchema {
  collectionName: 'histories';
  info: {
    singularName: 'history';
    pluralName: 'histories';
    displayName: 'History';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    type: Schema.Attribute.String;
    action: Schema.Attribute.String;
    content: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::history.history'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiInMailInMail extends Struct.CollectionTypeSchema {
  collectionName: 'in_mails';
  info: {
    singularName: 'in-mail';
    pluralName: 'in-mails';
    displayName: 'In Mail';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    from: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    to: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    cc: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    bcc: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    subject: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    draft: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    reply: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    replyParent: Schema.Attribute.Relation<'oneToOne', 'api::in-mail.in-mail'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::in-mail.in-mail'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiInMailResponseInMailResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'in_mail_responses';
  info: {
    singularName: 'in-mail-response';
    pluralName: 'in-mail-responses';
    displayName: 'InMail Response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    inMail: Schema.Attribute.Relation<'oneToOne', 'api::in-mail.in-mail'>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    starred: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    important: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    deleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::in-mail-response.in-mail-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiInstituteInstitute extends Struct.CollectionTypeSchema {
  collectionName: 'institutes';
  info: {
    singularName: 'institute';
    pluralName: 'institutes';
    displayName: 'Institute';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    background: Schema.Attribute.Media<'images'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    bursaryCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::bursary-category.bursary-category'
    >;
    faculties: Schema.Attribute.Relation<'manyToMany', 'api::faculty.faculty'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::institute.institute'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Struct.CollectionTypeSchema {
  collectionName: 'invoices';
  info: {
    singularName: 'invoice';
    pluralName: 'invoices';
    displayName: 'Invoice';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    sender: Schema.Attribute.Email;
    shipTo: Schema.Attribute.Email;
    body: Schema.Attribute.Blocks;
    transaction: Schema.Attribute.Relation<
      'oneToOne',
      'api::transaction.transaction'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invoice.invoice'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiJobApplicationJobApplication
  extends Struct.CollectionTypeSchema {
  collectionName: 'job_applications';
  info: {
    singularName: 'job-application';
    pluralName: 'job-applications';
    displayName: 'Job Application';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    institution: Schema.Attribute.String;
    term: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::job-application.job-application'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiKbCategoryKbCategory extends Struct.CollectionTypeSchema {
  collectionName: 'kb_categories';
  info: {
    singularName: 'kb-category';
    pluralName: 'kb-categories';
    displayName: 'KB Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'name'>;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    background: Schema.Attribute.Media<'images'>;
    bgColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    knowledgeBases: Schema.Attribute.Relation<
      'manyToMany',
      'api::knowledge-base.knowledge-base'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::kb-category.kb-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiKbTopicKbTopic extends Struct.CollectionTypeSchema {
  collectionName: 'kb_topics';
  info: {
    singularName: 'kb-topic';
    pluralName: 'kb-topics';
    displayName: 'KB Topic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'name'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    knowledgeBases: Schema.Attribute.Relation<
      'manyToMany',
      'api::knowledge-base.knowledge-base'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::kb-topic.kb-topic'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiKnowledgeBaseKnowledgeBase
  extends Struct.CollectionTypeSchema {
  collectionName: 'knowledge_bases';
  info: {
    singularName: 'knowledge-base';
    pluralName: 'knowledge-bases';
    displayName: 'Knowledge Base';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    author: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    attachment: Schema.Attribute.Media<
      'images' | 'videos' | 'audios' | 'files',
      true
    >;
    estimatedReadingTime: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    access: Schema.Attribute.Relation<'oneToOne', 'api::access.access'>;
    releaseYear: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<2024>;
    link: Schema.Attribute.String;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::kb-category.kb-category'
    >;
    topics: Schema.Attribute.Relation<'manyToMany', 'api::kb-topic.kb-topic'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    language: Schema.Attribute.String & Schema.Attribute.DefaultTo<'English'>;
    download: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::knowledge-base.knowledge-base'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonLesson extends Struct.CollectionTypeSchema {
  collectionName: 'lessons';
  info: {
    singularName: 'lesson';
    pluralName: 'lessons';
    displayName: 'Lesson';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    duration: Schema.Attribute.Integer;
    topic: Schema.Attribute.String;
    presenter: Schema.Attribute.String;
    startDate: Schema.Attribute.DateTime;
    endDate: Schema.Attribute.DateTime;
    hasReview: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hasComment: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hasRating: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLiveLesson: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    subject_category: Schema.Attribute.Relation<
      'oneToOne',
      'api::subject-category.subject-category'
    >;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    provinces: Schema.Attribute.Relation<
      'manyToMany',
      'api::province.province'
    >;
    featuredImage: Schema.Attribute.Media<'images'>;
    overview: Schema.Attribute.Blocks;
    resources: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    downloadResources: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    notes: Schema.Attribute.Blocks;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    requiredLesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    modules: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-module.lesson-module'
    >;
    audios: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-audio.lesson-audio'
    >;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    assignments: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-assignment.lesson-assignment'
    >;
    quizes: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-quiz.lesson-quiz'
    >;
    surveys: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-survey.lesson-survey'
    >;
    zoom: Schema.Attribute.Relation<'oneToOne', 'api::zoom.zoom'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson.lesson'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonAssignmentLessonAssignment
  extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_assignments';
  info: {
    singularName: 'lesson-assignment';
    pluralName: 'lesson-assignments';
    displayName: 'Lesson Assignment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    question: Schema.Attribute.Blocks;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    dueDate: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-10-21T22:00:00.000Z'>;
    reminderDate: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-10-20T22:00:00.000Z'>;
    isGrouped: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    retry: Schema.Attribute.Component<'shared.retry', true>;
    rubicon: Schema.Attribute.DynamicZone<['shared.criteria']>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-assignment.lesson-assignment'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonAudioLessonAudio extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_audios';
  info: {
    singularName: 'lesson-audio';
    pluralName: 'lesson-audios';
    displayName: 'Lesson Audio';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    audioLinks: Schema.Attribute.Blocks;
    audio: Schema.Attribute.Media<'audios', true>;
    description: Schema.Attribute.Blocks;
    duration: Schema.Attribute.Integer;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-audio.lesson-audio'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonModuleLessonModule
  extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_modules';
  info: {
    singularName: 'lesson-module';
    pluralName: 'lesson-modules';
    displayName: 'Lesson Module';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    content: Schema.Attribute.Blocks;
    description: Schema.Attribute.Blocks;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    videoLink: Schema.Attribute.String;
    duration: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    attachment: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    downloadAttachment: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    audioFiles: Schema.Attribute.Media<'files' | 'audios', true>;
    downloadAudio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-module.lesson-module'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonQuizLessonQuiz extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_quizs';
  info: {
    singularName: 'lesson-quiz';
    pluralName: 'lesson-quizs';
    displayName: 'Lesson Quiz';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    questions: Schema.Attribute.DynamicZone<
      [
        'shared.single-choice-quiz',
        'shared.multiple-choice-quiz',
        'shared.free-choice',
      ]
    >;
    isSiyavula: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    siyavulaActivityIds: Schema.Attribute.JSON;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-quiz.lesson-quiz'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonSurveyLessonSurvey
  extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_surveys';
  info: {
    singularName: 'lesson-survey';
    pluralName: 'lesson-surveys';
    displayName: 'Lesson Survey';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    questions: Schema.Attribute.DynamicZone<
      [
        'shared.single-choice-quiz',
        'shared.single-answer',
        'shared.multiple-choice-quiz',
        'shared.free-choice',
      ]
    >;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-survey.lesson-survey'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiLikeLike extends Struct.CollectionTypeSchema {
  collectionName: 'likes';
  info: {
    singularName: 'like';
    pluralName: 'likes';
    displayName: 'Like';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    emoticon: Schema.Attribute.Relation<'oneToOne', 'api::emoticon.emoticon'>;
    social: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::like.like'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNotificationNotification
  extends Struct.CollectionTypeSchema {
  collectionName: 'notifications';
  info: {
    singularName: 'notification';
    pluralName: 'notifications';
    displayName: 'Notification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    type: Schema.Attribute.Enumeration<
      ['info', 'warning', 'alert', 'success']
    > &
      Schema.Attribute.DefaultTo<'info'>;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiNotificationResponseNotificationResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'notification_responses';
  info: {
    singularName: 'notification-response';
    pluralName: 'notification-responses';
    displayName: 'Notification Response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    notification: Schema.Attribute.Relation<
      'oneToOne',
      'api::notification.notification'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification-response.notification-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiOrganizationOrganization
  extends Struct.CollectionTypeSchema {
  collectionName: 'organizations';
  info: {
    singularName: 'organization';
    pluralName: 'organizations';
    displayName: 'Organization';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    favicon: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    logoDark: Schema.Attribute.Media<'images'>;
    primaryColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    secondaryColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    componentBg: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    appBg: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    componentBgDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    appBgDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    text: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    textDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    primaryColorDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    secondaryColorDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon1: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon1Dark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon2: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon2Dark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    entityId: Schema.Attribute.String;
    merchantId: Schema.Attribute.String;
    merchantKey: Schema.Attribute.String;
    freemium: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    vouchers: Schema.Attribute.Relation<'oneToMany', 'api::voucher.voucher'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::organization.organization'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiPageTrackPageTrack extends Struct.CollectionTypeSchema {
  collectionName: 'page_tracks';
  info: {
    singularName: 'page-track';
    pluralName: 'page-tracks';
    displayName: 'Page Track';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
    time: Schema.Attribute.Decimal;
    action: Schema.Attribute.Text;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-track.page-track'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiParenRelationParenRelation
  extends Struct.CollectionTypeSchema {
  collectionName: 'paren_relations';
  info: {
    singularName: 'paren-relation';
    pluralName: 'paren-relations';
    displayName: 'Paren Relation';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::paren-relation.paren-relation'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiParentParent extends Struct.CollectionTypeSchema {
  collectionName: 'parents';
  info: {
    singularName: 'parent';
    pluralName: 'parents';
    displayName: 'Parent';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    firstName: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    mobileNr: Schema.Attribute.String;
    workNr: Schema.Attribute.String;
    idnumber: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    parentTitle: Schema.Attribute.Relation<
      'oneToOne',
      'api::parent-title.parent-title'
    >;
    parenRelation: Schema.Attribute.Relation<
      'oneToOne',
      'api::paren-relation.paren-relation'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::parent.parent'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiParentTitleParentTitle extends Struct.CollectionTypeSchema {
  collectionName: 'parent_titles';
  info: {
    singularName: 'parent-title';
    pluralName: 'parent-titles';
    displayName: 'Parent Title';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::parent-title.parent-title'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    image: Schema.Attribute.Media<'images'>;
    slug: Schema.Attribute.UID<'name'>;
    url: Schema.Attribute.String;
    productCustomField: Schema.Attribute.Component<'shared.custom-field', true>;
    productCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::product-category.product-category'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiProductCategoryProductCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'product_categories';
  info: {
    singularName: 'product-category';
    pluralName: 'product-categories';
    displayName: 'Product Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'name'>;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-category.product-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiProfileProfile extends Struct.CollectionTypeSchema {
  collectionName: 'profiles';
  info: {
    singularName: 'profile';
    pluralName: 'profiles';
    displayName: 'Profile';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    firstName: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    banner: Schema.Attribute.Media<'images'>;
    profilePic: Schema.Attribute.Media<'images'>;
    documents: Schema.Attribute.Media<'images' | 'videos', true>;
    dob: Schema.Attribute.Date & Schema.Attribute.DefaultTo<'2000-01-01'>;
    idNumber: Schema.Attribute.String;
    mobileNr: Schema.Attribute.String;
    about: Schema.Attribute.Blocks;
    examNumber: Schema.Attribute.String;
    serialNumber: Schema.Attribute.String;
    imei: Schema.Attribute.String;
    uniqueId: Schema.Attribute.String;
    hasSiyavulaAccess: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    darkMode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPaying: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPayingDate: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-10-22T22:00:00.000Z'>;
    cancelDate: Schema.Attribute.DateTime;
    isDeveloper: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isAffiliate: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    addresses: Schema.Attribute.Relation<'oneToMany', 'api::address.address'>;
    provinces: Schema.Attribute.Relation<
      'manyToMany',
      'api::province.province'
    >;
    schools: Schema.Attribute.Relation<'manyToMany', 'api::school.school'>;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    socialRead: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    shares: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    gender: Schema.Attribute.Relation<'oneToOne', 'api::gender.gender'>;
    inMailsTos: Schema.Attribute.Relation<'manyToMany', 'api::in-mail.in-mail'>;
    inMailsCC: Schema.Attribute.Relation<'manyToMany', 'api::in-mail.in-mail'>;
    inMailsBCC: Schema.Attribute.Relation<'manyToMany', 'api::in-mail.in-mail'>;
    notifications: Schema.Attribute.Relation<
      'manyToMany',
      'api::notification.notification'
    >;
    parents: Schema.Attribute.Relation<'manyToMany', 'api::parent.parent'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    voucher: Schema.Attribute.Relation<'oneToOne', 'api::voucher.voucher'>;
    referral: Schema.Attribute.Relation<'oneToOne', 'api::affiliate.affiliate'>;
    progresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::progress.progress'
    >;
    supportDepartments: Schema.Attribute.Relation<
      'manyToMany',
      'api::support-department.support-department'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::profile.profile'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiProgressProgress extends Struct.CollectionTypeSchema {
  collectionName: 'progresses';
  info: {
    singularName: 'progress';
    pluralName: 'progresses';
    displayName: 'Progress';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    profile: Schema.Attribute.Relation<'manyToOne', 'api::profile.profile'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    school: Schema.Attribute.Relation<'oneToOne', 'api::school.school'>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    isComplete: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    totalSteps: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    completedSteps: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::progress.progress'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiProvinceProvince extends Struct.CollectionTypeSchema {
  collectionName: 'provinces';
  info: {
    singularName: 'province';
    pluralName: 'provinces';
    displayName: 'Province';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    country: Schema.Attribute.Relation<'oneToOne', 'api::country.country'>;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    regions: Schema.Attribute.Relation<'oneToMany', 'api::region.region'>;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::province.province'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQualificationQualification
  extends Struct.CollectionTypeSchema {
  collectionName: 'qualifications';
  info: {
    singularName: 'qualification';
    pluralName: 'qualifications';
    displayName: 'Qualification';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    programmDescription: Schema.Attribute.Blocks;
    shortDescription: Schema.Attribute.Blocks;
    degree: Schema.Attribute.String;
    requirements: Schema.Attribute.Blocks;
    openDate: Schema.Attribute.Date;
    closeDate: Schema.Attribute.Date;
    description: Schema.Attribute.Blocks;
    url: Schema.Attribute.String;
    hashtags: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    institute: Schema.Attribute.Relation<
      'oneToOne',
      'api::institute.institute'
    >;
    faculty: Schema.Attribute.Relation<'manyToOne', 'api::faculty.faculty'>;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::qualification.qualification'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQualificationResponseQualificationResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'qualification_responses';
  info: {
    singularName: 'qualification-response';
    pluralName: 'qualification-responses';
    displayName: 'Qualification Response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    qualification: Schema.Attribute.Relation<
      'oneToOne',
      'api::qualification.qualification'
    >;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    isSaved: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    applied: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::qualification-response.qualification-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryBaseQueryBase extends Struct.CollectionTypeSchema {
  collectionName: 'query_bases';
  info: {
    singularName: 'query-base';
    pluralName: 'query-bases';
    displayName: 'Query Base';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    baseQuery: Schema.Attribute.Blocks;
    query_type: Schema.Attribute.Relation<
      'oneToOne',
      'api::query-type.query-type'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-base.query-base'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryFilterQueryFilter extends Struct.CollectionTypeSchema {
  collectionName: 'query_filters';
  info: {
    singularName: 'query-filter';
    pluralName: 'query-filters';
    displayName: 'Query Filter';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    queryType: Schema.Attribute.Relation<
      'manyToOne',
      'api::query-type.query-type'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-filter.query-filter'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryHeaderQueryHeader extends Struct.CollectionTypeSchema {
  collectionName: 'query_headers';
  info: {
    singularName: 'query-header';
    pluralName: 'query-headers';
    displayName: 'Query Header';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    display: Schema.Attribute.String;
    queryTypes: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-type.query-type'
    >;
    queryStructures: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-structure.query-structure'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-header.query-header'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryStructureQueryStructure
  extends Struct.CollectionTypeSchema {
  collectionName: 'query_structures';
  info: {
    singularName: 'query-structure';
    pluralName: 'query-structures';
    displayName: 'Query Structure';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    field: Schema.Attribute.String;
    display: Schema.Attribute.String;
    queryHeaders: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-header.query-header'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-structure.query-structure'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryTypeQueryType extends Struct.CollectionTypeSchema {
  collectionName: 'query_types';
  info: {
    singularName: 'query-type';
    pluralName: 'query-types';
    displayName: 'Query Type';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    table: Schema.Attribute.String;
    queryFilters: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-filter.query-filter'
    >;
    queryHeaders: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-header.query-header'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-type.query-type'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiQuizResponseQuizResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'quiz_responses';
  info: {
    singularName: 'quiz-response';
    pluralName: 'quiz-responses';
    displayName: 'Quiz Response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    lesson_quiz: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-quiz.lesson-quiz'
    >;
    response: Schema.Attribute.JSON;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    points: Schema.Attribute.Decimal;
    totalPoints: Schema.Attribute.Decimal;
    answer: Schema.Attribute.DynamicZone<
      [
        'shared.multiple-choice-quiz',
        'shared.free-choice',
        'shared.single-choice-quiz',
      ]
    >;
    attempt: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::quiz-response.quiz-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiRatingRating extends Struct.CollectionTypeSchema {
  collectionName: 'ratings';
  info: {
    singularName: 'rating';
    pluralName: 'ratings';
    displayName: 'Rating';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    social: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::rating.rating'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiRegionRegion extends Struct.CollectionTypeSchema {
  collectionName: 'regions';
  info: {
    singularName: 'region';
    pluralName: 'regions';
    displayName: 'Region';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'manyToOne', 'api::province.province'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::region.region'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiRegisterPopUpRegisterPopUp
  extends Struct.CollectionTypeSchema {
  collectionName: 'register_pop_ups';
  info: {
    singularName: 'register-pop-up';
    pluralName: 'register-pop-ups';
    displayName: 'Register Pop Up';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    url: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::register-pop-up.register-pop-up'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSchoolSchool extends Struct.CollectionTypeSchema {
  collectionName: 'schools';
  info: {
    singularName: 'school';
    pluralName: 'schools';
    displayName: 'School';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    suburb: Schema.Attribute.Relation<'manyToOne', 'api::suburb.suburb'>;
    district: Schema.Attribute.Relation<'oneToOne', 'api::district.district'>;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    tellephone: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::school.school'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiShowShow extends Struct.CollectionTypeSchema {
  collectionName: 'shows';
  info: {
    singularName: 'show';
    pluralName: 'shows';
    displayName: 'Show';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    url: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    transcript: Schema.Attribute.Blocks;
    show_categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::show-category.show-category'
    >;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::show.show'> &
      Schema.Attribute.Private;
  };
}

export interface ApiShowCategoryShowCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'show_categories';
  info: {
    singularName: 'show-category';
    pluralName: 'show-categories';
    displayName: 'Show Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Blocks;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    shows: Schema.Attribute.Relation<'manyToMany', 'api::show.show'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::show-category.show-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSocialSocial extends Struct.CollectionTypeSchema {
  collectionName: 'socials';
  info: {
    singularName: 'social';
    pluralName: 'socials';
    displayName: 'Social';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    read: Schema.Attribute.Relation<'oneToMany', 'api::profile.profile'>;
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    share: Schema.Attribute.Relation<'oneToMany', 'api::profile.profile'>;
    forum: Schema.Attribute.Relation<'oneToOne', 'api::forum.forum'>;
    likes: Schema.Attribute.Relation<'oneToMany', 'api::like.like'>;
    knowledgeBase: Schema.Attribute.Relation<
      'oneToOne',
      'api::knowledge-base.knowledge-base'
    >;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    ratings: Schema.Attribute.Relation<'oneToMany', 'api::rating.rating'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social.social'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSocialLinkSocialLink extends Struct.CollectionTypeSchema {
  collectionName: 'social_links';
  info: {
    singularName: 'social-link';
    pluralName: 'social-links';
    displayName: 'Social Link';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    url: Schema.Attribute.String;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-link.social-link'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiStepStep extends Struct.CollectionTypeSchema {
  collectionName: 'steps';
  info: {
    singularName: 'step';
    pluralName: 'steps';
    displayName: 'Step';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    steps: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::step.step'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubjectSubject extends Struct.CollectionTypeSchema {
  collectionName: 'subjects';
  info: {
    singularName: 'subject';
    pluralName: 'subjects';
    displayName: 'Subject';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    qualifications: Schema.Attribute.Relation<
      'manyToMany',
      'api::qualification.qualification'
    >;
    price: Schema.Attribute.Decimal;
    subjectCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::subject-category.subject-category'
    >;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subject.subject'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSubjectCategorySubjectCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'subject_categories';
  info: {
    singularName: 'subject-category';
    pluralName: 'subject-categories';
    displayName: 'Subject Category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subject-category.subject-category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSuburbSuburb extends Struct.CollectionTypeSchema {
  collectionName: 'suburbs';
  info: {
    singularName: 'suburb';
    pluralName: 'suburbs';
    displayName: 'Suburb';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    district: Schema.Attribute.Relation<'manyToOne', 'api::district.district'>;
    schools: Schema.Attribute.Relation<'oneToMany', 'api::school.school'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::suburb.suburb'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportCommentSupportComment
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_comments';
  info: {
    singularName: 'support-comment';
    pluralName: 'support-comments';
    displayName: 'Support Comment';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    comment: Schema.Attribute.Blocks;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    support_ticket: Schema.Attribute.Relation<
      'manyToOne',
      'api::support-ticket.support-ticket'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-comment.support-comment'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportDepartmentSupportDepartment
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_departments';
  info: {
    singularName: 'support-department';
    pluralName: 'support-departments';
    displayName: 'Support Department';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-department.support-department'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportStatusSupportStatus
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_statuses';
  info: {
    singularName: 'support-status';
    pluralName: 'support-statuses';
    displayName: 'Support Status';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-status.support-status'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportTicketSupportTicket
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_tickets';
  info: {
    singularName: 'support-ticket';
    pluralName: 'support-tickets';
    displayName: 'Support Ticket';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    assignedTo: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String;
    device: Schema.Attribute.Blocks;
    open: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    supportDepartment: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-department.support-department'
    >;
    supportTopic: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-topic.support-topic'
    >;
    supportStatus: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-status.support-status'
    >;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    comments: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-comment.support-comment'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-ticket.support-ticket'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportTopicSupportTopic
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_topics';
  info: {
    singularName: 'support-topic';
    pluralName: 'support-topics';
    displayName: 'Support Topic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    support_department: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-department.support-department'
    >;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-topic.support-topic'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSurveyResponseSurveyResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'survey_responses';
  info: {
    singularName: 'survey-response';
    pluralName: 'survey-responses';
    displayName: 'Survey Response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    lessonSurvey: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-survey.lesson-survey'
    >;
    response: Schema.Attribute.JSON;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    answer: Schema.Attribute.DynamicZone<
      [
        'shared.single-choice-quiz',
        'shared.multiple-choice-quiz',
        'shared.free-choice',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::survey-response.survey-response'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiTargetTarget extends Struct.CollectionTypeSchema {
  collectionName: 'targets';
  info: {
    singularName: 'target';
    pluralName: 'targets';
    displayName: 'Target';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    subject_category: Schema.Attribute.Relation<
      'oneToOne',
      'api::subject-category.subject-category'
    >;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    school: Schema.Attribute.Relation<'oneToOne', 'api::school.school'>;
    gender: Schema.Attribute.Relation<'oneToOne', 'api::gender.gender'>;
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    feed: Schema.Attribute.Relation<'manyToOne', 'api::feed.feed'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::target.target'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiTimeTrackTimeTrack extends Struct.CollectionTypeSchema {
  collectionName: 'time_tracks';
  info: {
    singularName: 'time-track';
    pluralName: 'time-tracks';
    displayName: 'Time Track';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    url: Schema.Attribute.String;
    table: Schema.Attribute.String;
    tableId: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    secondaryTable: Schema.Attribute.String;
    secondaryTableId: Schema.Attribute.Integer;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    isComplete: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::time-track.time-track'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiTransactionTransaction extends Struct.CollectionTypeSchema {
  collectionName: 'transactions';
  info: {
    singularName: 'transaction';
    pluralName: 'transactions';
    displayName: 'Transaction';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    currency: Schema.Attribute.String;
    sendEmail: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    emailCc: Schema.Attribute.String;
    emailBcc: Schema.Attribute.String;
    expiryTime: Schema.Attribute.Integer;
    notes: Schema.Attribute.Blocks;
    firstName: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    mPaymentId: Schema.Attribute.String;
    item: Schema.Attribute.String;
    description: Schema.Attribute.String;
    emailConfirmation: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    paymentMethod: Schema.Attribute.String;
    subscriptionType: Schema.Attribute.Integer;
    billingDate: Schema.Attribute.Date;
    recurringAmount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    frequency: Schema.Attribute.Integer;
    cycles: Schema.Attribute.Integer;
    signature: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    vatNr: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    postalCode: Schema.Attribute.String;
    company: Schema.Attribute.String;
    password: Schema.Attribute.String;
    additionalInformation: Schema.Attribute.Blocks;
    addressLine1: Schema.Attribute.Blocks;
    cellnr: Schema.Attribute.String;
    affiliate: Schema.Attribute.Relation<
      'oneToOne',
      'api::affiliate.affiliate'
    >;
    referral: Schema.Attribute.String;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction.transaction'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiTransactionEventTransactionEvent
  extends Struct.CollectionTypeSchema {
  collectionName: 'transaction_events';
  info: {
    singularName: 'transaction-event';
    pluralName: 'transaction-events';
    displayName: 'Transaction Event';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    transaction: Schema.Attribute.Relation<
      'oneToOne',
      'api::transaction.transaction'
    >;
    type: Schema.Attribute.String;
    testmode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    billingDate: Schema.Attribute.Date;
    amountGross: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    amountFee: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    amountNet: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    paymentId: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction-event.transaction-event'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiUserNoteUserNote extends Struct.CollectionTypeSchema {
  collectionName: 'user_notes';
  info: {
    singularName: 'user-note';
    pluralName: 'user-notes';
    displayName: 'User Note';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    note: Schema.Attribute.Blocks;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    lessonModule: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-module.lesson-module'
    >;
    show: Schema.Attribute.Relation<'oneToOne', 'api::show.show'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::user-note.user-note'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiVoucherVoucher extends Struct.CollectionTypeSchema {
  collectionName: 'vouchers';
  info: {
    singularName: 'voucher';
    pluralName: 'vouchers';
    displayName: 'Voucher';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Schema.Attribute.String;
    discount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    number: Schema.Attribute.String;
    days: Schema.Attribute.Integer;
    isUsed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    organization: Schema.Attribute.Relation<
      'manyToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::voucher.voucher'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiZoomZoom extends Struct.CollectionTypeSchema {
  collectionName: 'zooms';
  info: {
    singularName: 'zoom';
    pluralName: 'zooms';
    displayName: 'Zoom';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    email: Schema.Attribute.Email;
    key: Schema.Attribute.String;
    sdkKey: Schema.Attribute.String;
    secret: Schema.Attribute.String;
    access: Schema.Attribute.Relation<'oneToOne', 'api::access.access'>;
    stsApiKey: Schema.Attribute.String;
    stsApiSecret: Schema.Attribute.String;
    stsAccountId: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::zoom.zoom'> &
      Schema.Attribute.Private;
  };
}

export interface ApiZoomLessonZoomLesson extends Struct.CollectionTypeSchema {
  collectionName: 'zoom_lessons';
  info: {
    singularName: 'zoom-lesson';
    pluralName: 'zoom-lessons';
    displayName: 'Zoom Lesson';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zoom-lesson.zoom-lesson'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiZoomMeetingZoomMeeting extends Struct.CollectionTypeSchema {
  collectionName: 'zoom_meetings';
  info: {
    singularName: 'zoom-meeting';
    pluralName: 'zoom-meetings';
    displayName: 'Zoom Meeting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    meetingLink: Schema.Attribute.String;
    zoom: Schema.Attribute.Relation<'oneToOne', 'api::zoom.zoom'>;
    host: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    participants: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zoom-meeting.zoom-meeting'
    > &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Schema.Attribute.String;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    preferedLanguage: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Schema.Attribute.String;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Schema.Attribute.DateTime;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Schema.Attribute.DateTime;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::access.access': ApiAccessAccess;
      'api::address.address': ApiAddressAddress;
      'api::affiliate.affiliate': ApiAffiliateAffiliate;
      'api::affiliate-detail.affiliate-detail': ApiAffiliateDetailAffiliateDetail;
      'api::affiliate-setting.affiliate-setting': ApiAffiliateSettingAffiliateSetting;
      'api::affiliate-status.affiliate-status': ApiAffiliateStatusAffiliateStatus;
      'api::affiliate-transaction.affiliate-transaction': ApiAffiliateTransactionAffiliateTransaction;
      'api::article.article': ApiArticleArticle;
      'api::article-category.article-category': ApiArticleCategoryArticleCategory;
      'api::article-saved.article-saved': ApiArticleSavedArticleSaved;
      'api::article-tag.article-tag': ApiArticleTagArticleTag;
      'api::assignment-reply.assignment-reply': ApiAssignmentReplyAssignmentReply;
      'api::audio-playlist.audio-playlist': ApiAudioPlaylistAudioPlaylist;
      'api::bursary.bursary': ApiBursaryBursary;
      'api::bursary-category.bursary-category': ApiBursaryCategoryBursaryCategory;
      'api::bursary-response.bursary-response': ApiBursaryResponseBursaryResponse;
      'api::comment.comment': ApiCommentComment;
      'api::country.country': ApiCountryCountry;
      'api::district.district': ApiDistrictDistrict;
      'api::email-list.email-list': ApiEmailListEmailList;
      'api::emoticon.emoticon': ApiEmoticonEmoticon;
      'api::event.event': ApiEventEvent;
      'api::event-response.event-response': ApiEventResponseEventResponse;
      'api::faculty.faculty': ApiFacultyFaculty;
      'api::faq.faq': ApiFaqFaq;
      'api::faq-category.faq-category': ApiFaqCategoryFaqCategory;
      'api::feed.feed': ApiFeedFeed;
      'api::forum.forum': ApiForumForum;
      'api::gender.gender': ApiGenderGender;
      'api::grade.grade': ApiGradeGrade;
      'api::history.history': ApiHistoryHistory;
      'api::in-mail.in-mail': ApiInMailInMail;
      'api::in-mail-response.in-mail-response': ApiInMailResponseInMailResponse;
      'api::institute.institute': ApiInstituteInstitute;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::job-application.job-application': ApiJobApplicationJobApplication;
      'api::kb-category.kb-category': ApiKbCategoryKbCategory;
      'api::kb-topic.kb-topic': ApiKbTopicKbTopic;
      'api::knowledge-base.knowledge-base': ApiKnowledgeBaseKnowledgeBase;
      'api::lesson.lesson': ApiLessonLesson;
      'api::lesson-assignment.lesson-assignment': ApiLessonAssignmentLessonAssignment;
      'api::lesson-audio.lesson-audio': ApiLessonAudioLessonAudio;
      'api::lesson-module.lesson-module': ApiLessonModuleLessonModule;
      'api::lesson-quiz.lesson-quiz': ApiLessonQuizLessonQuiz;
      'api::lesson-survey.lesson-survey': ApiLessonSurveyLessonSurvey;
      'api::like.like': ApiLikeLike;
      'api::notification.notification': ApiNotificationNotification;
      'api::notification-response.notification-response': ApiNotificationResponseNotificationResponse;
      'api::organization.organization': ApiOrganizationOrganization;
      'api::page-track.page-track': ApiPageTrackPageTrack;
      'api::paren-relation.paren-relation': ApiParenRelationParenRelation;
      'api::parent.parent': ApiParentParent;
      'api::parent-title.parent-title': ApiParentTitleParentTitle;
      'api::product.product': ApiProductProduct;
      'api::product-category.product-category': ApiProductCategoryProductCategory;
      'api::profile.profile': ApiProfileProfile;
      'api::progress.progress': ApiProgressProgress;
      'api::province.province': ApiProvinceProvince;
      'api::qualification.qualification': ApiQualificationQualification;
      'api::qualification-response.qualification-response': ApiQualificationResponseQualificationResponse;
      'api::query-base.query-base': ApiQueryBaseQueryBase;
      'api::query-filter.query-filter': ApiQueryFilterQueryFilter;
      'api::query-header.query-header': ApiQueryHeaderQueryHeader;
      'api::query-structure.query-structure': ApiQueryStructureQueryStructure;
      'api::query-type.query-type': ApiQueryTypeQueryType;
      'api::quiz-response.quiz-response': ApiQuizResponseQuizResponse;
      'api::rating.rating': ApiRatingRating;
      'api::region.region': ApiRegionRegion;
      'api::register-pop-up.register-pop-up': ApiRegisterPopUpRegisterPopUp;
      'api::school.school': ApiSchoolSchool;
      'api::show.show': ApiShowShow;
      'api::show-category.show-category': ApiShowCategoryShowCategory;
      'api::social.social': ApiSocialSocial;
      'api::social-link.social-link': ApiSocialLinkSocialLink;
      'api::step.step': ApiStepStep;
      'api::subject.subject': ApiSubjectSubject;
      'api::subject-category.subject-category': ApiSubjectCategorySubjectCategory;
      'api::suburb.suburb': ApiSuburbSuburb;
      'api::support-comment.support-comment': ApiSupportCommentSupportComment;
      'api::support-department.support-department': ApiSupportDepartmentSupportDepartment;
      'api::support-status.support-status': ApiSupportStatusSupportStatus;
      'api::support-ticket.support-ticket': ApiSupportTicketSupportTicket;
      'api::support-topic.support-topic': ApiSupportTopicSupportTopic;
      'api::survey-response.survey-response': ApiSurveyResponseSurveyResponse;
      'api::target.target': ApiTargetTarget;
      'api::time-track.time-track': ApiTimeTrackTimeTrack;
      'api::transaction.transaction': ApiTransactionTransaction;
      'api::transaction-event.transaction-event': ApiTransactionEventTransactionEvent;
      'api::user-note.user-note': ApiUserNoteUserNote;
      'api::voucher.voucher': ApiVoucherVoucher;
      'api::zoom.zoom': ApiZoomZoom;
      'api::zoom-lesson.zoom-lesson': ApiZoomLessonZoomLesson;
      'api::zoom-meeting.zoom-meeting': ApiZoomMeetingZoomMeeting;
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
    }
  }
}
